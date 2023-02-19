import React,{useEffect, useMemo, useState} from 'react'

import {  Card, CardBody, CardHeader, Heading, SubMenuItems, Table, Td, Th } from "@honorswap/uiswap";
import { BrowserRouter } from 'react-router-dom';







 export default function SubMenuUSD ({item}) {

    return (
    
        <>
        <SubMenuItems
            activeItem={item}
          items={[
            {
              href: '/tradehnrusdbusd',
              label: 'BUSD'
            },
            {
              href: '/tradehnrusdusdt',
              label: 'USDT'
            },
            {
              href: '/tradehnrusdusdc',
              label: 'USDC'
            },
           
          ]}
        />
      </>
    )
  }

