import React from 'react';
import { useParams } from 'react-router-dom';
import { VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import DetailGrid from '../components/DetailGrid';

function EventDetail() {
  const { id } = useParams(); 
  const [events, setEvents] = useState([]);
  
  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`, {
      credentials: 'include'
    })

      .then(response => response.json())
      .then(setEvents)
      .catch(error => console.error('Error fetching events:', error));
  }, []);
  
  return (
    <VStack align='stretch'>
        {events.map(event => (
          <DetailGrid
            key={event.event_id}
            id={event.event_id}
            name={event.name}
            date={event.date}
            time={event.time}
            description={event.description}
            location={event.location}
            imageUrl={event.url} 
          />
        ))}
    </VStack>
  );
}

export default EventDetail;