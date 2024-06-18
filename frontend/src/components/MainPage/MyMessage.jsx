import { Avatar, Box, Typography } from '@mui/material';
import React from 'react'

export const MyMessage = (props) => {
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
      match = "только что"
    }
  return (
    <Box
      className={"my_message"}
      sx={{
        display: "flex",
        alignItems: "end",
        justifyContent: "end",
        gap: "10px",
        padding: "5px",
        maxWidth: "70%",
        marginLeft: "auto",
      }}
    >
      <Box
        sx={{
          paddingX: "10px",
          paddingY: "5px",
          borderRadius: "20px",
          color: "white",
          wordBreak: "break-word",
          backgroundColor: "#2B5278",
        }}
      >
        <Typography color={"gray"} textAlign={'right'}>Вы</Typography>
        <Typography>{props.message.text}</Typography>
        <Typography fontSize={"10px"} textAlign={"right"}>
          {match}
        </Typography>
      </Box>
      <Avatar />
    </Box>
  );
}
