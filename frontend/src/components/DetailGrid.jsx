import { GridItem, Grid, Image, Box, Text, Button, Center, useColorModeValue } from '@chakra-ui/react'
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

function DetailGrid({ id, name, date, time, location, imageUrl, description }) {
  const bg = useColorModeValue('blue.500', 'blue.400')
  const bgGrey = useColorModeValue('gray.500', 'lightgrey')
  const color = useColorModeValue('white', 'gray.800')
  const [user, setUser] = useState(null);
  const flip = useColorModeValue('gray.800', 'white')
  const [totalPrice, setTotalPrice] = useState(0.0);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()


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
    <Grid
      templateAreas={`"header header header"
                      "nav main image"
                      "purchase main image"`}
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'300px 1fr'}
      h='87vh'
      gap={5}
      m={5}
      fontSize={'18px'}
      color={color}
      fontWeight='bold'
      mt='100px'
    >
      <GridItem pl='15' bg={bgGrey} paddingTop={'1'} area={'header'} rounded='md' alignContent='center'>
        Event Title: {name}
      </GridItem>
      <GridItem bg={bg} area={'nav'} rounded='md' p='15px'>
        <Text fontWeight='semibold' fontSize={'18px'}>
          Event Details:
        </Text>
        <Text fontWeight='semibold' fontSize={'15px'}>
          Date: {date}
        </Text>
        <Text fontWeight='semibold' fontSize={'15px'}>
          Time: {time}
        </Text>
        <Text fontWeight='semibold' fontSize={'15px'}>
          Location: {location}
        </Text>
      </GridItem>
      <GridItem bg={bg} area={'main'} rounded='md'>
        {
          user ?
            <SeatPicker
              user_id={user.user_id}
              event_id={id}
              getData={getPrice}
            />
            : null
        }


      </GridItem>
      <GridItem bg={bg} area={'image'} rounded='md'>
        <Box boxSize='sm'>
          <Center justifyContent='center'>
            <Image src={imageUrl} padding={5} alt='test' />
          </Center>
          <Text fontSize='15px' p='25px'>Description: {description}</Text>
        </Box>
      </GridItem>
      <GridItem bg={bgGrey} area={'purchase'} rounded='md'>
        <Center>
          <Button onClick={onOpen} fontSize={'18'} rightIcon={<FaShoppingCart />} mt={'1'} colorScheme='blue' variant=''>
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

        </Center>

      </GridItem>

    </Grid>
  );
}

export default DetailGrid;