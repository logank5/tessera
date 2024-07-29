import React, { useEffect, useState } from 'react';
import { Avatar, Center, useColorModeValue, useColorMode } from '@chakra-ui/react';
import {Menu, MenuButton, MenuList, MenuGroup, MenuItem, MenuDivider, MenuOptionGroup, MenuItemOption} from '@chakra-ui/react';
import {Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

function AvatarLoggedIn({ loggedIn, firstname, lastname, email, avatar, username }) {
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const { colorMode, toggleColorMode } = useColorMode();
    const [user, setUser] = useState([]);
    const navigate = useNavigate();

    return(
        <Menu>
          
          <MenuButton alignItems='center' p='5px'>
            <Center>
            {/* <FaUserCircle size='40px'/> */}

              <Avatar
                src={loggedIn == true ? avatar : ''}>
              </Avatar>

            </Center>

          </MenuButton>
          <MenuList colorScheme='blue' color={bg}>
            <MenuItem as={Link} to={`/login`}>Login</MenuItem>
          </MenuList>
        </Menu>
    );
}

export default AvatarLoggedIn;