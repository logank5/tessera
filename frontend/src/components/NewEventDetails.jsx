import { VStack, Heading, Image, Box, Card, Button, Center, Text, Flex, useColorModeValue, Spacer, Divider } from '@chakra-ui/react'
import React, { useEffect, useState, useRef } from 'react';
import SeatPicker from './SeatPicker';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@chakra-ui/react';
import { Grid, GridItem, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import AboutEvents from './AboutEvents';
import "../styles.css";
import ReservedTickets from './ReservedTickets';



function NewEventDetails({ id, name, date, time, location, imageUrl, description }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')
    const [user, setUser] = useState(null);
    const flip = useColorModeValue('gray.800', 'white')
    const [totalPrice, setTotalPrice] = useState(0.0);
    const navigate = useNavigate();
    const [seats, setSeats] = useState([])
    const sectionRef = useRef(null);
    const seatRef = useRef(null);
    const [scrolling, setScrolling] = useState(false);

    const handleScroll = () => {
        if (window.pageYOffset >= 395) {
            setScrolling(true);
        } else {
            setScrolling(false);
        }
    };
    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("scroll", handleScroll);
    });


    async function getID(row, number, adding, price) {
        let seatId = row + number + '$' + price
        if (adding == true) {
            setSeats(seats => [...seats, seatId])
        }
        if (adding == false) {
            setSeats(prev => prev.filter(seat => seat != seatId))
        }

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
                getID(row, number, adding, price)
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

    return (

        <VStack mt='80px' align='stretch'>
            <Box height='40vh' opacity='55%' width='stretch' bg='gray.800' position='absolute' top='0%' mt='80px' />

            <Box height='40vh' bg='blue' width='stretch' bgImage={imageUrl}
                backgroundPosition="left"
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
                className="header flex"
            >
            </Box>
            <Box bg='gray.800' opacity='65%' position='absolute' top='0%' mt='80px' width='stretch' />
            <Heading color='white' ml='100px' position='absolute' top='15%' textShadow={`0 0 20px blue`}>
                {name}
            </Heading>
            <Box ref={sectionRef}></Box>
            <Box className={scrolling ? "sticky" : ""} id="navbar" boxShadow="xl" bg={color}>
                <Flex pl='15px' pr='15px' pt='5px' pb='15px'>
                    <Button borderweight='1px' borderColor={flip} bg={bg} mr='15px' color={color} onClick={() =>
                        window.scrollTo({
                            top: sectionRef.current.offsetTop,
                            behavior: "smooth"
                        })}>About</Button>
                    <Button bg={bg} color={color} onClick={() =>
                        window.scrollTo({
                            top: seatRef.current.offsetTop,
                            behavior: "smooth"
                        })}>Purchase Tickets</Button>
                </Flex>
            </Box>
            <Divider orientation='horizontal' alignSelf='center' borderColor={bg} mt='40px' mb='30px' width='170vh' className="content" />
            <Grid
                templateAreas=
                {`          "title title"
                            "about image"
                            "spacer spacer"
                            "header header"
                            "map tickets"
                            "map button"`}
                gridTemplateColumns={'1fr 650px'}
                gap='3'
                color={flip}
                fontWeight='bold'
                m='15px'

            >
                <GridItem borderWidth='1px' rounded='md' area={'title'} bg='transparent' p='15px'>
                    <Heading >About Event</Heading>
                </GridItem>
                <GridItem rounded='md' area={'about'} bg='transparent' p='15px'>
                    <AboutEvents
                        id={id}
                        name={name}
                        date={date}
                        time={time}
                        description={description}
                        location={location}
                        imageUrl={imageUrl} />
                </GridItem>
                <GridItem rounded='md' area={'image'} bg='transparent' p='30px'>
                    <Image width='600px' height='600px' src={imageUrl}></Image>
                </GridItem>
                <GridItem rounded='md' area={'spacer'} bg='transparent' p='15px'>
                    <Divider orientation='horizontal' alignSelf='center' borderColor={bg} mt='50px' mb='30px' width='170vh' className="content" />
                </GridItem>
                <GridItem borderWidth='3px' rounded='md' area={'header'} bg='transparent' p='15px'>
                    <Heading ref={seatRef}>Purchase Seats</Heading>
                </GridItem>
                <GridItem rounded='md' area={'map'} bg='transparent' p='15px' >
                    <Center p='50px'>
                        {
                            user ?
                                <SeatPicker
                                    user_id={user.user_id}
                                    event_id={id}
                                    getData={getPrice}
                                />
                                : null
                        }
                    </Center>
                </GridItem>
                <GridItem borderWidth='1px' rounded='md' area={'tickets'} bg={bgGrey} m='15px' mt='90px' mr='100px'>
                    {
                        user ?
                            <ReservedTickets
                                id={id}
                                seats={seats}
                                user_id={user.user_id}
                                totalPrice={totalPrice}
                            /> : null
                    }
                </GridItem>
            </Grid>
            <Spacer mt='80px'></Spacer>
        </VStack>




    );
}

export default NewEventDetails;