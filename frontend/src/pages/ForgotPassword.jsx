import React, { useEffect, useState } from 'react';
import { Text, chakra, FormControl, InputGroup, InputLeftElement, Input, InputRightElement} from '@chakra-ui/react';
import {Button, FormHelperText, Link, Center, Box, Stack, useColorModeValue, Flex, Spacer } from '@chakra-ui/react';
import { FaUserAlt, FaLock } from "react-icons/fa";


function ChangePassword(){
    const CFaUserAlt = chakra(FaUserAlt);
    const CFaLock = chakra(FaLock);
    const [showPassword, setShowPassword] = useState(false);

    const handleShowClick = () => setShowPassword(!showPassword);

    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')

    return (
        <Center mt='80px'>
            <Stack
                flexDir="column"
                mb="2"
                justifyContent="center"
                alignItems="center"
                mt={'150px'}
            >
                <Text fontSize='25px' fontWeight="bold" color={bg}>
                    Forgot Password
                </Text>
                <Box minW={{ base: "100%", md: "450px"}}>
                    <form>
                        <Stack
                        spacing={4}
                        p="20px"
                        backgroundColor={color}
                        boxShadow="lg"
                        rounded='lg'
                        >
                        <FormControl>
                            <InputGroup>
                            <InputLeftElement
                                pointerEvents="none"
                                children={<CFaUserAlt color={bg} />}
                            />
                            <Input type="email" placeholder="email address" color={bg}/>
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
                                    placeholder="Old Password"
                                    color={bg}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
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
                                    placeholder="New Password"
                                    color={bg}
                                />
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                    {showPassword ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                            <FormHelperText textAlign="right">
                                <Link>forgot password?</Link>
                            </FormHelperText>
                        </FormControl>
                        <Button
                            borderRadius={0}
                            type="submit"
                            variant="solid"
                            bg={bg}
                            width="full"
                            color={color}
                        >
                            Login
                        </Button>
                        </Stack>
                    </form>
                </Box>
            </Stack>
        </Center>
    );
}

export default ChangePassword;
