import React, { useEffect, useState } from 'react';
import { Table, TableContainer, Tr, Td, Tbody, Thead, Th } from '@chakra-ui/react';

function TicketsTable({ event_id, row, number }) {
    const [event, setEvent] = useState([]);
    

    useEffect(() => {
        fetch(`http://localhost:5000/events/${event_id}`, {
            credentials: 'include'
        })

            .then(response => response.json())
            .then((event) =>
                setEvent(event[0])
            )
            .catch(error => console.error('Error fetching events:', error));
    }, []);


    return (

        <Tr>
            <Td>{event.name}</Td>
            <Td>{event.date}</Td>
            <Td>{row}</Td>
            <Td>{number}</Td>
        </Tr>

    );
}

export default TicketsTable;