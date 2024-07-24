import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Center, useColorModeValue,
    Spacer, Divider, Button, Heading
 } from '@chakra-ui/react';
import {InputGroup, Input, InputRightElement} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaImage } from "react-icons/fa6";

function UpdateProfile({ id, firstname, lastname, username, email, avatar }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const navigate = useNavigate();
    const [new_username, setNewUsername] = useState('');
    const [new_email, setNewEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');

    async function handleClick() {
        fetch(`http://localhost:5000/user/update/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                new_username: new_username,
                new_email: new_email,
                phone: phone,
                avatar: avatarUrl,
            }
            ),
        })
         .then( response => {
             if (response.status === 200)
                {
                    location.reload()}
           })
           
         .catch(error => console.error('Update Failed:', error));
         
     }

    return(
        <Box height='80vh'>
            <Center>
                <Box rounded='5px' boxShadow={'5px'} width='50%' bg={color} p='20px' height='80vh'>
                    <VStack p='20px'>
                        <Heading>
                            Update Account Details
                        </Heading>
                        <Spacer p='10px'/>
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaUserAlt/>
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={new_username} 
                                onChange={e => setNewUsername(e.target.value)} placeholder='Update Username' />
                        </InputGroup>
                        <Spacer p='10px'/>
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <MdMail/>
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={new_email} 
                                onChange={e => setNewEmail(e.target.value)} placeholder='Update Email' />
                        </InputGroup>
                        <Spacer p='10px'/>
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaPhone/>
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={phone} 
                                onChange={e => setPhone(e.target.value)} placeholder='Update Phone number' />
                        </InputGroup>
                        <Spacer p='10px'/>
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaImage/>
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={avatarUrl} 
                                onChange={e => setAvatarUrl(e.target.value)} placeholder='Update Avatar URL' />
                        </InputGroup>
                        <Spacer p='30px'/>
                        <Divider/>
                        <Button onClick={handleClick} type='submit'>
                            Save Changes
                        </Button>
                    </VStack>
                </Box>
            </Center>
        </Box>
    );
}

export default UpdateProfile;