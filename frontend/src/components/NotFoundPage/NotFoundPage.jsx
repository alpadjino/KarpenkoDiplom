import React from 'react'

import {
  Box,
  Typography,
} from "@mui/material";
import { Header } from '../Header/Header';

export const NotFoundPage = () => {
  return (
    <Box
      id="container"
      sx={{
        backgroundColor: "#17212B",
        width: "100%",
        height: "100vh",
      }}
    >
      <Header />
      <Box
        id="Content_Container"
        sx={{
          width: "100%",
          height: "90%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box id="NotFoundPageText_Container">
          <Typography
            id="NotFoundPageText"
            sx={{
              fontSize: "2rem",
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Страница не найдена
          </Typography>

          <Typography
            id="Text404"
            sx={{
              color: "gray",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            Страница устарела, была удалена или не существовала вовсе
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
