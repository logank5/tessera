import React, { useEffect, useState } from 'react';
import { SimpleGrid, Container } from '@chakra-ui/react';
import EventCard from '../components/EventCard';
import Filter from '../components/Filter';
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


function EventsPage() {
  const bg = useColorModeValue('blue.500', 'blue.400')
  const color = useColorModeValue('white', 'gray.800')

  const [events, setEvents] = useState([]);

  const [name, setName] = React.useState('')
  const [location, setLocation] = React.useState('')
  const [afterDate, setAfterDate] = React.useState('')
  const [beforeDate, setBeforeDate] = React.useState('')
  const [genre, setGenre] = React.useState('')


  function handleDataFilter(name, beforeDate, afterDate, location, genre) {
    setName(name);
    setLocation(location);
    setAfterDate(afterDate);
    setBeforeDate(beforeDate);
    setGenre(genre);
  }


  useEffect(() => {
    fetch(`http://localhost:5000/events?location=${location}&afterDate=${afterDate}&beforeDate=${beforeDate}&name=${name}&genre=${genre}`)
      .then(response => response.json())
      .then(setEvents)
      .catch(error => console.error('Error fetching events:', error));
  }, [name, location, afterDate, beforeDate, genre]);

  return (
    <>
      {/* Add the sidebar with filter */}
      <Filter sendDataToParent={handleDataFilter} />
      

      {/* Add all the event cards */}
      <Container maxW="container.xl" centerContent>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={10} py={5}>
          {events.map(event => (
            <EventCard
              key={event.event_id}
              id={event.event_id}
              name={event.name}
              date={event.date}
              time={event.time}
              location={event.location}
              imageUrl={event.url}
            />
          ))}
        </SimpleGrid>
      </Container>
    </>
  );
}

export default EventsPage;