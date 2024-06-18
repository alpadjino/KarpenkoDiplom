import React from 'react'
import { Avatar, Box, Typography } from '@mui/material';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

export const Comment = () => {
  return (
    <Box id="news-component-comment">
      <Box
        id="news-component-comment-header"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Avatar />
        <Typography color="white">Имя</Typography>
        <Typography color="white">Фамилия</Typography>
      </Box>

      <Box id="news-component-comment-main">
        <Typography
          sx={{
            color: "white",
          }}
        >
          Сообщение
        </Typography>
        <Typography color={"blue"}>Ответить</Typography>
      </Box>

      <Box id="news-component-comment-footer">
        <FavoriteBorderIcon
          sx={{
            color: "white",
          }}
        />
      </Box>
    </Box>
  );
}
