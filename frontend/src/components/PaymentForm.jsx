import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Text, useColorModeValue, Input } from '@chakra-ui/react';

// Get your key from your dashboard
const stripePromise = loadStripe('pk_test_51Plv6eLfDopPrsc2M3jHifDQh48DpxIyR3MYcsu8mucMEAXqS8gKsNE7hS9lAyVVUwBDdIkQmUSg2bXq29wt6oEE00cef0ugpL');

const CheckoutForm = ({ totalAmount, user_id, id }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState(null);
  const bg = useColorModeValue('blue.500', 'blue.400')
  const bgGrey = useColorModeValue('gray.500', 'lightgrey')
  const color = useColorModeValue('white', 'gray.800')
  const [email, setEmail] = useState('')


  async function checkout() {
    fetch(`http://localhost:5000/inventory/buy/${user_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        {
          event_id: id,
          to_email: email
        }
      ),
      credentials: 'include'
    })
      .catch(error => console.error('Invalid Credentials:', error));

  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const response = await fetch('http://localhost:5000/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ amount: totalAmount * 100 }), // Amount should be in the lowest denomination (For USD thats cents)
    });

    const { clientSecret } = await response.json();

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
        billing_details: {
          name: 'Test User',
        },
      },
    });

    if (result.error) {
      setError(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        setPaymentSuccess(true);
        checkout();
      }
    }
  };

  return (
    <Box as="form" onSubmit={handleSubmit} p={4}>
      <FormControl mb={4}>
        <FormLabel>Total Amount</FormLabel>
        <Text fontSize="xl">${totalAmount}</Text>
      </FormControl>
      <FormControl>
        <FormLabel>Card Details</FormLabel>
        <Input value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Send Email" color={bg}></Input>
        <CardElement mb='15px' />
      </FormControl>
      <Button mt={4} colorScheme="blue" bg={bg} type="submit" disabled={!stripe}>
        Pay
      </Button>
      {paymentSuccess && <Text mt={4} color="green.500">Payment Successful!</Text>}
      {error && <Text mt={4} color="red.500">{error}</Text>}
    </Box>
  );
};

const PaymentForm = ({ totalAmount, user_id, id }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm totalAmount={totalAmount} user_id={user_id} id={id} />
  </Elements>
);

export default PaymentForm;