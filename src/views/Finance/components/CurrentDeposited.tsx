import React,{useState} from 'react'

import { Alert, ArrowDownIcon, Box, Button, Card, CardBody, CardHeader, Table, Td, Th } from "@pancakeswap/uikit";
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
          <Table>
          <Th>Start Balance</Th><Td>10.000</Td>
          <Th>Start Date</Th><Td>01.11.2022</Td>
          </Table>
          <Table>
          <Th>End Balance</Th><Td>12.000</Td>
          <Th>End Date</Th><Td>01.11.2023</Td>
          </Table>
        </CardBody>
      </Card>
    )
  }