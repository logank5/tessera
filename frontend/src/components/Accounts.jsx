import React from 'react';
import { Box, GridItem, Grid, useColorModeValue, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { TabList, Tabs, Tab, TabPanels, TabPanel } from '@chakra-ui/react'
import ProfileInfo from './ProfileInfo';
import UpdateProfile from './UpdateProfile';
import ChangePassword from './ChangePassword';
import UserTickets from './UserTickets';

function Accounts() {
    const [user, setUser] = useState([]);
    const bg = useColorModeValue('blue.500', 'blue.400')
    const color = useColorModeValue('white', 'gray.800')
    const flip = useColorModeValue('gray.800', 'white')

    useEffect(() => {
        fetch(`http://localhost:5000/user/logged`, {
            credentials: 'include'
        })
            .then(response => response.json())
            .then((user) => setUser(user[0]))
            .catch(error => console.error('Error fetching user:', error));
    }, []);

    return (
        <>
            <Box bgImage="url('https://images5.alphacoders.com/115/1153878.jpg')"
                backgroundPosition="center"
                backgroundRepeat='no-repeat'
                backgroundSize='cover'
                height='100vh'
                p='20px'>
                <Tabs variant='enclosed' mt='80px' ml='20px' mr='20px'>
                    <TabList>
                        <Tab _selected={{ bg: color, color: flip }} color='white' fontWeight='bold'>
                            Profile Details
                        </Tab>
                        <Tab _selected={{ bg: color, color: flip }} color='white' fontWeight='bold'>
                            Update User Information
                        </Tab>
                        <Tab _selected={{ bg: color, color: flip }} color='white' fontWeight='bold'>
                            Change Password
                        </Tab>
                        <Tab _selected={{ bg: color, color: flip }} color='white' fontWeight='bold'>
                            User Tickets
                        </Tab>
                    </TabList>

                    <TabPanels>
                        <TabPanel>
                            {
                                user ?
                                    <ProfileInfo
                                        key={user.user_id}
                                        firstname={user.firstname}
                                        lastname={user.lastname}
                                        username={user.username}
                                        email={user.email}
                                        avatar={user.avatar}
                                        phone={user.phone}
                                    />
                                    : null}
                        </TabPanel>


                        <TabPanel>
                            {
                                user ?
                                    <UpdateProfile
                                        key={user.user_id}
                                        id={user.user_id}
                                        username={user.username}
                                    />
                                    : null}
                        </TabPanel>

                        <TabPanel>
                            {
                                user ?
                                    <ChangePassword
                                        key={user.user_id}
                                        id={user.user_id}
                                        username={user.username}
                                    />
                                    : null}
                        </TabPanel>

                        <TabPanel>
                            {
                                user ?
                                    <UserTickets
                                        key={user.user_id}
                                        id={user.user_id}
                                        username={user.username}
                                    />
                                    : null}
                        </TabPanel>

                    </TabPanels>
                </Tabs>
            </Box>
        </>

    );
}

export default Accounts;