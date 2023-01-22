
import { useFinanceHonorContract } from "hooks/useContract"
import { useEffect, useState } from "react";
import { FinanceBalance } from "../financeTypes";

export const useFinanceIsDeposited = (account: string,token:string) => {
    
    const finance=useFinanceHonorContract();
    const [isDeposited,setIsDeposited] = useState<boolean>(undefined);
    
    useEffect(  () => {
        const checkFinance=async () => {
            const bal : FinanceBalance=await finance.getUserTokenBalance(account,token);
        
            if(bal.amount.isLessThan(1))
            {
                setIsDeposited(false);
            }
            else
            {
                setIsDeposited(true);
            }
    
        }
    
        checkFinance();

       

    },[finance,account,token])

    return isDeposited;
}