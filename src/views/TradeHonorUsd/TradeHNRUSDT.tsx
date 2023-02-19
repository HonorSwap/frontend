import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApproveCallback } from 'hooks/useApproveCallback'
import styled from 'styled-components'
import useToast from 'hooks/useToast'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import useTokenAllowance from 'hooks/useTokenAllowance'

import { getContract } from 'utils'
import { ethers } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useERC20, useTradeHNRUSDContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { BrowserRouter, RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import { CurrencyAmount, JSBI, Token, TokenAmount, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader, SubMenuItems } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import ApprovalButton from "../Finance/components/ApprovalButton";
import  {testnetTokens} from '../../config/constants/tokens'
import USDBalanceTable from './components/USDBalanceTable'
import HNRUSDFeeTable from './components/HNRUSDFeeTable'
import SubMenuUSD from './components/SubMenuUSD'
import BuySellCard from './components/BuySellCard'



export default function TradeHNRBUSD({ history }: RouteComponentProps) {
 
  const [approwalBUSD,setApprovalBUSD]=useState<number>(0);
  const [approwalHUSD,setApprovalHUSD]=useState<number>(0);
  const [balanceBUSD,setBalanceBUSD]=useState<BigNumber>(undefined);
  const { account } = useActiveWeb3React()
  const { toastSuccess, toastError } = useToast()
  const tradeHNRUSD=useTradeHNRUSDContract();

  const { t } = useTranslation()

  const busdToken=testnetTokens.usdt;
  const hnrusdToken=testnetTokens.hnrusd;


  const [husdBuyValue,sethusdBuyValue] = useState<string>('');
  const [busdSellValue,setbusdSellValue] = useState<string>('');
  const [husdSellValue,sethusdSellValue] = useState<string>('');
  const [busdBuyValue,setbusdBuyValue] = useState<string>('');

  

  const busdBalance=useCurrencyBalance(account,busdToken);
  const hnrusdBalance=useCurrencyBalance(account,hnrusdToken);

  

  return (
    <Page>
      <SubMenuUSD item="/tradehnrusdusdt" />
      <div>&nbsp;</div>
      <Card style={{width:'100%', marginRight:'5px'}} >
        <CardHeader>

        <USDBalanceTable token={busdToken} />
        <div>&nbsp;</div>
        <HNRUSDFeeTable />
        </CardHeader>
        </Card>
        <BuySellCard token={busdToken} />
            
            </Page>
  )
}
