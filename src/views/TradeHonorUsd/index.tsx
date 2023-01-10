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
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader } from '@pancakeswap/uikit'
import  Page  from '../../components/Layout/Page'
import tokens, {testnetTokens} from '../../config/constants/tokens'
import FinanceInfo from  '../../components/Finance/FinanceInfo'
import financeAbi from '../../config/abi/financeHnrUsd.json'











const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

export default function TradeHonorUsd({ history }: RouteComponentProps) {
 
  const [approwalBUSD,setApprovalBUSD]=useState<number>(0);
  const [approwalHUSD,setApprovalHUSD]=useState<number>(0);
  const [balanceBUSD,setBalanceBUSD]=useState<BigNumber>(undefined);
  const { account,library } = useActiveWeb3React()

  const { t } = useTranslation()

  const [husdBuyValue,sethusdBuyValue] = useState<string>('');
  const [busdSellValue,setbusdSellValue] = useState<string>('');
  const [husdSellValue,sethusdSellValue] = useState<string>('');
  const [busdBuyValue,setbusdBuyValue] = useState<string>('');

  const busdToken=testnetTokens.busd;
  const hnrusdToken=testnetTokens.hnrusd;

  const busdBalance=useCurrencyBalance(account,busdToken);
  const hnrusdBalance=useCurrencyBalance(account,hnrusdToken);

  const inputSetBUSD = (value:string) => {
    setbusdSellValue(value);
    const num = new BigNumber(value);
    const lastNum=num.div(2000).negated();
    const last=num.plus(lastNum);
    sethusdBuyValue(last.toFixed(3));
  }

  const inputSetHUSD = (value:string) => {
    sethusdSellValue(value);
    const num = new BigNumber(value);
    const lastNum=num.div(2000).negated();
    const last=num.plus(lastNum);
    setbusdBuyValue(last.toFixed(3));
  }

 const busdBEP20=useERC20(busdToken.address);
 const husdBEP20=useERC20(hnrusdToken.address);
 const financeHNRUSDContract="0x8502dC7D2EF0Ee091A3AFeD14B1c418608F4f07a";
 const finance = getContract(financeHNRUSDContract,financeAbi,library,account)

 useEffect(()=>{
  const checkBalance=async () =>{
    const balance=await busdBEP20.balanceOf(financeHNRUSDContract)
    setBalanceBUSD(balance);
  }
  
  checkBalance();
 })

 useEffect(()=>{
    const checkApproval= async () => {
      
     const num=await busdBEP20.allowance(account,financeHNRUSDContract);
     const num1=await husdBEP20.allowance(account,financeHNRUSDContract);
     if(num>0)
     {
      setApprovalBUSD(1);
     }
     else
     {
      setApprovalBUSD(0);
     }
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
 },[account,busdBEP20,husdBEP20]);

 const sendBuyHUSDClick = async () => {
 
  const value =ethers.utils.parseEther(busdSellValue);
  await finance.buyHUSD(value);
 }
 const sendBUSDApproveClick= async () => {
  busdBEP20.approve(financeHNRUSDContract,MaxUint256).then((res)=>{
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
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
        <div>Buy or Sell HNRUSD with BUSD All Time BUSD = HNRUSD</div>
        <div style={{marginTop:'10px'}}>Fee : %0.05</div>
        <div style={{marginTop:'10px'}}>BUSD Stock : {balanceBUSD?.toFixed(2)}$</div>
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
              <CurrencyInputPanel
                value={busdSellValue}
                onUserInput={(value:string)=>inputSetBUSD(value)}
                onMax={()=>{
                  inputSetBUSD(busdBalance.toFixed(3))
                }}
                showMaxButton={Boolean(true)}
                disableCurrencySelect
                currency={testnetTokens.busd}
                
                id="liquidity-amount"
                onCurrencySelect={() => null}
              />
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={husdBuyValue}
                onUserInput={()=> {return '';} }
                
                showMaxButton={Boolean(false)}
                currency={testnetTokens.hnrusd}
                label={t('Output')}
                disableCurrencySelect
                onCurrencySelect={() => null}
                id="remove-liquidity-tokena"
              />
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              <ColumnCenter>
              {
              approwalBUSD>0 ? (
                <Button variant="primary" onClick={sendBuyHUSDClick}>Buy HNRUSD</Button>
              ) : (
                <Button variant="primary" onClick={sendBUSDApproveClick}>Enable BUSD</Button>
              )
            }
                
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
              <CurrencyInputPanel
                value={husdSellValue}
                onUserInput={(value:string)=>inputSetHUSD(value)}
                onMax={()=>{
                  inputSetHUSD(hnrusdBalance.toFixed(3))
                }}
                showMaxButton={Boolean(true)}
                disableCurrencySelect
                currency={testnetTokens.hnrusd}
                
                id="liquidity-amount"
                onCurrencySelect={() => null}
              />
              <ColumnCenter>
                <ArrowDownIcon width="24px" my="16px" />
              </ColumnCenter>
              <CurrencyInputPanel
                hideBalance
                value={busdBuyValue}
                onUserInput={()=>{return '';}}
                
                showMaxButton={Boolean(false)}
                currency={testnetTokens.busd}
                label={t('Output')}
                disableCurrencySelect
                onCurrencySelect={() => null}
                id="remove-liquidity-tokena"
              />
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
            
            </Page>
  )
}
