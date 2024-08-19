import React, { useEffect, useState } from 'react';
import {
    useColorModeValue, Card, Stack, Text, CardBody, Heading, Spacer
    , Flex, Divider, Center, VStack
} from '@chakra-ui/react';

function ReservedRow({ id }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const [seat, setSeat] = ("")
    const [price, setPrice] = ("")
    const array = id.split("$");


    return (


        <Card
            direction={{ base: 'column', sm: 'row' }}
            variant='outline'
            m='10px'

        >

            <CardBody>
                <Flex height='100%' alignItems="center">
                    <VStack>
                        <Heading size='md'>Seat</Heading>

                        <Text>
                            {array[0]}
                        </Text>
                    </VStack>
                        <Spacer>
                        </Spacer>

                        <Divider mr='35px' borderColor={flip} orientation='vertical'></Divider>
                    <VStack>
                        <Heading size='md'>Price</Heading>
                        <Text>
                            ${array[1]}
                        </Text>
                    </VStack>
                </Flex>
            </CardBody>

        </Card>

    );
}

export default ReservedRow;