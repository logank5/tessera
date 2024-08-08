import React, { useEffect, useState } from 'react';
import { Text, chakra, FormControl, InputGroup, InputLeftElement, Input, InputRightElement, AlertIcon, AlertTitle } from '@chakra-ui/react';
import { Button, FormHelperText, Center, Box, Stack, useColorModeValue, Flex, Spacer, Alert, DarkMode, FormErrorMessage } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Login() {
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [isInvalid, setIsInvalid] = useState(false);

    const navigate = useNavigate();

    async function handleClick() {
        fetch(`http://localhost:5000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                {
                    username: username,
                    password: password
                }
            ),
            credentials: 'include'
        })
            .then(response => {
                if (response.status === 200) { navigate(`/events`) }
                else { setIsInvalid(true) }
            })

            .catch(error => console.error('Invalid Credentials:', error));

    }



    return (
        <Flex>
            <Box width='80%' height='100vh' pt='15%'>
                <Stack
                    flexDir="column"
                    mb="2"
                    justifyContent="center"
                    alignItems="center"
                    mt={'80px'}
                >
                    <Text fontSize='25px' fontWeight="bold" color={bg}>
                        Login
                    </Text>
                    <Box minW={{ base: "100%", md: "450px" }}>
                        <form>
                            <Stack
                                spacing={4}
                                p="20px"
                                backgroundColor={color}
                                boxShadow="lg"
                                rounded='lg'
                            >
                                <FormControl>
                                    {isInvalid ?
                                        <Alert status='error' rounded='5px' mb='15px'>
                                            <AlertIcon />
                                            <AlertTitle>Incorrect username or password</AlertTitle>
                                        </Alert> : null}

                                    <InputGroup>
                                        <InputLeftElement
                                            pointerEvents="none"
                                            children={<CFaUserAlt color={bg} />}
                                        />
                                        <Input type="text"
                                            value={username}
                                            onChange={e => setUsername(e.target.value)}
                                            placeholder="Email Address or Username" color={bg} />
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
                                        <InputRightElement width="4.5rem">
                                            <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                                {showPassword ? <FaRegEye /> : <FaRegEyeSlash />}
                                            </Button>
                                        </InputRightElement>
                                    </InputGroup>
                                    <Flex>
                                        <FormHelperText textAlign="left">
                                            <Link href={`/changepassword/`}>change password</Link>
                                        </FormHelperText>
                                        <Spacer />
                                        <FormHelperText textAlign="right">
                                            <Link>forgot password?</Link>
                                        </FormHelperText>
                                    </Flex>
                                </FormControl>
                                <Button
                                    variant="solid"
                                    bg={bg}
                                    width="full"
                                    color={color}
                                    colorScheme='blue'
                                    borderRadius='10px'
                                    onClick={handleClick}
                                // as={Link} to={isInvalid ?  `/login` : `/events`}
                                // type='submit'
                                >
                                    Login
                                </Button>
                            </Stack>
                        </form>
                    </Box>
                </Stack>
            </Box>
            <Spacer />
            <Box pt='300px' bg={bg} height='100vh' width='30%' textShadow={`0 0 20px ${flip}`}
                bgImage="url('https://pm1.aminoapps.com/6975/01764693b7b72696a4edb83eae0a811be0b7af03r1-576-1024v2_uhq.jpg')"
            >
                <Stack mt='30%'>
                    <Text align='center' fontWeight="bold" color={color} fontSize='30px'>New Here?</Text>
                    <Spacer />
                    <Text align='center' fontWeight="bold" color={color} fontSize='20px'>
                        Sign up to see your favorite events now!
                    </Text>
                    <Spacer mb='10px' />
                    <Center>
                        <DarkMode>
                            <Button align='center' borderRadius='100px' shadow={`0 0 20px ${flip}`}
                                as={Link} to={`/register`}
                                color={color} bg={bg} width='30%'>
                                Sign Up
                            </Button>
                        </DarkMode>
                    </Center>

                </Stack>
            </Box>

        </Flex>
    )
};

export default Login;