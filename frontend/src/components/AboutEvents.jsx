import React, { useEffect, useState } from 'react';
import { Heading, Text, Flex, Box, Image, Spacer, Th } from '@chakra-ui/react';

function AboutEvents({ id, name, date, time, location, imageUrl, description }) {

    return (

        <>
            <Flex>
                <Box>
                    <Heading mt='50px' mb='25px'>
                        About
                    </Heading>
                    <Text>
                        Event Details: {date}, {time}
                    </Text>
                    <Text>
                        Location: {location}
                    </Text>
                    <Text>
                        {description}
                    </Text>
                </Box>
                <Spacer></Spacer>
                <Image src={imageUrl}></Image>
            </Flex>

        </>

    );
}

export default AboutEvents;