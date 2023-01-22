import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContract } from 'utils'
import { ethers } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useERC20, useFinanceHonorContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader, ButtonMenuItem, ButtonMenu, Heading } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import  {testnetTokens} from '../../config/constants/tokens'


import DepositCard from './DepositCard'
import DepositCaption from "../Finance/components/DepositCaption";
import CurrentDeposited from "../Finance/components/CurrentDeposited";
import SelectDuration from '../Finance/components/SelectDuration'












export default function FinanceBUSD({ history }: RouteComponentProps) {
 
  const [approwalBUSD,setApprovalBUSD]=useState<number>(0);
  const [isDeposited,setIsDeposited]=useState(undefined);
  const [selectDuration,setSelectDuration] = useState(0);
  const { account } = useActiveWeb3React()

  const { t } = useTranslation()

  const finance=useFinanceHonorContract();
  const busdToken=testnetTokens.busd;


  const busdBalance=useCurrencyBalance(account,busdToken);
  const busdBEP20=useERC20(busdToken.address);



  const sendDeposit = async (value:string,duration:string) =>{
    const busdValue =ethers.utils.parseEther(value);
    finance.depositToken(busdToken.address,busdValue,duration)
  }
   



 const sendBUSDApproveClick= async () => {
  busdBEP20.approve(finance.address,MaxUint256).then((res)=>{
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



 
 

  return (
    <Page>
      
        <CurrentDeposited />
        <DepositCaption tokenName="BUSD" month="12" month3="14" month6="16" year="18"/>
        <Heading scale="lg" color="text" textAlign="center">
          {t('Select Duration')}
        </Heading>
        <SelectDuration setDuration={setSelectDuration} />
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
    <DepositCard
    caption="1 Month (%12 APY)"
    balanceBUSD={busdBalance} 
    approwalBUSD={approwalBUSD}
    sendDeposit={sendDeposit}
    sendBUSDApproveClick={sendBUSDApproveClick}
    />
    
    </Flex>
    
            
            </Page>
  )
}
