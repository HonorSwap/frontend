import React, { useCallback, useEffect, useMemo, useState } from 'react'

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
import { CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader } from '@pancakeswap/uikit'
import  Page  from '../../components/Layout/Page'
import tokens, {testnetTokens} from '../../config/constants/tokens'

import financeAbi from '../../config/abi/financeHnrUsd.json'
import DepositCard from './components/DepositCard'
import DepositCaption from "./components/DepositCaption";
import CurrentDeposited from "./components/CurrentDeposited";











export default function FinanceHNRUSD({ history }: RouteComponentProps) {
 
  const [approwalBUSD,setApprovalBUSD]=useState<number>(0);
  const [isDeposited,setIsDeposited]=useState(undefined);
    const [stock,setStock]=useState<BigNumber>(undefined);

  const { account,library } = useActiveWeb3React()

  const { t } = useTranslation()

 

  const hnrusdToken=testnetTokens.hnrusd;



    const usdBEP20=useERC20(hnrusdToken.address);

 const financeAddress="0x8502dC7D2EF0Ee091A3AFeD14B1c418608F4f07a";
 const finance = getContract(financeAddress,financeAbi,library,account)


  const sendDeposit = async (value:string,duration:string) =>{
    const busdValue =ethers.utils.parseEther(value);
    await finance.deposit(busdValue,"")
  }
 useEffect(()=>{
    const checkApproval= async () => {
      
     const num=await usdBEP20.allowance(account,financeAddress);

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
 },[account,usdBEP20]);


 const sendBUSDApproveClick= async () => {
  usdBEP20.approve(financeAddress,MaxUint256).then((res)=>{
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
      const check=await finance.isDeposited(account);
      if(check)
        setIsDeposited(check);
      else
        setIsDeposited(undefined);
    }

    checkDeposited();
  },[account,finance])
  return (
    <Page>
        <CurrentDeposited />
        <DepositCaption tokenName="BUSD" month="12" month3="14" month6="16" year="18"/>
        
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
    <DepositCard
    caption="1 Month (%14 APY)"
    balanceBUSD={stock?.toFixed(2)} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    <DepositCard
    caption="3 Months (%16 APY)"
    balanceBUSD={stock?.toFixed(2)} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    </Flex>
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">

    <DepositCard
    caption="6 Months (%18 APY)"
    balanceBUSD={stock?.toFixed(2)} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    <DepositCard
    caption="1 Year (%20 APY)"
    balanceBUSD={stock?.toFixed(2)} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
</Flex>
            
            </Page>
  )
}
