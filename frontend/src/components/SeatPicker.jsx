import React, { useState, useEffect } from 'react';
import TesseraSeatPicker from 'tessera-seat-picker';
import {Text} from '@chakra-ui/react';

function SeatPicker({ user_id, event_id }) {
  const [seats, setSeats] = useState([]);
  const [rowsMap, setRowsMap] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isReserved, setIsReserved] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0.0);
  const [seatPrice, setSeatPrice] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/inventory/tickets/${event_id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setSeats(data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchData();
  }, [event_id]);

  
  useEffect(() => {
    if (seats.length > 0) {
      const newRowsMap = Object.values(
        seats.reduce((acc, cur) => {
          const seatInfo = {
            id: cur.row_name + cur.seat_number,
            number: cur.seat_number,
            isReserved: cur.status !== 'AVAILABLE',
            tooltip: String('$' + cur.value),
          };
          if (!acc[cur.row_name]) {
            acc[cur.row_name] = [seatInfo];
          } else {
            acc[cur.row_name].push(seatInfo);
          }
          return acc;
        }, {})
      );

      setRowsMap(newRowsMap);
      setLoading(false); 
    }
  }, [seats]);


  async function getPrice( row, number ) {
    fetch(`http://localhost:5000/tickets/price/${event_id}/${row}/${number}`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
      },

    })
    .then(response => response.json())
    .then(setSeatPrice)  
    .catch(error => console.error('Error fetching seat price:', error));
  }

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    setLoading(true);

    try {
      reserveSeat(row, number)
      // Your custom logic to reserve the seat goes here...
      setTotalPrice(totalPrice + Number(seatPrice))

      // Assuming everything went well...
      setSelected((prevItems) => [...prevItems, id]);
      const updateTooltipValue = 'Added to cart';

      // Important to call this function if the seat was successfully selected - it helps update the screen
      addCb(row, number, id, updateTooltipValue);
    } catch (error) {
      // Handle any errors here
      console.error('Error adding seat:', error);
    } finally {
      setLoading(false);
    }
  };

  async function reserveSeat( row, number ) {
    fetch(`http://localhost:5000/inventory/reserve/${user_id}`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
          row_name: row,
          seat_number: number,
          event_id: event_id,
      }
      ),
    })
     
    .catch(error => console.error('Reserve Failed:', error));
    setIsReserved(true);
    getPrice(row, number);
  }

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    setLoading(true);

    try {
      // Your custom logic to remove the seat goes here...
      unreserveSeat(row, number)
      setTotalPrice(totalPrice - Number(seatPrice))

      setSelected((list) => list.filter((item) => item !== id));
      removeCb(row, number);
    } catch (error) {
      // Handle any errors here
      console.error('Error removing seat:', error);
    } finally {
      setLoading(false);
      
    }
  };

  async function unreserveSeat( row, number ) {
    fetch(`http://localhost:5000/inventory/unreserve`, {
      method: 'PUT',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      {
          row_name: row,
          seat_number: number,
          event_id: event_id,
      }
      ),
    })
    .catch(error => console.error('Reserve Failed:', error));
    setIsReserved(false);
    getPrice(row, number);
  }

  return (
    <div>
      {loading ? (
        <h2>Loading...</h2> 
      ) : (
        <TesseraSeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rowsMap}
          maxReservableSeats={3}
          alpha
          visible
          loading={loading}
        />
      )}
      <Text>{totalPrice}</Text>
    </div>
  );
}

export default SeatPicker;