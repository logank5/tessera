import React, { useEffect, useState } from 'react';
import {
    Box, VStack, Flex, Heading, Avatar, Center, useColorModeValue,
    Spacer, Divider, Link, Card
} from '@chakra-ui/react';
import { Table, TableContainer, Tr, Td, Tbody, Thead, Th } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import TicketsTable from './TicketsTable';
import { IoTicket } from "react-icons/io5";

function UserTickets({ id }) {
    const [tickets, setTickets] = useState([]);
    const [event, setEvent] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/tickets/${id}`, {
            credentials: 'include'
        })

            .then(response => response.json())
            .then(setTickets)
            .catch(error => console.error('Error fetching tickets:', error));
    }, []);

    async function getEvent(event_id) {
        fetch(`http://localhost:5000/events/${event_id}`, {
            credentials: 'include'
        })

            .then(response => response.json())
            .then((event) =>
                setEvent(event[0])
            )
            .catch(error => console.error('Error fetching events:', error));

        return event
    }

    return (
        <Box>
            <Center height='60vh'>
                <Card rounded='5px' boxShadow={'5px'} p='20px'>
                    <Flex>
                        <IoTicket size='35px' />
                        <Spacer />
                        <Heading>
                            User Tickets
                        </Heading>
                        <Spacer />
                        <IoTicket size='35px' />
                    </Flex>
                    <VStack>


                        <Spacer />
                        <TableContainer>
                            <Table variant='striped' colorScheme='blue'>
                                <Thead>
                                    <Tr>
                                        <Th color={color} fontWeight='bold'>Event</Th>
                                        <Th fontWeight='bold'>Event Date</Th>
                                        <Th fontWeight='bold'>Row Name</Th>
                                        <Th fontWeight='bold'>Seat Number</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {tickets.map(ticket => (
                                        <TicketsTable
                                            key={ticket.row_name + ticket.seat_number}
                                            event_id={ticket.event_id}
                                            row={ticket.row_name}
                                            number={ticket.seat_number}
                                        />
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </VStack>
                </Card>
            </Center>
        </Box>
    );
}

export default UserTickets;