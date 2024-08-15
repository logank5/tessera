import React, { useEffect, useState } from 'react';
import {
    Box, VStack, Text, Heading, Avatar, Center, useColorModeValue,
    Spacer, Divider, Link, Card
} from '@chakra-ui/react';
import { Table, TableContainer, Tr, Td, Tbody } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function ProfileInfo({ firstname, lastname, username, email, avatar, phone }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const navigate = useNavigate();

    async function handleClick() {
        fetch(`http://localhost:5000/logout`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => {
                if (response.status === 200) {
                    navigate(`/events`)
                }
            })

            .catch(error => console.error('Invalid Credentials:', error));

    }

    return (
        <Box >
            <Center height='59vh' mt='3px'>
                <Card rounded='5px' boxShadow={'5px'} width='30%' bg={color} p='20px'>
                    <VStack>
                        <Heading>
                            {firstname} {lastname}
                        </Heading>
                        <Spacer />
                        <Avatar size='lg' src={avatar} />
                        <Text>
                            @{username}
                        </Text>
                        <TableContainer>
                            <Table variant='unstyled' color={flip}>
                                <Tbody>
                                    <Tr>
                                        <Td fontWeight='semibold'>Full Name:</Td>
                                        <Td>{firstname} {lastname}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight='semibold'>Username:</Td>
                                        <Td>{username}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight='semibold'>Email:</Td>
                                        <Td>{email}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td fontWeight='semibold'>Phone Number:</Td>
                                        <Td>{phone}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Spacer />
                        <Text>
                            Not {firstname} {lastname}?
                        </Text>
                        <Divider />
                        <Box>
                            <Link onClick={handleClick} color='red.500'>
                                Sign Out
                            </Link>
                        </Box>
                    </VStack>
                </Card>
            </Center>
        </Box>
    );
}

export default ProfileInfo;