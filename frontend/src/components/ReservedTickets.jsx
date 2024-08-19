import { Heading, Image, Box, Card, Button, Center, Text, Flex, useColorModeValue, Spacer, Divider, CardBody } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react';
import { FaShoppingCart } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import PaymentForm from './PaymentForm';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader
} from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react';
import TicketCard from './TicketCard';
import "../styles.css";



function ReservedTickets({ id, totalPrice, user_id, seats }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')
    const [user, setUser] = useState(null);
    const flip = useColorModeValue('gray.800', 'white')
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure()



    return (
        <Card borderColor={flip} borderWidth='1px'>
            <Heading p='15px' fontSize='20px'>
                TICKETS
            </Heading>
            <Divider></Divider>
            <CardBody>
                {seats.map(seat => (
                    <TicketCard
                        key={seat}
                        id={seat}
                    />
                ))}

                <Button m='10px' onClick={onOpen} fontSize={'18'} rightIcon={<FaShoppingCart />} colorScheme='blue' bg={bg} borderWidth='1px' borderColor={color}>
                    Checkout: ${totalPrice}
                </Button>
                <Modal isOpen={isOpen} onClose={onClose} className="checkout">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Checkout</ModalHeader>
                        
                            <PaymentForm totalAmount={totalPrice} user_id={user_id} id={id} />
                             
                        
                    </ModalContent>
                </Modal>
            </CardBody>

        </Card>
    );
}

export default ReservedTickets;