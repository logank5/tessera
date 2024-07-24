import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Heading, Avatar, Center, useColorModeValue,
    Spacer, Divider, Link
 } from '@chakra-ui/react';
import {Table, TableContainer, Tr, Td, Tbody} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

function ProfileInfo({ id, firstname, lastname, username, email, avatar }) {
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
         .then( response => {
             if (response.status === 200)
                {
                    navigate(`/events`)}
           })
           
         .catch(error => console.error('Invalid Credentials:', error));
         
     }

    return(
        <Box 
            >
            <Center height='60vh'>
                <Box rounded='5px' boxShadow={'5px'} width='30%' bg={color} p='20px'>
                    <VStack>
                        <Heading>
                            Account Details
                        </Heading>
                        <Spacer/>
                        <Avatar size='lg' src={avatar}/>
                        <Text>
                            @{username}
                        </Text>
                        <TableContainer>
                            <Table variant='unstyled' color={flip}>
                                <Tbody>
                                    <Tr>
                                        <Td>Name</Td>
                                        <Td>{firstname} {lastname}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Username</Td>
                                        <Td>{username}</Td>
                                    </Tr>
                                    <Tr>
                                        <Td>Email</Td>
                                        <Td>{email}</Td>
                                    </Tr>
                                </Tbody>
                            </Table>
                        </TableContainer>
                        <Spacer/>
                        <Text>
                            Not {firstname} {lastname}?
                        </Text>
                        <Divider/>
                        <Box>
                            <Link onClick={handleClick} color='red.500'>
                                Sign Out
                            </Link>
                        </Box>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
}

export default ProfileInfo;