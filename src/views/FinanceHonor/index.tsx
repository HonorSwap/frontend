import React, { useCallback, useEffect, useMemo, useState } from 'react'
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
import { Currency, CurrencyAmount, JSBI, Token, Trade } from '@honorswap/sdk'
import { Flex } from '@honorswap/uiswap'
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
import { useFinanceHonorGetBalance } from '../Finance/hooks/useFinanceGetBalance'



export default function FinanceHonor({ history }: RouteComponentProps) {
 
  const [isDeposit,setIsDeposit] = useState(false);

  const [selectDuration,setSelectDuration] = useState(0);
  const { account } = useActiveWeb3React()

  // const { t } = useTranslation()

  const finance=useFinanceHonorContract();
  const wbnbToken=testnetTokens.cake;

  const wbnbBalance=useCurrencyBalance(account,wbnbToken);

  const {onDeposit}= useDepositFinanceToken(wbnbToken.address);

  const balance : FinanceBalance=useFinanceHonorGetBalance(account);

  // FinanceHonor Contractında userhonorbalance mapping i public ayarlanmadığı için
  // hata alıyoruz kontratı tekrar yüklememiz gerekiyor
  
  useEffect(()=>{
    if(balance !== undefined)
    {
      if(balance?.amount.gt(0))
        setIsDeposit(true);
      else
        setIsDeposit(false);
    }
  },[balance])

  const depositRender = () => {
    return ( 
      <div>
    
    <SelectDuration setDuration={setSelectDuration} />
    <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
    
      <DepositFinance 
        token={wbnbToken} 
        balance={wbnbBalance?.toFixed(2)}
        sendDeposit={onDeposit}
      
        duration={selectDuration}
      />
    </Flex>
    </div>
    )
  }

  const curDepositRender = () => {
    return (
<CurrentDeposited user={account} token={wbnbToken} contract={finance}/>
    
    )
  }


  return (
    <Page>
      
        { isDeposit ? curDepositRender() :  <div>&nbsp;</div> }
        <br/>
        <FinanceTable token={wbnbToken.address} symbol={wbnbToken.symbol} />
        <br/>
        { !isDeposit ? depositRender() : <div>&nbsp;</div> }
    
    </Page>
  )
}

