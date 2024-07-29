import React, { useEffect, useState } from 'react';
import { Text, chakra, FormControl, InputGroup, InputLeftElement, Input, InputRightElement, Grid, HStack} from '@chakra-ui/react';
import {Button, useColorMode, Link, Center, Box, Stack, useColorModeValue, GridItem, Flex, Spacer, DarkMode } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { MdMail } from "react-icons/md";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';



function Register(){
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const CMail = chakra(MdMail);
    const [showPassword, setShowPassword] = useState(false);

    const { colorMode, toggleColorMode } = useColorMode();

    const handleShowClick = () => setShowPassword(!showPassword);

    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm_password, setConfirm] = useState('');

    const navigate = useNavigate();

    function handleClick() {
        fetch(`http://localhost:5000/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', 
              },
            body: JSON.stringify(
                {
                    username: username,
                    email: email,
                    password: password,
                    firstname: firstname,
                    lastname: lastname,
                    confirm_password: confirm_password,
                }
            ),
            credentials: 'same-origin'
        })
        .then( response => {
            if (response.status === 200)
                {navigate(`/events`)}
          })
          
        .catch(error => console.error('User Creation Unsuccessful:', error));

    }
        

    return (
        <>
        <Grid templateColumns='repeat(3, 1fr)' gap={6}
            bgImage="url('https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg')"
            backgroundPosition="center"
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
        >
            
            <GridItem >

            </GridItem>
            <GridItem>
            <Center>
                <Box width='100%' height='100vh' pt='50%' bg={color} pl='20%' pr='20%'>
                    <Stack
                        flexDir="column"
                        mb="2"
                        justifyContent="center"
                        alignItems="center"
                        mt={'80px'}
                    >
                        
                            <Box minW={{ base: "100%", md: "450px"}} 
                                    backdropFilter="blur(10px)" 
                                    bg={color}
                                    // bg={colorMode === 'dark' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)'}
                                    >
                                <Box>

                                
                                <form>
                                    <Stack
                                    spacing={4}
                                    p="20px"
                                    boxShadow="lg"
                                    rounded='lg'
                                    >
                                    <Text fontSize='25px' fontWeight="bold" color={bg} align={'center'}>
                                        Create Account
                                    </Text>
                                    <HStack>
                                        <FormControl>
                                            <InputGroup>
                                                <Input type="text" 
                                                value={firstname} 
                                                onChange={e => setFirstname(e.target.value)} 
                                                placeholder="First Name" color={bg}/>
                                            </InputGroup>
                                        </FormControl>
                                        <Spacer></Spacer>
                                        <FormControl>
                                            <InputGroup>
                                                <Input type="text" 
                                                value={lastname} 
                                                onChange={e => setLastname(e.target.value)} 
                                                placeholder="Last Name" color={bg}/>
                                            </InputGroup>
                                        </FormControl>
                                    </HStack>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                children={<CFaUserAlt color={bg} />}
                                            />
                                            <Input type="text" 
                                            value={username} 
                                            onChange={e => setUsername(e.target.value)} 
                                            placeholder="Username" color={bg}/>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CMail color={bg} />}
                                        />
                                        <Input type="text" 
                                        value={email} 
                                        onChange={e => setEmail(e.target.value)} 
                                        placeholder="Email Address" color={bg}/>
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color={bg}
                                                children={<CFaLock color={bg} />}
                                            />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Password"
                                                color={bg}
                                                value={password} onChange={e => setPassword(e.target.value)}
                                            />
                                        </InputGroup>
                                    </FormControl>
                                    <FormControl>
                                        <InputGroup>
                                            <InputLeftElement
                                                pointerEvents="none"
                                                color={bg}
                                                children={<CFaLock color={bg} />}
                                            />
                                            <Input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="Confirm Password"
                                                color={bg}
                                                value={confirm_password} onChange={e => setConfirm(e.target.value)}
                                            />
                                            <InputRightElement width="4.5rem">
                                                <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                                </Button>
                                            </InputRightElement>
                                        </InputGroup>
                                    </FormControl>
                                    <Button
                                        variant="solid"
                                        bg={bg}
                                        width="full"
                                        color={color}
                                        colorScheme='blue'
                                        borderRadius='10px'
                                        onClick={handleClick}
                                        // type='submit'
                                    >
                                        Register
                                    </Button>
                                    </Stack>
                                </form>
                            </Box>
                            </Box>
                        </Stack>
                    </Box>
                            
                </Center>   
            </GridItem>
            <GridItem>

            </GridItem>

        </Grid>
        
        </>
    )}

export default Register;