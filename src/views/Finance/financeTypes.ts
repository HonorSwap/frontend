import BigNumber from "bignumber.js";

export interface FinanceBalance {
    start_time : BigNumber;
    duration: BigNumber;
    interest_rate :BigNumber;
    amount : BigNumber;
    busdValue : BigNumber;
}

export interface FinanceInfo {
    
    maxAmountPerUser : BigNumber;
    maxTotalAmount : BigNumber;
    totalAmount : BigNumber;
    interest : BigNumber;

}