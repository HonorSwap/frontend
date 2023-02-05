import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import styled from 'styled-components'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { getContract } from 'utils'
import { ethers } from 'ethers'
import { MaxUint256 } from '@ethersproject/constants'
import { useERC20, useFinanceHonorContract } from 'hooks/useContract'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { RouteComponentProps } from 'react-router-dom'
import { useTranslation } from 'contexts/Localization'
import { AppBody, AppHeader } from 'components/App'
import { AutoColumn, ColumnCenter } from 'components/Layout/Column'
import CurrencyInputPanel from 'components/CurrencyInputPanel'
import PageHeader from 'components/PageHeader'
import { Header } from 'views/Predictions/components/History'
import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader, ButtonMenuItem, ButtonMenu, Heading, Input } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import  {testnetTokens} from '../../config/constants/tokens'


import DepositCard from '../Finance/components/DepositCard'
import DepositCaption from "../Finance/components/DepositCaption";
import CurrentDeposited from "../Finance/components/CurrentDeposited";
import SelectDuration from '../Finance/components/SelectDuration'
import { FinanceBalance, FinanceInfo } from '../Finance/financeTypes'
import { useFinanceTokenInfo } from '../Finance/hooks/useFinanceTokenInfo'
import FinanceTable from '../Finance/FinanceTable'
import DepositFinance from '../Finance/components/DepositFinance'
import { useDepositFinanceToken } from '../Finance/hooks/useFinanceDepositToken'
import { useFinanceGetBalance } from '../Finance/hooks/useFinanceGetBalance'





export default function FinanceCalc({ history }: RouteComponentProps) {
  const apyInput=useRef(null)
  const aprInput = useRef(null);
  const xCoin=useRef(null);

  const year=new BigNumber(31536000);
  const month=new BigNumber(2592000);

  const onApyClick = ()=> {
    const num=new BigNumber(apyInput.current.value);

    const apr=num.multipliedBy(year).dividedBy(1e16);
    aprInput.current.value=apr.toFixed(4);
  }

  const onCoinToAPR = () => {
    const num=new BigNumber(xCoin.current.value);

    const apr=num.multipliedBy(year).dividedBy(1e16);
    aprInput.current.value=apr.toFixed(2);

    const monthApr=num.multipliedBy(year).dividedBy(1e16);
    apyInput.current.value=aprToApy(monthApr.toNumber(),12);
  }

  const onApyToCoin = () => {
    const num=new BigNumber(apyInput.current.value);

    aprInput.current.value=apyToApr(num.toNumber(),12);
    xCoin.current.value=apyToCoin(num.toNumber(),12);
  }

  const apyToApr = (apy :number,period:number) => {
    const xPeriod=1/period;

    xCoin.current.value=xPeriod.toFixed(4);
    return (((apy/100+1)**xPeriod - 1)*100*period).toFixed(2);
  }

  const apyToCoin= (apy:number,period:number) => {
    const xPeriod=1/period;

    xCoin.current.value=xPeriod.toFixed(4);
    const xApr= (((apy/100+1)**xPeriod - 1)*period);

    const aprBig=new BigNumber(xApr);
    return aprBig.multipliedBy(new BigNumber(1e18)).dividedBy(year).toFixed(0);
  }

  const aprToApy = (apr:number,period:number) => {
    return ((((1+((apr/100)/period))**period)-1)*100).toFixed(2);
}

  return (
    <Page>
      <PageHeader background="Header">Finance Calculator</PageHeader>

       
      <Text>Saniye Başı Coin</Text><Input type="text" ref={xCoin} />
      <br />
      
      
      <Text>APR</Text><Input type="text" ref={aprInput} />
      <br />

      <Text>APY</Text><Input type="text" ref={apyInput} />
      <br />

      <Button onClick={ onCoinToAPR} >Calculate CoinToAPR</Button>&nbsp;
      <Button onClick={ onApyClick} >Calculate APR to Coin</Button>&nbsp;
      <Button onClick={ onApyToCoin} >Calculate APY to Coin</Button>&nbsp;
    </Page>
  )
}

