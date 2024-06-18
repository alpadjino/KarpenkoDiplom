import React, { useEffect } from 'react'
import { useChatContext } from '../ChatProvider/ChatProvider';
import { Avatar, Box, Stack, Typography } from '@mui/material'

export const ChatElement = ({ chat }) => {
  const regex = /(\d{2}):(\d{2})/;
  const time = chat.updatedAt;
  let match = "";
  if (time) {
    match = time.match(regex);
  }
  else {
    match = chat.createdAt.match(regex);
  }

  const { selectedChat, setSelectedChat } = useChatContext();
  const { openChat, setOpenChat } = useChatContext();

  const handleSelectChat = () => {
    if (!openChat) setSelectedChat(chat);
    else if (selectedChat._id === chat._id) {
      setSelectedChat(null);
      setOpenChat(false);
    }
    else {
      setSelectedChat(chat)
    }
  }

  useEffect(() => {

  }, [chat])
  
  return (
    <Box
      onClick={handleSelectChat}
      w={"100%"}
      sx={{
        cursor: "pointer",
        padding: "5px",
        borderColor: "gray",
        ":hover": {
          backgroundColor: "gray",
        },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Box
          sx={{
            display: "flex",
            gap: "10px",
            alignItems: "center",
            userSelect: "none",
          }}
        >
          <Avatar src={chat.chatIcon} />
          <Box>
            <Typography color={"#DAE0E6"}>{chat.name}</Typography>
            {!chat.lastMessage ? (
              <Typography color={"#3E5A79"}>Нет сообщений</Typography>
            ) : (
              <Typography color={"#3E5A79"}>{chat.lastMessage.text}</Typography>
            )}
          </Box>
        </Box>
        <Box>
          <Typography mb={"5px"} color={"#455A6F"} fontSize={"12px"}>
            {match[0]}
          </Typography>
          {!!chat.lastMessage && (
            <Box
              border={1}
              borderRadius={"20px"}
              borderColor={"#3E546A"}
              backgroundColor={"#3E546A"}
              sx={{
                textAlign: "center",
              }}
            >
              <Typography
                color={"white"}
                textAlign={"center"}
                fontSize={"12px"}
                sx={{
                  marginX: "10px",
                  marginY: "5px",
                }}
              >
                {0}
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Box>
  );
}
