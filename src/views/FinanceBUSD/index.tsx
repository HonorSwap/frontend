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
import { Button, Text, ArrowDownIcon, Box, useModal,Flex, AddIcon, Card, CardBody, CardHeader, ButtonMenuItem, ButtonMenu, Heading } from '@honorswap/uiswap'
import  Page  from '../../components/Layout/Page'
import  {testnetTokens} from '../../config/constants/tokens'


import DepositCard from '../Finance/components/DepositCard'
import DepositCaption from "../Finance/components/DepositCaption";
import CurrentDeposited from "../Finance/components/CurrentDeposited";
import SelectDuration from '../Finance/components/SelectDuration'
import { FinanceInfo } from '../Finance/financeTypes'
import { useFinanceTokenInfo } from '../Finance/hooks/useFinanceTokenInfo'
import FinanceTable from '../Finance/FinanceTable'
import DepositFinance from '../Finance/components/DepositFinance'



export default function FinanceBUSD({ history }: RouteComponentProps) {
 

  const [selectDuration,setSelectDuration] = useState(0);
  const { account } = useActiveWeb3React()

  // const { t } = useTranslation()

  const finance=useFinanceHonorContract();
  const busdToken=testnetTokens.busd;


  
  const busdBalance=useCurrencyBalance(account,busdToken);




  const sendDeposit = async (value:string) =>{
    const intValue=parseInt(value);
    if(intValue>0)
    {
      let timeDuration="";

      switch(selectDuration)
      {
        case 0:
          timeDuration="2592000";
          break;
        case 1:
          timeDuration="7776000";
          break;
        case 2:
          timeDuration="15552000"
          break;
        case 3:
          timeDuration="31536000";
          break;
          default:
            timeDuration="";
      }
      if(timeDuration==="")
        return;
      const busdValue =ethers.utils.parseEther(value);
      await finance.depositToken(busdToken.address,busdValue,timeDuration)
    }
  }


  return (
    <Page>
      
        <CurrentDeposited user={account} token={busdToken} contract={finance}/>
        <FinanceTable token={busdToken.address} symbol={busdToken.symbol} />
        
        <div>&nbsp;</div>
        
        
        <SelectDuration setDuration={setSelectDuration} />
        <Flex padding="1" margin="1" flexDirection="row" justifyContent="space-between">
        
          <DepositFinance 
            token={busdToken} 
            balance={busdBalance?.toFixed(2)}
            sendDeposit={sendDeposit}
          
            duration={selectDuration}
          />
        </Flex>
    
            
            </Page>
  )
}
