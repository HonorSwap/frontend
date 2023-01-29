import React,{useEffect, useState} from 'react'
import BigNumber from "bignumber.js"
import { ethers } from 'ethers';
import { useFinanceHonorContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { Alert, ArrowDownIcon, Box, Button, Card, CardBody, CardHeader, Heading, Table, Td, Th } from "@honorswap/uiswap";
import CurrencyInputPanel from "components/CurrencyInputPanel";
import { AutoColumn, ColumnCenter } from "components/Layout/Column";
import Row from 'components/Layout/Row';
import {testnetTokens} from '../../config/constants/tokens'
import { useFinanceGetBalance } from './hooks/useFinanceGetBalance';
import {  FinanceInfo } from './financeTypes';
import { useFinanceTokenInfo } from './hooks/useFinanceTokenInfo';
import FinanceUtil from './financeUtils';



export default function FinanceTable (props) {

    const {token} = props;


    const info : FinanceInfo=useFinanceTokenInfo(token.address);

 
    if(info === undefined)
      return (<Heading textAlign="center">Loading Is Info...</Heading>)
    
    if(info?._maxAmountPerUser.toString() === "0" )
      return (<div>&nbsp;</div>)

    
    const format = (value) => {
        if(value)
        {
        
            const numdigit=new BigNumber(10).pow(18);
            let retVal= new BigNumber(value).dividedBy(numdigit).integerValue().toFormat(0, {
                decimalSeparator: '',
                groupSeparator: ''
        });
            retVal=retVal.replace(/(.)(?=(\d{3})+$)/g,'$1,')
            const ret=`${retVal} ${token?.symbol}` ;
            return ret;
        }
    
            
        return "Loading.."
    }

    const maxUser=new BigNumber(info._maxAmountPerUser.toString()).dividedBy(new BigNumber(10).pow(18)).toNumber()
    const tokenInterest=new BigNumber(info._interest.toString());



    const getCurAPY = (factor : BigNumber) => {
      const interest=tokenInterest.multipliedBy(factor);
      const year=new BigNumber(31536000).multipliedBy(interest);
      const last=year.dividedBy(new BigNumber(1e16)).toFixed(2);
      return last;
    }
    return (
    
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Interest Table</b>
        </CardHeader>
        <CardBody>
          <Table>
            <tr>
          <Th textAlign="left">Max Amount Per User</Th><Td textAlign="right">{format(info?._maxAmountPerUser.toString())}</Td>
          <Th textAlign="left">Total Max Amount</Th><Td textAlign="right">{format(info?._maxTotalAmount.toString())}</Td>
          </tr></Table>
          <div>&nbsp;</div>
          <Heading textAlign="center">Interest Rates</Heading>
          <Table>
            <tr>
                <Th>Amount</Th>
                <Th>1 Month</Th>
                <Th>3 Months</Th>
                <Th>6 Months</Th>
                <Th>1 Year</Th>
            </tr>
            <tr>
                <Td textAlign="center">{FinanceUtil.minToMax(0,maxUser/100)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToAPY(tokenInterest,12)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.105,4)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.218,2)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.358,1)}</Td>
            </tr>
            <tr>
                <Td textAlign="center">{FinanceUtil.minToMax(maxUser/100,maxUser/10)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.095,12)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.201,4)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.317,2)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.463,1)}</Td>
            </tr>
            <tr>
                <Td textAlign="center">{FinanceUtil.minToMax(maxUser/10,maxUser/2)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.19,12)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.392,4)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.61,2)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.881,1)}</Td>
            </tr>
            <tr>
                <Td textAlign="center">{FinanceUtil.minToMax(maxUser/2,maxUser)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.377,12)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.58,4)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,1.803,2)}</Td>
                <Td textAlign="center">%{FinanceUtil.interestToApyFactor(tokenInterest,2.09,1)}</Td>
            </tr>

          
         
          </Table>
        </CardBody>
      </Card>
    )
  }