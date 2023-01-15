import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useFinanceHonorContract } from "hooks/useContract"
import { useEffect, useState } from "react";


export const useFinanceGetBalance = (account: string,token:string) => {
    
    const finance=useFinanceHonorContract();
    const [balance,setBalance] = useState(0);
    
    useEffect(  () => {
        const checkFinance=async () => {
        const bal=await finance.getUserTokenBalance(account,token);
        console.log(bal);
        setBalance(bal);
        }
    
        checkFinance();

       

    },[finance,account,token])

    return balance;
}