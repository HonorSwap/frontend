import { ArrowDownIcon, Box, Button, Card, CardBody, CardHeader, Flex } from '@honorswap/uiswap';
import CurrencyInputPanel from 'components/CurrencyInputPanel';
import { AutoColumn, ColumnCenter } from 'components/Layout/Column';
import { testnetTokens } from 'config/constants/tokens';
import {  ethers } from 'ethers';
import BigNumber from 'bignumber.js';
import { useTradeHNRUSDContract } from 'hooks/useContract';
import useToast from 'hooks/useToast';
import React, { useState } from 'react'
import ApprovalButton from 'views/Finance/components/ApprovalButton';
import { useCurrencyBalance } from 'state/wallet/hooks';
import { useTranslation } from 'contexts/Localization';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

function BuySellCard(props) {

    const [husdBuyValue,sethusdBuyValue] = useState<string>('');
    const [busdSellValue,setbusdSellValue] = useState<string>('');
    const [husdSellValue,sethusdSellValue] = useState<string>('');
    const [busdBuyValue,setbusdBuyValue] = useState<string>('');
    const { toastSuccess, toastError } = useToast()
    const tradeHNRUSD=useTradeHNRUSDContract();
    const { t } = useTranslation()
    const { account } = useActiveWeb3React()
    
    const {token}=props;
    const hnrusdToken=testnetTokens.hnrusd;

    const busdBalance=useCurrencyBalance(account,token);
    const hnrusdBalance=useCurrencyBalance(account,hnrusdToken);
    
    const valueToFee = (value) => {
        const x=parseFloat(value);
        
        if(value<1000)
        {
          return x - (x*0.001);
        }
        if(value<10000)
        {
          return (x -x * 0.0008);
        }
        if(value<25000)
        {
          return (x-x*0.0006);
        }
        if(value<100000)
        {
          return (x-x*0.0004);
        }
        return (x-x*0.0002);
      }
      const inputSetBUSD = (value:string) => {
        setbusdSellValue(value);
        const num1=valueToFee(value);
    
        const num = new BigNumber(num1);
     
        sethusdBuyValue(num.toFixed(3));
      }
    
      const inputSetHUSD = (value:string) => {
        sethusdSellValue(value);
        const num = new BigNumber(value);
        const lastNum=num.div(500).negated();
        const last=num.plus(lastNum);
        setbusdBuyValue(last.toFixed(3));
      }
    
      
     const sendBuyHUSDClick = async () => {
     
      const value =ethers.utils.parseEther(busdSellValue);
      await tradeHNRUSD.buyHNRUSD(value,token.address);
     }
    
     const sendBuyBUSDClick = async () => {
      const value=ethers.utils.parseEther(husdSellValue);
      try
      {
      await tradeHNRUSD.buyUSD(value,token.address);
      toastSuccess("Buy Success");
      }
      catch(e)
      {
        toastError("Error Buy!")
      }
     }

  return (
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
                currency={token}
                
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
              <ApprovalButton token={token} toApprove={tradeHNRUSD.address}>
                
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
                currency={token}
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
  )
}

export default BuySellCard