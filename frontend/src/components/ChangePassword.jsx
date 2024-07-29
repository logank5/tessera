import React, { useEffect, useState } from 'react';
import { Box, VStack, Text, Center, useColorModeValue,
    Spacer, Divider, Button, Heading, Card, chakra
 } from '@chakra-ui/react';
import {InputGroup, Input, InputRightElement, InputLeftElement} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { MdLockReset } from "react-icons/md";


function ChangePassword({ id, firstname, lastname, username, email, avatar }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const navigate = useNavigate();
    const [old_password, setOldPassword] = useState('');
    const [new_password, setNewPassword] = useState('');
    const [confirm_password, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleShowClick = () => setShowPassword(!showPassword);
    const CFaLock = chakra(FaLock);

    async function handleClick() {
        fetch(`http://localhost:5000/user/password/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
            {
                old_password: old_password,
                new_password: new_password,
                confirm_password: confirm_password,
            }
            ),
        })
         .then( response => {
             if (response.status === 200)
                {
                    navigate('/login')}
           })
           
         .catch(error => console.error('Password Change Failed:', error));
         
     }

    return(
        <Box height='80vh'>
            <Center>
                <Card rounded='5px' boxShadow={'5px'} width='45%' mt='50px' bg={color} height='50vh'>
                    <VStack p='30px'>
                        <Heading>
                            Change Password
                        </Heading>
                        <Spacer p='10px'/>
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaLock/>
                            </InputRightElement>
                            <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter Current Password"
                                    color={bg}
                                    value={old_password} onChange={e => setOldPassword(e.target.value)}
                                />
                        </InputGroup>
                        <Spacer p='10px'/>
                        <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter New Password"
                                    color={bg}
                                    value={new_password} onChange={e => setNewPassword(e.target.value)}
                                />
                                <InputRightElement pointerEvents='none'>
                                <MdLockReset size='70%'/>
                            </InputRightElement>
                            </InputGroup>
                        <Spacer p='10px'/>
                            <InputGroup>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Confirm New Password"
                                    color={bg}
                                    value={confirm_password} onChange={e => setConfirmPassword(e.target.value)}
                                />
                                <InputRightElement width="3.3rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        <Spacer p='30px'/>
                        <Divider/>
                        <Spacer p='10px'/>
                        <Button onClick={handleClick} bg={bg} color={color} type='submit'>
                            Save Changes
                        </Button>
                    </VStack>
                </Card>
            </Center>
        </Box>
    );
}

export default ChangePassword;