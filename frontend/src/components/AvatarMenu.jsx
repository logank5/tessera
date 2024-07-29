import React, { useEffect, useState } from 'react';
import { Avatar, Center, useColorModeValue, useColorMode } from '@chakra-ui/react';
import {Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption} from '@chakra-ui/react';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function AvatarMenu({ firstname, lastname, email, avatar, username }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);

    async function handleClick() {
        fetch(`http://localhost:5000/logout`, {
             method: 'POST',
             headers: {
                 'Content-Type': 'application/json',
               },
         })
         .then( response => {
             if (response.status === 200)
                {
                    navigate(`/events`)}
           })
           
         .catch(error => console.error('Invalid Credentials:', error));
         
     }

     useEffect(() => {
      fetch(`http://localhost:5000/user/logged`, {
        credentials: 'include'
      })
        .then(response => {
          if (response.status === 200) {
              setLoggedIn(true)
            }
            else {
              setLoggedIn(false)
            }
        })
        
        .catch(error => console.error('Error fetching events:', error));
    }, []);

    return(
        <Menu>
          
          <MenuButton alignItems='center' p='5px'>
            <Center>

              <Avatar
                src={loggedIn == true ? avatar : ''}>
              </Avatar>

            </Center>

            
            


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
    );
}

export default AvatarMenu;