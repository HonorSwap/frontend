import React,{useState} from 'react'
import BigNumber from 'bignumber.js';
import { useFinanceHonorContract } from 'hooks/useContract';
import { ArrowDownIcon, Box, Button, Card, CardBody, CardHeader, Heading } from "@honorswap/uiswap";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import {testnetTokens} from '../../../config/constants/tokens'
import ApprovalButton from './ApprovalButton';
import FinanceUtil from '../financeUtils';
import { useFinanceTokenInfo } from '../hooks/useFinanceTokenInfo';
import { FinanceInfo } from '../financeTypes';



export default function DepositFinance (props) {
    const [value,setValue]=useState<string>("");
  
    const {balance,sendDeposit,token,duration}=props;
    
    const finance=useFinanceHonorContract();
    const bal : FinanceInfo =useFinanceTokenInfo(token.address);

    if(bal===undefined)
      return (<Heading>Loading..</Heading>);

    const inputSetValue = (val:string) => {
      setValue(val);
   
    }

    const onMaxSetValue = () => {
      const num=FinanceUtil.etherToNumber(bal._maxAmountPerUser.toString(),0);
      
      if(parseFloat(num) >= parseFloat(balance))
        setValue(balance)
      else
        setValue(num)
  

    }
    return (
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
          {FinanceUtil.getDurationCaption(duration)}
        </CardHeader>
        <CardBody>
          <AutoColumn gap="20px">
      <Box my="16px">
                <CurrencyInputPanel
                  value={value}
                  onUserInput={(val:string)=>inputSetValue(val)}
                  onMax={()=>{
                    onMaxSetValue()
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
                <ColumnCenter>
                <ApprovalButton toApprove={finance.address} token={token} amount={bal?._maxAmountPerUser}>
                
                  <Button variant="primary" onClick={sendDeposit(value,"1")}>Deposit</Button>
                
                </ApprovalButton>
                  
                </ColumnCenter>
                
              </Box>
              </AutoColumn>
              </CardBody>
              </Card>
    )
  }