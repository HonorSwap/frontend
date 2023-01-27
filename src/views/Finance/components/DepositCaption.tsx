import React,{useState} from 'react'
import { Alert, ArrowDownIcon, Box, Button, Card, CardBody, CardHeader } from "@honorswap/uiswap";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import {testnetTokens} from '../../../config/constants/tokens'

export default function DepositCaption (props) {

  
    const {tokenName,month,month3,month6,year}=props;
    


    return (
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
        <div>Deposit {tokenName} and get fixed interest</div>
        <div style={{marginTop:'10px'}}>No Fee</div>
        <div style={{marginTop:'10px'}}>1 Month  : %{month} APY</div>
        <div style={{marginTop:'10px'}}>3 Months : %{month3} APY</div>
        <div style={{marginTop:'10px'}}>6 Months : %{month6} APY</div>
        <div style={{marginTop:'10px'}}>1 Year   : %{year} APY</div>
        </CardHeader>
        <Alert title="info">
          <p>If the balance of the relevant coin is not available for payment, payment will be made with 2% extra in HonorCoin.</p>
        </Alert>
      </Card>
    )
  }