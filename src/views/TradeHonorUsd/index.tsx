import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApproveCallback } from 'hooks/useApproveCallback'
import styled from 'styled-components'

import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTokenAllowance from 'hooks/useTokenAllowance'

import { getContract } from 'utils'
import { ethers } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useERC20, useTradeHNRUSDContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { CurrencyAmount, JSBI, Token, TokenAmount, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import ApprovalButton from "./components/ApprovalButton";
import tokens, {testnetTokens} from '../../config/constants/tokens'















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

  const tradeHNRUSD=useTradeHNRUSDContract();

  const { t } = useTranslation()

  const busdToken=testnetTokens.busd;
  const hnrusdToken=testnetTokens.hnrusd;

  const allowanceBUSD=useTokenAllowance(busdToken,account,tradeHNRUSD.address);
  const allowanceHNRUSD=useTokenAllowance(hnrusdToken,account,tradeHNRUSD.address);

  const [husdBuyValue,sethusdBuyValue] = useState<string>('');
  const [busdSellValue,setbusdSellValue] = useState<string>('');
  const [husdSellValue,sethusdSellValue] = useState<string>('');
  const [busdBuyValue,setbusdBuyValue] = useState<string>('');

  

  const busdBalance=useCurrencyBalance(account,busdToken);
  const hnrusdBalance=useCurrencyBalance(account,hnrusdToken);

  const busdHNRUSDBalance=useCurrencyBalance(tradeHNRUSD.address,busdToken);

  const busdERC20=useERC20(busdToken.address);
  const husdERC20=useERC20(hnrusdToken.address);

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

  
 const sendBuyHUSDClick = async () => {
 
  const value =ethers.utils.parseEther(busdSellValue);
  await tradeHNRUSD.buyHUSD(value);
 }

 const sendBuyBUSDClick = async () => {
  const value=ethers.utils.parseEther(husdSellValue);
  await tradeHNRUSD.sellHUSD(value);
 }

  return (
    <Page>
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
        <div>Buy or Sell HNRUSD with BUSD All Time BUSD = HNRUSD</div>
        <div style={{marginTop:'10px'}}>Fee : %0.05</div>
        <div style={{marginTop:'10px'}}>BUSD Stock : {busdHNRUSDBalance?.toFixed(2)}$</div>
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
                  inputSetBUSD(busdBalance?.toFixed(3))
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
              <ApprovalButton token={busdToken} toApprove={tradeHNRUSD.address}>
                
                <Button variant="primary" onClick={sendBuyHUSDClick}>Buy HNRUSD</Button>
              
              </ApprovalButton>
          
                
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
              <ApprovalButton token={hnrusdToken} toApprove={tradeHNRUSD.address}>
                
                <Button variant="danger" onClick={sendBuyBUSDClick}>Sell HNRUSD</Button>
              
              </ApprovalButton>
              </ColumnCenter>
              
            </Box>
            </AutoColumn>
            </CardBody>
            </Card>
            </Flex>
            
            </Page>
  )
}
