import React,{useState} from 'react'
import { Flex , Text ,Slider, Card, CardHeader,CardRibbon} from '@pancakeswap/uikit'

const FinanceInfo = () => {

    const [dayValue,setValue] = useState<number>(0);

    const onSliderChanged = (value: number) => {
        setValue(value);
    }
    return (
        <div style={{ padding: "32px", width: "500px" }}> 
       <Card ribbon={<CardRibbon text="HOT" /> }>
        <CardHeader>Stake BUSD</CardHeader>
        <Slider min={1} max={36} value={1} name="slider_invest" 
        onValueChanged={onSliderChanged}
        step={1}
        />
        <Text>{dayValue} months</Text>
        </Card>
        
        </div>
    )
}

export default FinanceInfo;