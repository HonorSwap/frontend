import React, { PropsWithChildren } from 'react'
import { Token, TokenAmount } from "@honorswap/sdk";
import { Button } from "@honorswap/uiswap";
import Dots from "components/Loader/Dots";
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