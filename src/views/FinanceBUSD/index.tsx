import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContract } from 'utils'
import { ethers } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useERC20 } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader, ButtonMenuItem, ButtonMenu } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import tokens, {testnetTokens} from '../../config/constants/tokens'

import financeAbi from '../../config/abi/financeHnrUsd.json'
import DepositCard from './DepositCard'
import DepositCaption from "../Finance/components/DepositCaption";
import CurrentDeposited from "../Finance/components/CurrentDeposited";













export default function FinanceBUSD({ history }: RouteComponentProps) {
 
  const [approwalBUSD,setApprovalBUSD]=useState<number>(0);
  const [isDeposited,setIsDeposited]=useState(undefined);

  const { account,library } = useActiveWeb3React()

  const { t } = useTranslation()

 

  const busdToken=testnetTokens.busd;


  const busdBalance=useCurrencyBalance(account,busdToken);
 const busdBEP20=useERC20(busdToken.address);

 const financeBUSDAddress="0x8502dC7D2EF0Ee091A3AFeD14B1c418608F4f07a";
 const financeBUSD = getContract(financeBUSDAddress,financeAbi,library,account)


  const sendDeposit = async (value:string,duration:string) =>{
    const busdValue =ethers.utils.parseEther(value);
    financeBUSD.deposit(busdValue,"")
  }
   

 useEffect(()=>{
    const checkApproval= async () => {
      
     const num=await busdBEP20.allowance(account,financeBUSDAddress);

     if(num>0)
     {
      setApprovalBUSD(1);
     }
     else
     {
      setApprovalBUSD(0);
     }
    
    }

    checkApproval();
 },[account,busdBEP20]);


 const sendBUSDApproveClick= async () => {
  busdBEP20.approve(financeBUSDAddress,MaxUint256).then((res)=>{
    if(res!==1)
    {
      setApprovalBUSD(0);
    }
    else
    {
      setApprovalBUSD(1);
    }
  });
 }

  useEffect(()=>{
    const checkDeposited=async () =>{
      const check=await financeBUSD.isDeposited(account);
      if(check)
        setIsDeposited(check);
      else
        setIsDeposited(undefined);
    }

    checkDeposited();
  },[account,financeBUSD])

  let index1=1;
  const handleClick1= () =>{
    index1++;
  }
  return (
    <Page>
      <ButtonMenu activeIndex={index1} onItemClick={handleClick1} fullWidth variant="subtle">
          <ButtonMenuItem>1 Month</ButtonMenuItem>
          <ButtonMenuItem>3 Months</ButtonMenuItem>
          <ButtonMenuItem>6 Months</ButtonMenuItem>
          <ButtonMenuItem>1 Year</ButtonMenuItem>
        </ButtonMenu>
        <CurrentDeposited />
        <DepositCaption tokenName="BUSD" month="12" month3="14" month6="16" year="18"/>
        
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
    <DepositCard
    caption="1 Month (%12 APY)"
    balanceBUSD={busdBalance} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    <DepositCard
    caption="3 Months (%14 APY)"
    balanceBUSD={busdBalance} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    </Flex>
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">

    <DepositCard
    caption="6 Months (%16 APY)"
    balanceBUSD={busdBalance} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    <DepositCard
    caption="1 Year (%18 APY)"
    balanceBUSD={busdBalance} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
</Flex>
            
            </Page>
  )
}
