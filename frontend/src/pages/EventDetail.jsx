import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
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
    <Box >
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
    </Box>
  );
}

export default EventDetail;