import React, { useEffect, useState } from 'react';
import { Heading, Text, Flex, Box, Divider, Spacer, HStack } from '@chakra-ui/react';
import { FaCalendarAlt, FaClock, FaInfoCircle } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";


function AboutEvents({ id, name, date, time, location, imageUrl, description }) {

    return (

        <>
            <Flex>
                <Box width='100vh'>
                    <HStack m='15px'>
                        <FaCalendarAlt />
                        <Text fontSize='18px'>
                            Date: {date}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack m='15px'>
                        <FaClock />
                        <Text fontSize='18px'>
                            Time: {time}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack m='15px'>
                        <FaLocationDot />
                        <Text fontSize='18px'>
                            Location: {location}
                        </Text>
                    </HStack>
                    <Divider />
                    <HStack m='15px'>
                        <Text fontSize='18px'>
                            Description: {description}
                        </Text>
                    </HStack>
                </Box>
            </Flex>

        </>

    );
}

export default AboutEvents;