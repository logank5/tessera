import React from 'react';
import { Stack, Box, Flex, Text, Avatar, Spacer, Center, useColorModeValue, useColorMode } from '@chakra-ui/react';
import { Image, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption } from '@chakra-ui/react';
import ColorModeSwitch from "./ColorModeSwitch";
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tesseralogo from '../assets/tesseralogo.png';
import tesseralogo2 from '../assets/tesseralogo2.png';
import { FaUserCircle } from "react-icons/fa";
import AvatarLoggedIn from './AvatarLoggedIn';
import AvatarLoggedOut from './AvatarLoggedOut';
import "../styles.css"

function Navbar() {
  const bg = useColorModeValue('blue.500', 'blue.400')
  const color = useColorModeValue('white', 'gray.800')
  const { colorMode, toggleColorMode } = useColorMode();
  const [user, setUser] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  // useEffect(() => {
  //   fetch(`http://localhost:5000/user/logged`, {
  //     credentials: 'include'
  //   })
  //     .then(response => response.json())
  //     .then(data => setUsers(data))

  //     .catch(error => console.error('Error fetching events:', error));
  // }, []);

  useEffect(() => {
    fetch(`http://localhost:5000/user/logged`, {
      credentials: 'include'
    })
      .then(response => {
        if (response.status === 200) {
          setLoggedIn(true)
          getData()
        }
        else {
          setLoggedIn(false)
        }
      })

      .catch(error => console.error('Error fetching events:', error));
  }, []);

  async function getData() {
    fetch(`http://localhost:5000/user/logged`, {
      credentials: 'include'
    })
      .then(response => response.json())
      .then((user) => setUser(user[0]))

      .catch(error => console.error('Error fetching events:', error));
  }

  return (
    <Stack>
      <Flex bg={bg} color={color} p="4" alignItems="center" as="header" position="fixed" w="100%" zIndex="sticky">
        <Box>
          <Image boxSize='50px'
            src={colorMode === 'dark' ? tesseralogo2 : tesseralogo} />
        </Box>
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold" as={Link} to={`/events/`}>
            Tessera Events
          </Text>
        </Box>

        <Spacer />
        <Box mr={25}>
          <ColorModeSwitch />
        </Box>
        <Box className="main">
          {loggedIn == true ?
            <AvatarLoggedIn
              key={user.user_id}
              user_id={user.user_id}
              firstname={user.firstname}
              lastname={user.lastname}
              username={user.username}
              email={user.email}
              avatar={user.avatar}
              phone={user.phone}
            />
            : <AvatarLoggedOut />}

        </Box>
      </Flex>
    </Stack>
  );
}

export default Navbar;