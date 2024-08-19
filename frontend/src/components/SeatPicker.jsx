import React, { useState, useEffect } from 'react';
import TesseraSeatPicker from 'tessera-seat-picker';
import { Box, useColorModeValue } from '@chakra-ui/react';
import '../styles.css';

function SeatPicker({ user_id, event_id, getData, getId }) {
  const [seats, setSeats] = useState([]);
  const [rowsMap, setRowsMap] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0.0);
  let adding = true;
  const bg = useColorModeValue('blue.500', 'blue.400')
  const bgGrey = useColorModeValue('gray.500', 'lightgrey')
  const color = useColorModeValue('white', 'gray.800')
  const flip = useColorModeValue('gray.800', 'white')



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
        //iterative function, over all elements in seats state
        //acc is accumulator, cur is current element
        seats.reduce((acc, cur) => {
          //object containing all seat data for the map
          const seatInfo = {
            id: cur.row_name + cur.seat_number,
            number: cur.seat_number,
            isReserved: cur.status !== 'AVAILABLE',
            tooltip: String('$' + cur.value),
          };
          if (!acc[cur.row_name]) {
            //set the accumulated seats with current row name to new seat info
            acc[cur.row_name] = [seatInfo];
          } else {
            //set seat info to end of the accumulator
            acc[cur.row_name].push(seatInfo);
          }
          return acc;
        }, {})
      );

      setRowsMap(newRowsMap);
      setLoading(false);
    }
  }, [seats]);

  const addSeatCallback = async ({ row, number, id }, addCb) => {
    setLoading(true);
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
      .then(x => {
        console.log(row)
        console.log(number)
        console.log(id)

        getData(row, number, true)
        setSelected((prevItems) => [...prevItems, id])
        const updateTooltipValue = 'Added to cart'
        addCb(row, number, id, updateTooltipValue)
        setLoading(false)
      })


      .catch(error => console.error('Reserve Failed:', error));
  };

  async function reserveSeat(row, number) {
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
      .then(x => {
        adding = true
        getData(row, number, adding)
        setSelected((prevItems) => [...prevItems, id])
        const updateTooltipValue = 'Added to cart'
        addCb(row, number, id, updateTooltipValue)
      })


      .catch(error => console.error('Reserve Failed:', error));
  }

  const removeSeatCallback = async ({ row, number, id }, removeCb) => {
    setLoading(true);
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
      .then(x => {
        getData(row, number, false)
        setSelected((list) => list.filter((item) => item !== id));
        removeCb(row, number);
        setLoading(false);
      })
      // .then(getId(row, number, adding))

      .catch(error => console.error('Reserve Failed:', error));
  };

  async function unreserveSeat(row, number) {
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
      .then(x => {
        adding = false
        getData(row, number, adding)
        setSelected((list) => list.filter((item) => item !== id));
        removeCb(row, number);
        setLoading(false);
      })
      // .then(getId(row, number, adding))

      .catch(error => console.error('Reserve Failed:', error));

  }

  return (
    <Box minW={{ base: "100%", md: "500px" }} minH={{ base: "100%", md: "500px" }}>
      
        <TesseraSeatPicker
          addSeatCallback={addSeatCallback}
          removeSeatCallback={removeSeatCallback}
          rows={rowsMap}
          maxReservableSeats={4}
          alpha
          visible
          loading={loading}
          seatStyle={{ backgroundColor: 'yellow', color: flip }}
          stageStyle={{ backgroundColor: 'gray' }}
          stageClassName="custom-stage"
        />
      
    </Box>
  );
}

export default SeatPicker;