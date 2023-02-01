import BigNumber from "bignumber.js";

export interface FinanceBalance {
    start_time : BigNumber;
    duration: BigNumber;
    interest_rate :BigNumber;
    amount : BigNumber;
    busdValue : BigNumber;
}

export interface FinanceInfo {
    
    _maxAmountPerUser : BigNumber;
    _maxTotalAmount : BigNumber;
    _totalAmount : BigNumber;
    _interest : BigNumber;

}