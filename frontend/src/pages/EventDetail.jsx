import React from 'react';
import { useParams } from 'react-router-dom';
import { Box } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import DetailGrid from '../components/DetailGrid';
import { useNavigate } from 'react-router-dom';

function EventDetail() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/user/logged`, {
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          navigate(`/events/${id}`)
        }
        else {
          navigate(`/login`)
        }
      })

      .catch(error => console.error('Error fetching events:', error));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/events/${id}`, {
      credentials: 'include'
    })

      .then(response => response.json())
      .then((event) => setEvent(event[0]))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <Box align='stretch'>
      {
        event ?
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
          : null}
    </Box>
  );
}

export default EventDetail;