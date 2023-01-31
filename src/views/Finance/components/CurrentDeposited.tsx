import React,{useEffect, useState} from 'react'
import BigNumber from "bignumber.js"
import { useFinanceHonorContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Alert, ArrowDownIcon, Box, Button, Card, CardBody, CardHeader, Heading, Table, Td, Th } from "@honorswap/uiswap";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import Row from 'components/Layout/Row';
import {testnetTokens} from '../../../config/constants/tokens'
import { useFinanceGetBalance } from '../hooks/useFinanceGetBalance';
import { FinanceBalance, FinanceInfo } from '../financeTypes';
import FinanceUtil from '../financeUtils';
import { useFinanceTokenInfo } from '../hooks/useFinanceTokenInfo';


export default function CurrentDeposited (props) {

    const [endBalance,setEndBalance] = useState("Loading...")
    const [startDate,setStartDate] = useState("Loading...");
    const [endDate,setEndDate] = useState("Loading...");

    const {user,token} = props;

    const balance : FinanceBalance=useFinanceGetBalance(user,token?.address);
    
    useEffect(()=>{
      if(balance!==undefined)
      {
        setStartDate("");
      }
    },[balance])

    if(balance === undefined)
      return (<Heading textAlign="center">Loading Is Deposited...</Heading>)
    
    if(!balance?.amount.gt(0) )
      return (<div>&nbsp;</div>)

    
 

    return (
    
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Current Deposited</b>
        </CardHeader>
        <CardBody>
          <Table>
            <tr>
          <Th textAlign="left">Start Balance</Th><Td textAlign="right">{FinanceUtil.tokenFormatStr(balance.amount.toString(),token.symbol)}</Td>
          <Th textAlign="left">Start Date</Th><Td textAlign="right">{balance?.startTime.toString()}</Td>
          </tr><tr>
          
          <Th textAlign="left">End Balance</Th><Td textAlign="right">12.000</Td>
          <Th textAlign="left">End Date</Th><Td textAlign="right">01.11.2023</Td>
          </tr>
          </Table>
        </CardBody>
      </Card>
    )
  }