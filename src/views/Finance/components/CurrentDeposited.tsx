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



    const {user,token} = props;

    const balance : FinanceBalance=useFinanceGetBalance(user,token?.address);
    
   

    if(balance === undefined)
      return (<Heading textAlign="center">Loading Is Deposited...</Heading>)
    
    if(!balance?.amount.gt(0) )
      return (<div>&nbsp;</div>)

    
      
      const getTime = (value : number) => {
        
        return moment.unix(value).format('DD-MM-YYYY h:mm:ss ');
        
      }

      const getEndBalance =(amount: BigNumber,interest: BigNumber,duration:BigNumber) => {
        
        const _interest=new BigNumber(interest.toString());
        const _amount=new BigNumber(amount.toString());
        const _duration=new BigNumber(duration.toString());
        console.log(`Veriler: Interest: ${_interest.toString()} Duration: ${_duration.toString()} Amount: ${_amount.toString()} `)
        const totalInterest=_interest.multipliedBy(_duration).multipliedBy(_amount).dividedBy(1e18);
        console.log(`Total Interest: ${totalInterest.toString()}`)
        const sum=BigNumber.sum(_amount, totalInterest);
        console.log(`Sum: ${sum.toString()}`)
        return FinanceUtil.tokenFormatStr(sum.toString(),token.symbol);
      }

      const emergencyWidthdraw = (value:string,symbol:string) =>{
        const bal=new BigNumber(value);

        const em= bal.multipliedBy(9).dividedBy(10).toString();
        return FinanceUtil.tokenFormatStr(em,symbol);
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
          </tr>
          <tr>
          <Th textAlign="left">End Balance</Th><Td textAlign="right">{getEndBalance(balance?.amount,balance?.interest_rate,balance?.duration)}</Td>
          <Th textAlign="left">End Date</Th><Td textAlign="right">{getTime(balance?.start_time.toNumber() + balance?.duration.toNumber())}</Td>
          </tr>
          <tr>
          <Th textAlign="left">APR %</Th><Td textAlign="right">{FinanceUtil.getInterest(new BigNumber(balance?.interest_rate.toString()))}</Td>
          <Th textAlign="left">APY %</Th><Td textAlign="right">{FinanceUtil.durationAprToApy(balance?.interest_rate.toString(),balance?.duration.toString())}</Td>
          </tr>
          <tr>
            <Th colSpan={2}>Emergency Widthdraw Value (%10 Fee)</Th>
            <Th colSpan={2}>{emergencyWidthdraw(balance?.amount.toString(),token.symbol)}</Th>
          </tr>
          </Table>
          <br />
          <Button variant='danger'>Emergency Widthdraw</Button>
        </CardBody>
      </Card>
    )
  }