import BigNumber from "bignumber.js"
import { DEFAULT_GAS_LIMIT, DEFAULT_TOKEN_DECIMAL } from "config"
import { useFinanceHonorContract } from "hooks/useContract"
import { useCallback } from "react"
import getGasPrice from "utils/getGasPrice"
import FinanceUtil from "../financeUtils"

const options = {
    gasLimit: DEFAULT_GAS_LIMIT,
  }
  
const depositFinanceToken = async (financeContract, token, amount,duration:number) => {
    const gasPrice = getGasPrice()
    const value = new BigNumber(amount).times(DEFAULT_TOKEN_DECIMAL).toString()
    const durationString = FinanceUtil.getDurationNumber(duration);

    const tx = await financeContract.depositToken(token, value,duration, { ...options, gasPrice })
  const receipt = await tx.wait()
  return receipt.status
}


export const useDepositFinanceToken = (token:string) => {
  const financeContract = useFinanceHonorContract()

  const handleDeposit = useCallback(
    async (amount: string,duration: number) => {
      const txHash = await depositFinanceToken(financeContract, token,amount,duration)
      console.info(txHash)
    },
    [financeContract, token],
  )

  return { onDeposit: handleDeposit }
}