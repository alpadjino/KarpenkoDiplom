import { Avatar, Box, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { findUserRoute } from '../../utils/APIRoutes';

export const FriendMessage = (props) => {
  const [userData, setUserData] = useState({})

  useEffect(() => {
    const findUser = async () => {
      await axios
        .get(findUserRoute, {
          headers: { userId: props.message.sender._id },
        })
        .then((res) => setUserData(res.data))
        .catch((err) => console.log(err));
    };

    findUser();
  }, [])
  
  const regex = /(\d{2}):(\d{2})/;
  const time = props.message.updatedAt;
  let match = "";

  if (time) {
    match = time.match(regex);
    match = match[0];
  } else if (props.message.createdAt) {
    match = props.message.createdAt.match(regex);
    match = match[0];
  } else {
    match = "только что";
  }

  return (
    <Box
      className={"friend_message"}
      sx={{
        display: "flex",
        alignItems: "end",
        gap: "10px",
        padding: "5px",
        maxWidth: "70%",
        marginRight: "auto",
      }}
    >
      <Avatar />
      <Box
        sx={{
          padding: "10px",
          borderRadius: "20px",
          color: "white",
          wordBreak: "break-word",
          backgroundColor: "#182533",
        }}
      >
        <Typography color={"gray"}> {userData.name} </Typography>
        <Typography>{props.message.text}</Typography>
        <Typography fontSize={"10px"} textAlign={"right"}>
          {match}
        </Typography>
      </Box>
    </Box>
  );
}
