import React, { useEffect, useState } from 'react';
import { Center, Flex, Divider, VStack, InputRightElement, InputGroup, Image } from '@chakra-ui/react';
import EventCard from './EventCard';
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    Input,
    useColorModeValue,
} from '@chakra-ui/react'

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    HStack,
    DarkMode,
    IconButton,
} from '@chakra-ui/react'

import { FaSearch } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { GrClear } from "react-icons/gr";

function Filter({ sendDataToParent }) {

    //Contants
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')

    const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
    const btnRef = React.useRef()

    const [afterDate, setAfterDate] = useState('');
    const [beforeDate, setBeforeDate] = useState('');
    const [location, setLocation] = useState('');
    const [name, setName] = useState('');

    function handleClick() {
        sendDataToParent(name, beforeDate, afterDate, location);
    }
    function clear() {
        sendDataToParent('', '', '', '');
        setAfterDate('');
        setBeforeDate('');
        setLocation('');
        setName('');
    }

    return (
        <>


            {/* Accordian used for the filter */}
            <Accordion allowToggle p='10px' mt='80px' bg={color}>
                <AccordionItem>
                    <h2>
                        {/* Button for opening the accordian */}
                        <AccordionButton>
                            <Box as='span' flex='1' textAlign='left' fontSize="l" fontWeight='bold'>
                                Filter Events
                            </Box>
                            <AccordionIcon />
                        </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} ml='150px' mr='150px' alignContent='center'>
                        <HStack>
                            {/* Search by name */}
                            <InputGroup>
                                <InputRightElement
                                    pointerEvents="none"
                                    children={<FaSearch bg={bg} />}
                                />
                                <Input type='text' value={name}
                                    color={bg} onChange={e => setName(e.target.value)}
                                    placeholder='Event Name:'
                                />
                            </InputGroup>

                            <Center height='50px' p='5px'>
                                <Divider orientation='vertical' borderColor={flip} />
                            </Center>

                            {/* Search by location */}
                            <InputGroup>
                                <InputRightElement
                                    pointerEvents="none"
                                    children={<FaLocationDot color={bg} />}
                                />
                                <Input type='text' value={location} color={bg} onChange={e => setLocation(e.target.value)} placeholder='Event Location:' />
                            </InputGroup>

                            <Center height='50px' p='5px'>
                                <Divider orientation='vertical' borderColor={flip} />
                            </Center>

                            {/* Search by date */}
                            <Input size='md' value={afterDate} color={bg} onChange={e => setAfterDate(e.target.value)} type='date' />
                            <Center>
                                <>-</>
                            </Center>
                            <Input size='md' value={beforeDate} color={bg} onChange={e => setBeforeDate(e.target.value)} type='date' />

                            <Center height='50px' p='5px'>
                                <Divider orientation='vertical' borderColor={flip} />
                            </Center>

                            {/* Apply Filter Changes Button */}
                            <Button bg={bg} color={color} onClick={handleClick} variant='outline' width='150px'>Apply</Button>

                            {/* Clear filter button */}
                            <IconButton onClick={clear} aria-label='clear' variant='outline' icon={<GrClear />} />

                        </HStack>
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>

            {/* <Button ref={btnRef} bg={bg} color={color} onClick={onOpen} m='5'>
                Filters
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                padding='50px'
                size='xs'
                variant="temporary"
                ModalProps={{
                    keepMounted: false,
                }}
                focusTrap={false}
            >
                <DrawerOverlay />
                <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Select your Filters</DrawerHeader>

                <DrawerBody>
                    <VStack>

                    
                    <InputGroup>
                        <InputRightElement
                            pointerEvents="none"
                            children={<FaSearch color={bg} />}
                        /> 
                        <Input type='text' value={name} 
                        color={bg} onChange={e => setName(e.target.value)} 
                        placeholder='Event Name:'
                        />
                    </InputGroup>
                        
                    <Divider orientation='horizontal' />

                    <InputGroup>
                        <InputRightElement
                            pointerEvents="none"
                            children={<FaLocationDot color={bg} />}
                        /> 
                        <Input type='text' value={location} color={bg} onChange={e => setLocation(e.target.value)} placeholder='Event Location:'/>
                    </InputGroup>
                        
                    <Divider orientation='horizontal' />
                    <Flex>
                        
                    <Input size='xs' value={afterDate} color={bg} onChange={e => setAfterDate(e.target.value)}  type='date' />
                    <Center>
                        <> - </>
                    </Center>
                    <Input size='xs' value={beforeDate} color={bg} onChange={e => setBeforeDate(e.target.value)} type='date' />
                    
                    </Flex>

                    <Image src='https://media1.tenor.com/m/c-S8cUwVVVEAAAAC/duck-dance.gif'/>
                    </VStack>
                    
                    
                </DrawerBody>

                <DrawerFooter>
                    <Button variant='outline' mr={3} onClick={clear}>Clear</Button>
                    <Button bg={bg} color={color} onClick={handleClick}>Apply</Button>
                </DrawerFooter>
                </DrawerContent>
            </Drawer> */}
        </>
    )
}

export default Filter;