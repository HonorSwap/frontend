import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useFinanceHonorContract } from "hooks/useContract"
import { useEffect, useState } from "react";


export const useFinanceGetBalance = (account: string,token:string) => {
    
    const finance=useFinanceHonorContract();
    const [balance,setBalance] = useState(undefined);
    
    useEffect(  () => {
        const checkFinance=async () => {
        const bal=await finance._userBalances(account,token);
       
        setBalance(bal);
        }
    
        checkFinance();

       

    },[finance,account,token])

    return balance;
}

export const useFinanceHonorGetBalance = (account: string) => {
    
    const finance=useFinanceHonorContract();
    const [balance,setBalance] = useState(undefined);
    
    useEffect(  () => {
        const checkFinance=async () => {
        const bal=await finance._userHonorBalances(account);
       
        setBalance(bal);
        }
    
        checkFinance();

       

    },[finance,account])

    return balance;
}