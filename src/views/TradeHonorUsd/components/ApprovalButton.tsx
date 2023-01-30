import React, { PropsWithChildren } from 'react'
import { JSBI, Token, TokenAmount } from "@honorswap/sdk";
import { Button } from "@honorswap/uiswap";
import Dots from "components/Loader/Dots";
import useTokenAllowance from 'hooks/useTokenAllowance';
import { ApprovalState, useApproveCallback } from "hooks/useApproveCallback"
import { MaxUint256 } from '@ethersproject/constants'
import { useTranslation } from 'contexts/Localization'



type ApprovalProps = {
    token : Token,
    toApprove : string,
    children? : React.ReactNode
}

const ApprovalButton = ({ token, toApprove,children }: ApprovalProps) => {

  

    const tokenAmount=new TokenAmount(token,MaxUint256.toBigInt());
    
    const [approvalA,approveACallback] = useApproveCallback(tokenAmount,toApprove)
    const { t } = useTranslation()
    
    const allowance=useTokenAllowance(token,toApprove);

    if(allowance===undefined)
    {
      return (<Button disabled >Loading Approve</Button>)
    }
    if(allowance.greaterThan(JSBI.BigInt('0')))
    {
      return (<div>{children}</div>)
    }

    return (
        <>
        { approvalA !== ApprovalState.APPROVED  ?
         (
            <Button
              onClick={approveACallback}
              disabled={approvalA === ApprovalState.PENDING}

            >
              {approvalA === ApprovalState.PENDING ? (
                <Dots>{t('Enabling %asset%', { asset: token.symbol })}</Dots>
              ) : (
                t('Enable %asset%', { asset: token.symbol })
              )}
            </Button>
          )

          :
        (
            <div>{children}</div>
        )
}
          </>
    )
}

export default ApprovalButton;