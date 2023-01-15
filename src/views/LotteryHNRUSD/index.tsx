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
import { CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import tokens, {testnetTokens} from '../../config/constants/tokens'
import FinanceInfo from  '../../components/Finance/FinanceInfo'
import financeAbi from '../../config/abi/financeHnrUsd.json'
import LotteryCard from './components/LotteryCard'










const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

export default function LotteryHNRUSD({ history }: RouteComponentProps) {
 

  const [approwalHUSD,setApprovalHUSD]=useState<number>(0);
  const [balanceHUSD,setBalanceHUSD]=useState<BigNumber>(undefined);
  const { account,library } = useActiveWeb3React()

  const { t } = useTranslation()


  const hnrusdToken=testnetTokens.hnrusd;


  const hnrusdBalance=useCurrencyBalance(account,hnrusdToken);




 const husdBEP20=useERC20(hnrusdToken.address);
 const lotteryHNRUSDContract="0x8502dC7D2EF0Ee091A3AFeD14B1c418608F4f07a";
 const finance = getContract(lotteryHNRUSDContract,financeAbi,library,account)

 useEffect(()=>{
  const checkBalance=async () =>{
    const balance=await husdBEP20.balanceOf(lotteryHNRUSDContract)
    setBalanceHUSD(balance);
  }
  
  checkBalance();
 })

 useEffect(()=>{
    const checkApproval= async () => {
      
  
     const num1=await husdBEP20.allowance(account,lotteryHNRUSDContract);
   
     if(num1>0)
     {
      setApprovalHUSD(1);
     }
     else
     {
      setApprovalHUSD(0);
     }
    }

    checkApproval();
 },[account,husdBEP20]);



  return (
    <Page>
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
        <div>Lottery 6 / 51</div>
        <div>8 Hours Lottery Ticket : 0.20$ (1 FLT)</div>
        <div>Daily Lottery Ticket : 0.60$ (3 FLT)</div>
        <div>Three Days Lottery Ticket : 1.00$ (5 FLT)</div>
        <div>Weekly Lottery Ticket :3.00$ (15 FLT)</div>
        <div style={{marginTop:'10px'}}>Fee : %4</div>
        </CardHeader>
        </Card>
  <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
    <Card style={{width:'100%', marginRight:'5px'}} >
      <CardHeader>
        Buy HNRUSD
      </CardHeader>
      <CardBody>
        <AutoColumn gap="20px">
    <Box my="16px">
              
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              
              
            </Box>
            </AutoColumn>
            </CardBody>
            </Card>

            <Card style={{width:'100%'}} >
      <CardHeader>
        Sell HNRUSD
      </CardHeader>
      <CardBody>
        <AutoColumn gap="20px">
    <Box my="16px">
              
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              <ColumnCenter>
                <Button variant="danger">Sell HNRUSD</Button>
              </ColumnCenter>
              
            </Box>
            </AutoColumn>
            </CardBody>
            </Card>
            </Flex>
            <Flex width="70%" justifyContent="space-between">
            <LotteryCard time="8" winnerPrize={5000} lotID={1} />
            <LotteryCard time="24" winnerPrize={5000} lotID={1} />
            </Flex>
            </Page>
  )
}
