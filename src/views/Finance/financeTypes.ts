import BigNumber from "bignumber.js";

export interface FinanceBalance {
    startTime : BigNumber;
    duration: BigNumber;
    interestRate :BigNumber;
    amount : BigNumber;
    busdValue : BigNumber;
}

export interface FinanceIsDeposit {
    isDeposited : boolean;

}