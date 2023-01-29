import React,{useState} from 'react'

import { ButtonMenu, ButtonMenuItem, Heading } from "@honorswap/uiswap";




export default function SelectDuration (props) {
    const [index,setIndex] = useState(0);
    const {setDuration} = props;

    const onItemClick = (newIndex) => {
        setIndex(newIndex)
        setDuration(newIndex)
    }

    return (
        <div>
        <Heading scale="lg" color="text" textAlign="center">
          Select Duration
        </Heading>
 
        <br/>
    <ButtonMenu activeIndex={index} onItemClick={onItemClick} fullWidth variant="subtle">
        <ButtonMenuItem >1 Month</ButtonMenuItem>
        <ButtonMenuItem>3 Months</ButtonMenuItem>
        <ButtonMenuItem>6 Months</ButtonMenuItem>
        <ButtonMenuItem>1 Year</ButtonMenuItem>
    </ButtonMenu>
    </div>
    )
  }