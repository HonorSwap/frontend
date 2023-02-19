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
import tokens, {testnetTokens} from '../../config/constants/tokens'
import USDBalanceTable from './components/USDBalanceTable'
import HNRUSDFeeTable from './components/HNRUSDFeeTable'
import SubMenuUSD from './components/SubMenuUSD'
import BuySellCard from './components/BuySellCard'


const Label = styled(Text)`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.secondary};
`

export default function TradeHNRUSDC({ history }: RouteComponentProps) {
 


  const busdToken=testnetTokens.usdc;


  return (
    <Page>
      <SubMenuUSD item="/tradehnrusdusdc" />
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
