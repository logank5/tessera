import React from 'react';
import { useParams } from 'react-router-dom';
import { Text, GridItem, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

function TicketsPage() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);

  return (
    <Text>
      This is the tickets page
    </Text>

  );
}

export default TicketsPage;