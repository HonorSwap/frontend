import React,{useState} from 'react'
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



export default function FinanceTable (props) {

    const {user,token,contract} = props;

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
    
    const minToMax = (first : number,last : number) => {
        const num1=first.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,')
        const num2=last.toString().replace(/(.)(?=(\d{3})+$)/g,'$1,')

        return `${num1} - ${num2}`
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
                <Td textAlign="center">{minToMax(0,maxUser/100)}</Td>
                <Td textAlign="center">%10</Td>
                <Td textAlign="center">%12</Td>
                <Td textAlign="center">%14</Td>
                <Td textAlign="center">%16</Td>
            </tr>
            <tr>
                <Td textAlign="center">{minToMax(maxUser/100,maxUser/10)}</Td>
                <Td textAlign="center">%11</Td>
                <Td textAlign="center">%13</Td>
                <Td textAlign="center">%15</Td>
                <Td textAlign="center">%17</Td>
            </tr>
            <tr>
                <Td textAlign="center">{minToMax(maxUser/10,maxUser/2)}</Td>
                <Td textAlign="center">%12</Td>
                <Td textAlign="center">%14</Td>
                <Td textAlign="center">%16</Td>
                <Td textAlign="center">%18</Td>
            </tr>
            <tr>
                <Td textAlign="center">{minToMax(maxUser/2,maxUser)}</Td>
                <Td textAlign="center">%13</Td>
                <Td textAlign="center">%15</Td>
                <Td textAlign="center">%17</Td>
                <Td textAlign="center">%19</Td>
            </tr>

          
         
          </Table>
        </CardBody>
      </Card>
    )
  }