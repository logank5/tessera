import { GridItem, Grid, Image, Box, Text, Button, Center, useColorModeValue} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { SlArrowRight } from "react-icons/sl";

function DetailGrid({name, date, time, location, imageUrl, description}) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const bgGrey = useColorModeValue('gray.500', 'lightgrey')
    const color = useColorModeValue('white', 'gray.800')

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
        Seat Map
      </GridItem>
      <GridItem bg={bg} area={'image'} rounded='md'>
        <Box boxSize='sm'>
            <Center>
                <Image src={imageUrl} padding={5} alt='test' />
            </Center>
        </Box>
      </GridItem>
      <GridItem pl='2' bg={bg} area={'footer'} rounded='md'>
        {description}
      </GridItem>
      <GridItem bg={bgGrey} area={'purchase'} rounded='md'>
      <Center>
        <Button fontSize={'18'} rightIcon={<SlArrowRight />} mt={'1'} colorScheme='blue' variant=''>
            Find Tickets
        </Button>
      </Center>
        
      </GridItem>
    </Grid>
  );
}

export default DetailGrid;