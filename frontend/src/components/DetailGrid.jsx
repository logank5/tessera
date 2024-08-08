import { GridItem, Grid, Image, Box, Text, Button, Center, useColorModeValue} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { SlArrowRight } from "react-icons/sl";
import SeatPicker from './SeatPicker';
import { FaShoppingCart } from "react-icons/fa";

function DetailGrid({id, name, date, time, location, imageUrl, description}) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')
    const [users, setUsers] = useState(null);
    const flip = useColorModeValue('gray.800', 'white')
    const [totalPrice, setTotalPrice] = useState(0.0);

    async function getPrice( row, number, adding ) {
    fetch(`http://localhost:5000/tickets/price/${id}/${row}/${number}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },

    })
    .then(response => response.json())
    .then(price => {
      console.log(price)
      if (adding == true){
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
          .then((users) => setUsers(users[0]))
          .catch(error => console.error('Error fetching user:', error));
    }, []);

  return (
    <Grid
      templateAreas={`"header header header"
                      "nav main image"
                      "purchase footer footer"`}
      gridTemplateRows={'50px 1fr 50px'}
      gridTemplateColumns={'300px 1fr'}
      h='250px'
      gap={5}
      m={5}
      fontSize={'18px'}
      color={color}
      fontWeight='bold'
      mt='100px'
    >
      <GridItem pl='2' bg={bgGrey} paddingTop={'1'} area={'header'} rounded='md' alignContent='center'>
        Event Title: {name}
      </GridItem>
      <GridItem pl='2' bg={bg} area={'nav'} rounded='md'>
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
      <GridItem pl='2' bg={bg} area={'main'} rounded='md'>
        {
            users ? 
            <SeatPicker
            key={users.user_id}
            user_id={users.user_id}
            event_id={id}
            getData={getPrice}
        />
            : null
        }
       
        {/* <Center> */}
            {/* {users.map(user => (
                <SeatPicker
                    key={user.user_id}
                    user_id={user.user_id}
                    event_id={id}
                    getData={getPrice}
                />
            ))} */}
        {/* </Center> */}
        
      </GridItem>
      <GridItem bg={bg} area={'image'} rounded='md'>
        <Box boxSize='sm'>
            <Center justifyContent='center'>
                <Image src={imageUrl} padding={5} alt='test' />
            </Center>
        </Box>
      </GridItem>
      <GridItem pl='2' bg={bg} area={'footer'} rounded='md'>
        {description}
      </GridItem>
      <GridItem bg={bgGrey} area={'purchase'} rounded='md'>
      <Center>
        <Button fontSize={'18'} rightIcon={<FaShoppingCart />} mt={'1'} colorScheme='blue' variant=''>
            ${totalPrice}
        </Button>
      </Center>
        
      </GridItem>
    </Grid>
  );
}

export default DetailGrid;