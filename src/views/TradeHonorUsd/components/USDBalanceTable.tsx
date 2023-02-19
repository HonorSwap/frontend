import React,{useState} from 'react'
import { useTokenBalance } from 'state/wallet/hooks';
import { useTradeHNRUSDContract } from 'hooks/useContract';

import {  Card, CardBody, CardHeader, Table, Td, Th } from "@honorswap/uiswap";


import {testnetTokens} from '../../../config/constants/tokens'






export default function USDBalanceTable (props) {

    const {token}=props;

    const tradeHNRUSD=useTradeHNRUSDContract();

    const busdBalance=useTokenBalance(tradeHNRUSD.address,token);
    const husdBalance=useTokenBalance(tradeHNRUSD.address,testnetTokens.hnrusd);


    return (
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Current Stock</b>
        </CardHeader>
        <CardBody>
          <Table>
            <tr>
          <Th textAlign="left">{token?.symbol} Stock</Th><Td textAlign="right">{busdBalance?.toFixed(2)}</Td>
          <Th textAlign="left">HNRUSD Stock</Th><Td textAlign="right">{husdBalance?.toFixed(2)}</Td>
          </tr>
          </Table>
        </CardBody>
      </Card>
    )
  }