import BigNumber from "bignumber.js";



export default class FinanceUtil
{
    public static YEAR_BN=new BigNumber(31536000);

    public static ONE_BN = new BigNumber(1e16);

    public static getInterest = (interest : BigNumber) => {

        const yearNum:BigNumber=interest.multipliedBy(FinanceUtil.YEAR_BN)

        const faiz=yearNum.dividedBy(FinanceUtil.ONE_BN);
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

    public static coinToApy = (coin:string) => {
      const num=new BigNumber(coin);

      const apr=num.multipliedBy(FinanceUtil.YEAR_BN).dividedBy(1e16);
    
      return FinanceUtil.aprToApy(apr.toNumber(),12);
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

    public static durationAprToApy = (interest:string,duration:string) => {
      const num=parseInt(duration);
      const _interest=new BigNumber(interest);
      if(num>=31536000)
      {
        return FinanceUtil.interestToApyFactor(_interest,1,1);
      }
      if(num>=7776000)
      {
        return FinanceUtil.interestToApyFactor(_interest,1,2);
      }
      if(num>=15552000)
      {
        return FinanceUtil.interestToApyFactor(_interest,1,4);
      }
      if(num>=2592000)
      {
        return FinanceUtil.interestToApyFactor(_interest,1,12);
      }
      return "Error!";

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

      public static getDurationNumber = (duration: number)  => {
       
          switch(duration)
          {
            case 0:
              return "2592000";
              break;
            case 1:
              return "7776000";
              break;
            case 2:
              return "15552000"
              break;
            case 3:
              return "31536000";
              break;
              default:
                return "2592000";
          }
      }

      public static getNumberToDurationID = (duration:string) => {
        const num=parseInt(duration);
        if(num>=31536000)
          return 3;
        if(num>=15552000)
          return 2;
        if(num>=7776000)
          return 1;
        if(num>=2592000)
          return 0;
        return 4;
      }

      public static etherToNumber = (val : string,fixed : number ) => {
        const num=new BigNumber(val);
        return num.dividedBy(new BigNumber(1e18)).toFixed(fixed);
      }

      public static tokenFormatStr = (value,symbol) => {
        if(value)
        {
        
            const numdigit=new BigNumber(1e18);
            let retVal= new BigNumber(value).dividedBy(numdigit).integerValue().toFormat(0, {
                decimalSeparator: '',
                groupSeparator: ''
        });
            retVal=retVal.replace(/(.)(?=(\d{3})+$)/g,'$1,')
            const ret=`${retVal} ${symbol}` ;
            return ret;
        }
    
            
        return "Loading.."
    }
}







