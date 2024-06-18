import React, { useEffect, useState } from 'react'
import { Box, Input } from '@mui/material'
import SearchIcon from "@mui/icons-material/Search";
import { ChatElement } from './ChatElement';
import { getAllChats, getUserChatsRoutes } from "../../utils/APIRoutes"
import axios from "axios"
import { useSelector } from 'react-redux';

export const MessangerBar = ({ size, visible }) => {
  const [chats, setChats] = useState([])

  const user = useSelector(state => state.user.userData)

  useEffect(() => {
    const fetchChats = async () => {
      await axios
        .get(getUserChatsRoutes, {
          headers: {
            userid: user._id
          },
        })
        .then((res) => {
          console.log(res.data.data)
          setChats(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    const fetchAllChats = async () => {
      await axios
        .get(getAllChats)
        .then((res) => {
          setChats(res.data);
        })
        .catch((err) => {
          console.log(err);
         });
        };
      if (user.isAdmin) fetchAllChats();
      else fetchChats();
  }, [])
  
  return (
    <Box
      sx={{
        minWidth: "230px",
        width: size,
        paddingY: "20px",
        paddingX: "10px",
        backgroundColor: "#17212B",
        display: visible,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "right",
          marginBottom: "20px",
        }}
      >
        <Input
          placeholder="Поиск"
          disableUnderline={true}
          sx={{
            width: "100%",
            backgroundColor: "#242F3D",
            color: "white",
            paddingX: "10px",
            borderRadius: "20px",
          }}
        />
        <SearchIcon
          sx={{
            position: "absolute",
            color: "#1F2A36",
            marginRight: "10px",
          }}
        />
      </Box>
      <Box
        sx={{
          overflowY: "scroll",
          height: "94%",
          "&::-webkit-scrollbar": {
            width: "3px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "green",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
        }}
      >
        {chats.length !== 0 
        ? chats.map((chat) => <ChatElement key={chat._id} chat={chat} />)
        : <span style={{color: "white"}}>Loading...</span>
        }
      </Box>
    </Box>
  );
}
