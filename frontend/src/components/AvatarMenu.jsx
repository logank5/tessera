import React, { useEffect, useState } from 'react';
import { Avatar, Center, useColorModeValue, useColorMode } from '@chakra-ui/react';
import {Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption} from '@chakra-ui/react';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

function AvatarMenu({ firstname, lastname, email, avatar, username }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    async function handleClick() {
        fetch(`http://localhost:5000/logout`, {
             method: 'POST',
             credentials: 'include',
             headers: {
                 'Content-Type': 'application/json',
               },
         })
         .then( response => {
             if (response.status === 200)
                {
                    navigate(`/login`)
                    location.reload()
                  }
           })
           
         .catch(error => console.error('Invalid Credentials:', error));
         
     }


    return(
        <Menu>
          
          <MenuButton alignItems='center' >
            {/* <FaUserCircle size='40px'/> */}

              <Avatar
                src={avatar}>
              </Avatar>


          </MenuButton>
          <MenuList colorScheme='blue' color={bg}>
            <MenuGroup title='My Profile'>
              <MenuItem as={Link} to={`/account`}>My Account</MenuItem>
              <MenuItem as={Link} to={`/tickets`}>My Tickets</MenuItem>
            </MenuGroup>
            <MenuDivider />
              <MenuItem onClick={handleClick} color='red.500'>Logout</MenuItem>
          </MenuList>
        </Menu>
    );
}

export default AvatarMenu;