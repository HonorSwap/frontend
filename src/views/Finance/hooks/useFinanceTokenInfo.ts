import useActiveWeb3React from "hooks/useActiveWeb3React";
import { useFinanceHonorContract } from "hooks/useContract"
import { useEffect, useState } from "react";


export const useFinanceTokenInfo = (token:string) => {
    
    const finance=useFinanceHonorContract();
    const [info,setInfo] = useState(undefined);
    
    useEffect(  () => {
        const checkFinance=async () => {
        const ret=await finance._tokenFinances(token);
       
        setInfo(ret);
        }
    
        checkFinance();

       

    },[finance,token])

    return info;
}