import React,{useEffect, useState} from 'react'
import moment from 'moment';
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

    
      console.log(balance);
      const getTime = (value : number) => {
        
        return moment.unix(value).format('DD-MM-YYYY h:mm:ss ');
        
      }

      const getEndBalance =(amount: BigNumber,interest: BigNumber,duration:BigNumber) => {
        console.log(interest);
        
        const sum=BigNumber.sum(amount,interest.multipliedBy( duration ));
        return FinanceUtil.tokenFormatStr(sum.toString(),token.symbol);
      }

    return (
    
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Current Deposited</b>
        </CardHeader>
        <CardBody>
          <Table>
            <tr>
          <Th textAlign="left">Start Balance</Th><Td textAlign="right">{FinanceUtil.tokenFormatStr(balance.amount.toString(),token.symbol)}</Td>
          <Th textAlign="left">Start Date</Th><Td textAlign="right">{getTime(balance?.start_time.toNumber())}</Td>
          </tr><tr>
          
          <Th textAlign="left">End Balance</Th><Td textAlign="right">{getEndBalance(balance?.amount,balance?.interest_rate,balance?.duration)}</Td>
          <Th textAlign="left">End Date</Th><Td textAlign="right">{getTime(balance?.start_time.toNumber() + balance?.duration.toNumber())}</Td>
          </tr>
          </Table>
        </CardBody>
      </Card>
    )
  }