import { VStack, Heading, TabIndicator, Box, Card, Button, Center, Text, Flex, useColorModeValue, Spacer } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { SlArrowRight } from "react-icons/sl";
import SeatPicker from './SeatPicker';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';
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
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import AboutEvents from './AboutEvents';
import { Table, TableContainer, Tr, Td, Tbody, Thead, Th } from '@chakra-ui/react';


function NewEventDetails({ id, name, date, time, location, imageUrl, description }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')
    const [user, setUser] = useState(null);
    const flip = useColorModeValue('gray.800', 'white')
    const [totalPrice, setTotalPrice] = useState(0.0);
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()
    const seatIds = []

    async function getID(row, number, adding) {
        let seatId = row + str(number)
        if (adding == true) {
            seatIds.append(seatId)
        }
        if (adding == false) {
            seatIds.remove(seatId)
        }
        return seatId
    }

    async function getPrice(row, number, adding) {
        fetch(`http://localhost:5000/tickets/price/${id}/${row}/${number}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },

        })
            .then(response => response.json())
            .then(price => {
                if (adding == true) {
                    setTotalPrice(totalPrice + price)
                }
                if (adding == false) {
                    setTotalPrice(totalPrice - price)
                }
            })
            .catch(error => console.error('Error fetching seat price:', error));
    }

    useEffect(() => {
        fetch(`http://localhost:5000/user/logged`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then((user) => setUser(user[0]))
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    async function check() {
        navigate(`/checkout`)
    }



    return (

        <VStack mt='80px' align='stretch'>
            <Box height='40vh' bg='blue' width='stretch' bgImage={imageUrl}
                backgroundPosition="left"
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
            >
                <Heading color='white' mt='30vh' ml='100px' textShadow={`0 0 20px blue`}>
                    {name}
                </Heading>
            </Box>
            <Box bg={color} pl='100px' boxShadow="lg" height='45px'>
                <Tabs variant='unstyled' align='baseline'>
                    <TabList>
                        <Tab color={bg} fontWeight='bold'>
                            About
                        </Tab>
                        <Tab color={bg} fontWeight='bold'>
                            Purchase Tickets
                        </Tab>
                    </TabList>
                    <TabIndicator height='5px' bg={bg} borderRadius='1px' />
                    <TabPanels>
                        <TabPanel>
                            <AboutEvents
                                id={id}
                                name={name}
                                date={date}
                                time={time}
                                description={description}
                                location={location}
                                imageUrl={imageUrl} />
                        </TabPanel>

                        <TabPanel>
                            <Flex>
                                <Center p='100px'>
                                    {
                                        user ?
                                            <SeatPicker
                                                user_id={user.user_id}
                                                event_id={id}
                                                getData={getPrice}
                                                getId={getID}
                                            />
                                            : null
                                    }
                                </Center>

                                <Spacer></Spacer>

                                <Card height='auto' bg={bg} width='20%'>
                                    <TableContainer>
                                        <Table variant='striped' colorScheme='blue'>
                                            <Thead>
                                                <Tr>
                                                    <Th fontWeight='bold'>Tickets</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody>
                                            {seatIds.map(id => (
                                        <tr
                                            key={getID}
                                            
                                            row={ticket.row_name}
                                            number={ticket.seat_number}
                                        />
                                    ))}
                                            </Tbody>
                                        </Table>
                                    </TableContainer>

                                    <Button position='absolute' bottom="20%" onClick={onOpen} fontSize={'18'} rightIcon={<FaShoppingCart />} mt={'1'} colorScheme='blue' >
                                        ${totalPrice}
                                    </Button>
                                    <Modal isOpen={isOpen} onClose={onClose}>
                                        <ModalOverlay />
                                        <ModalContent>
                                            <ModalHeader>Checkout</ModalHeader>
                                            {
                                                user ?
                                                    <PaymentForm totalAmount={totalPrice} user_id={user.user_id} id={id} />
                                                    : null
                                            }
                                        </ModalContent>
                                    </Modal>
                                </Card>

                            </Flex>


                        </TabPanel>

                        <TabPanel>

                        </TabPanel>

                        <TabPanel>

                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>

        </VStack>


    );
}

export default NewEventDetails;