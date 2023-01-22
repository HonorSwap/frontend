import React,{useState} from 'react'

import { ButtonMenu, ButtonMenuItem } from "@honorswap/uiswap";




export default function SelectDuration (props) {
    const [index,setIndex] = useState(0);
    const {setDuration} = props;

    const onItemClick = (newIndex) => {
        setIndex(newIndex)
        setDuration(newIndex)
    }

    return (
    <ButtonMenu activeIndex={index} onItemClick={onItemClick} fullWidth variant="subtle">
        <ButtonMenuItem >1 Month</ButtonMenuItem>
        <ButtonMenuItem>3 Months</ButtonMenuItem>
        <ButtonMenuItem>6 Months</ButtonMenuItem>
        <ButtonMenuItem>1 Year</ButtonMenuItem>
    </ButtonMenu>
    )
  }