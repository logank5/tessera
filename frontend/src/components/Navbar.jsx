import React from 'react';
import {Stack, Box, Flex, Text, Button, Spacer, DarkMode, Avatar, useColorModeValue, useColorMode} from '@chakra-ui/react';
import {Image, BreadcrumbItem, BreadcrumbLink} from '@chakra-ui/react';
import {Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption} from '@chakra-ui/react';
import ColorModeSwitch from "./ColorModeSwitch";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import tesseralogo from '../assets/tesseralogo.png';
import tesseralogo2 from '../assets/tesseralogo2.png';

function Navbar() {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const { colorMode, toggleColorMode } = useColorMode();
    const [users, setUsers] = useState([]);
    
    
    const handleChange = (event) => {
        filter = value;
      };

  
    useEffect(() => {
      fetch(`http://localhost:5000/user/logged`, {
        credentials: 'include'
      })
  
        .then(response => response.json())
        .then(setUsers)
        .catch(error => console.error('Error fetching events:', error));
    }, []);

  return (
    <Stack>
      <Flex bg={bg} color={color} p="4" alignItems="center" as="header" position="fixed" w="100%" zIndex="sticky">
        <Box>
          <Image boxSize='50px' 
            src={colorMode === 'dark' ? tesseralogo2 : tesseralogo}/>
        </Box>
        <Box p="2">
          <Text fontSize="xl" fontWeight="bold" as={Link} to={`/events/`}>
              Tessera Events
          </Text>
        </Box>
        
        <Spacer />
        <Box mr={25}>
          <ColorModeSwitch/>
        </Box>
        <Box>
        <Menu>
          <MenuButton>
              <Avatar 
              // src={users[0].avatar}
              />
          </MenuButton>
          <MenuList colorScheme='blue' color={bg}>
            <MenuGroup title='My Profile'>
              <MenuItem as={Link} to={`/account`}>My Account</MenuItem>
              <MenuItem as={Link} to={`/tickets`}>My Tickets</MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuItem as={Link} to={`/login`}>Login</MenuItem>
            <MenuItem color='red.500'>
              <Link color='red.500'>Logout</Link>
            </MenuItem>
          </MenuList>
        </Menu>
        </Box>
      </Flex>
    </Stack>
  );
}

export default Navbar;