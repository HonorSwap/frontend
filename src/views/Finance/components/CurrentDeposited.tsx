import React,{useState} from 'react'

import { Alert, ArrowDownIcon, Box, Button, Card, CardBody, CardHeader } from "@pancakeswap/uikit";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import Row from 'components/Layout/Row';
import {testnetTokens} from '../../../config/constants/tokens'


export default function CurrentDeposited (props) {

  
    const {tokenName,month,month3,month6,year}=props;
    


    return (
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Current Deposited</b>
        </CardHeader>
        <CardBody>
            
            <Row>
                Balance
            </Row>
            <Row>1000</Row>
        </CardBody>
      </Card>
    )
  }