import React,{useState} from 'react'
import { ArrowDownIcon, Box, Button, Card, CardBody, CardHeader } from "@honorswap/uiswap";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import {testnetTokens} from '../../../config/constants/tokens'
import ApprovalButton from './ApprovalButton';

export default function DepositCard (props) {
    const [busdValue,setbusdValue]=useState<string>("");
  
    const {caption,balanceBUSD,approwalBUSD,sendDeposit,sendBUSDApproveClick}=props;
    
    const inputSetBUSD = (value:string) => {
      setbusdValue(value);
   
    }
    return (
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
          {caption}
        </CardHeader>
        <CardBody>
          <AutoColumn gap="20px">
      <Box my="16px">
                <CurrencyInputPanel
                  value={busdValue}
                  onUserInput={(value:string)=>inputSetBUSD(value)}
                  onMax={()=>{
                    inputSetBUSD(balanceBUSD.toFixed(3))
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
                
                {
                approwalBUSD>0 ? (
                  <Button variant="primary" onClick={sendDeposit(busdValue)}>Deposit</Button>
                ) : (
                  <Button variant="primary" onClick={sendBUSDApproveClick}>Enable BUSD</Button>
                )
              }
                  
                </ColumnCenter>
                
              </Box>
              </AutoColumn>
              </CardBody>
              </Card>
    )
  }