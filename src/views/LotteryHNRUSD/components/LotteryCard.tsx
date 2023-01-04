import React from "react";
import { Card, CardBody, CardHeader, Flex, Heading,Text } from "@pancakeswap/uikit";

interface IProps {
    time : string;
    lotID:number;
    winnerPrize:number;
}
export default function LotteryCard({time,lotID,winnerPrize}:IProps) {
    return (
        <Flex flex={1}>
            <Card>
                <CardHeader><Heading>Lottery ID -122-</Heading></CardHeader>
                <CardBody>
                    <Flex width="100%" flexDirection="column">
                        
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text>Time :</Text>
                            <Text>{time} Hour</Text>
                        </Flex>
                        <Flex justifyContent="space-between" alignItems="center">
                            <Text>Ticket Prize:</Text>
                            <Text>0.20$</Text>
                        </Flex>
                    </Flex>
                </CardBody>
            </Card>
        </Flex>
    )
}