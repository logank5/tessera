import React, { useEffect, useState } from 'react';
import {
    Box, VStack, Text, Center, useColorModeValue,
    Spacer, Divider, Button, Heading, Card
} from '@chakra-ui/react';
import { InputGroup, Input, InputRightElement } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserAlt, FaPhone } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaImage } from "react-icons/fa6";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import { FaTrashAlt } from "react-icons/fa";


function UpdateProfile({ id, username }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const navigate = useNavigate();
    const [new_username, setNewUsername] = useState('');
    const [new_email, setNewEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [password, setPassword] = useState('');

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
            .then(response => {
                if (response.status === 200) {
                    location.reload()
                }
            })

            .catch(error => console.error('Update Failed:', error));

    }

    async function deleteUser() {
        fetch(`http://localhost:5000/logout`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .catch(error => console.error('Invalid Credentials:', error));
        fetch(`http://localhost:5000/user`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password,
                }
            ),
        })
            .then(response => {
                if (response.status === 200) {
                    navigate(`/login`)
                }
            })
            .catch(error => console.error('Update Failed:', error));

    }

    return (
        <Box height='80vh'>
            <Center>
                <Card rounded='5px' boxShadow={'5px'} width='45%' mt='50px' bg={color} height='62vh'>
                    <VStack p='30px'>
                        <Heading>
                            Update Account Details
                        </Heading>
                        <Spacer p='10px' />
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaUserAlt />
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={new_username}
                                onChange={e => setNewUsername(e.target.value)} placeholder='Update Username' />
                        </InputGroup>
                        <Spacer p='10px' />
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <MdMail />
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={new_email}
                                onChange={e => setNewEmail(e.target.value)} placeholder='Update Email' />
                        </InputGroup>
                        <Spacer p='10px' />
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaPhone />
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={phone}
                                onChange={e => setPhone(e.target.value)} placeholder='Update Phone number' />
                        </InputGroup>
                        <Spacer p='10px' />
                        <InputGroup>
                            <InputRightElement pointerEvents='none'>
                                <FaImage />
                            </InputRightElement>
                            <Input focusBorderColor={bg} type='text' value={avatarUrl}
                                onChange={e => setAvatarUrl(e.target.value)} placeholder='Update Avatar URL' />
                        </InputGroup>
                        <Spacer p='30px' />
                        <Divider />
                        <Spacer p='10px' />
                        <Button onClick={handleClick} bg={bg} color={color} type='submit'>
                            Save Changes
                        </Button>
                        <Button onClick={onOpen} fontSize={'18'} rightIcon={<FaTrashAlt />} mt={'1'} bg='red.500' color={color} variant=''>
                            Delete User
                        </Button>
                        <Modal isOpen={isOpen} onClose={onClose}>
                            <ModalOverlay />
                            <ModalContent>
                                <ModalHeader alignSelf='center'>Are you sure?</ModalHeader>
                                <InputGroup m='10px' width='80%' alignSelf='center'>
                                    <Input type='text' value={password}
                                        onChange={e => setPassword(e.target.value)} placeholder='Enter password to confirm' />
                                </InputGroup>
                                <Button m='10px' width='50%' alignSelf='center' color='red.500' onClick={deleteUser}>
                                    Confirm Delete
                                </Button>

                            </ModalContent>
                        </Modal>
                    </VStack>
                </Card>
            </Center>
        </Box>
    );
}

export default UpdateProfile;