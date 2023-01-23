import BigNumber from "bignumber.js";

export interface FinanceBalance {
    startTime : BigNumber;
    duration: BigNumber;
    interestRate :BigNumber;
    amount : BigNumber;
    busdValue : BigNumber;
}

export interface FinanceInfo {
    
    _maxAmountPerUser : BigNumber;
    _maxTotalAmount : BigNumber;
    _totalAmount : BigNumber;
    _interest : BigNumber;

}