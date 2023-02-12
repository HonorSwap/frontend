import React,{useEffect, useMemo, useState} from 'react'

import {  Card, CardBody, CardHeader, Heading, Table, Td, Th } from "@honorswap/uiswap";







 export default function HNRUSDFeeTable () {

    return (
    
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>
            <b>Fee Table</b>
        </CardHeader>
        <CardBody>
          <Heading textAlign="center">Amount Rates</Heading>
          <Table>
            <tr>
                <Th>Amount</Th>
                <Th>Buy HNRUSD Fee</Th>
                <Th>Sell HNRUSD Fee</Th>
            </tr>
            <tr>
                <Td textAlign="center">0 - 1.000</Td>
                <Td textAlign="center">%0.10</Td>
                <Td textAlign="center">%0.20</Td>
            </tr>
            <tr>
                <Td textAlign="center">1.000 - 10.000</Td>
                <Td textAlign="center">%0.08</Td>
                <Td textAlign="center">%0.20</Td>
            </tr>
            <tr>
                <Td textAlign="center">10.000 - 25.000</Td>
                <Td textAlign="center">%0.06</Td>
                <Td textAlign="center">%0.20</Td>
            </tr>
            <tr>
                <Td textAlign="center">25.000 - 100.000</Td>
                <Td textAlign="center">%0.04</Td>
                <Td textAlign="center">%0.20</Td>
            </tr>
            <tr>
                <Td textAlign="center">100.000 - ...</Td>
                <Td textAlign="center">%0.02</Td>
                <Td textAlign="center">%0.20</Td>
            </tr>
          </Table>
        </CardBody>
      </Card>
    )
  }

