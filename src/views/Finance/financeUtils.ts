import BigNumber from "bignumber.js";



export default class FinanceUtil
{
    public static YEAR_BN=new BigNumber(31536000);

    public static ONE_BN = new BigNumber(1e16);

    public static getInterest = (interest : BigNumber) => {

        const yearNum:BigNumber=interest.multipliedBy(FinanceUtil.YEAR_BN)

        const faiz=FinanceUtil.ONE_BN.div(yearNum);
        return faiz.toFixed(2);
    }

    
    public static numberFormat = (val:string) => {
        return val.replace(/(.)(?=(\d{3})+$)/g,'$1,');
    }

    public static minToMax = (min:number,max:number) => {
        const num1=FinanceUtil.numberFormat(min.toString());
        const num2=FinanceUtil.numberFormat(max.toString());

        return `${num1} - ${num2}`; 
    }

    public static getFactor = (duration:number) => {
        switch(duration) {
            case 0:
                return 1;
            case 1:
                return 1.15;
            case 2:
                return 1.35;
            case 3:
                return 1.64;
            default:
                return 1;
        }
    }

    public static aprToApy = (apr:number,period:number) => {
        return ((((1+((apr/100)/period))**period)-1)*100).toFixed(2);
    }

    public static getCurAPY = (tokenInterest:BigNumber,duration:number) => {
        const factor=FinanceUtil.getFactor(duration);
        const interest=tokenInterest.multipliedBy(factor);
        return FinanceUtil.YEAR_BN.multipliedBy(interest).dividedBy(FinanceUtil.ONE_BN).toFixed(2);
    }

    public static interestToAPY = (interest:BigNumber,period:number) => {
        const apr=FinanceUtil.YEAR_BN.multipliedBy(interest).dividedBy(FinanceUtil.ONE_BN).toFixed(4);

        const intVal=parseFloat(apr);

        return FinanceUtil.aprToApy(intVal,period);
    }

    public static interestToApyFactor = (interest:BigNumber,factor:number,period:number) => {
        return FinanceUtil.interestToAPY(interest.multipliedBy(factor),period);
    }

    public static  getDurationCaption = (duration) => {

        switch(duration) {
          case 0 :
           return "1 Month";
          case 1:
            return "3 Months";
          case 2:
            return "6 Months";
          case 3:
            return "1 Year";
          default:
            return "Loading.."
        }
        return "Loading.";
      }

      public static etherToNumber = (val : string,fixed : number ) => {
        const num=new BigNumber(val);
        return num.dividedBy(new BigNumber(1e18)).toFixed(fixed);
      }
}







