import React from 'react';
import { useParams } from 'react-router-dom';
import { Text, GridItem, Grid } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import PaymentForm from '../components/PaymentForm'

function Checkout() {
  const { id } = useParams();
  const [events, setEvents] = useState([]);



  return (
    <PaymentForm/>

  );
}

export default Checkout;