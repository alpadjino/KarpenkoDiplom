import { Box, Input, Typography, TextareaAutosize } from "@mui/material";
import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header'
import { Sidebar } from '../Sidebar/Sidebar';

export const CreateNewsPage = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
          document.title = "Создать группу";
    }, []);

    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 768);
      };
      handleResize();
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }, [isMobile]);
  return (
    <Box
      sx={{
        height: "91vh",
        width: "100%",
        backgroundColor: "#17212B",
      }}
    >
      <Header />
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#0E1621",
        }}
      >
        {isMobile ? "" : <Sidebar />}

        <Box
          id="create-news-container"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            border: 1,
            borderColor: "white",
            margin: "20px",
            padding: "20px",
          }}
        >
          <Box
            id="create-news-header"
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              border: 1,
              borderColor: "white",
            }}
          >
            <Typography color={"white"}>Создать новость</Typography>
            <Input
              disableUnderline={true}
              placeholder="Заголовок новости"
              sx={{
                backgroundColor: "white",
                borderRadius: "15px",
                paddingX: "15px",
              }}
            />
          </Box>

          <Box
            id="create-news-main"
            sx={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              width: "100%",
              border: 1,
              borderColor: "white",
            }}
          >
            <Typography color="white"> Введите текст статьи </Typography>
            <Box sx={{
                display: 'flex',
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
            }}>

            <TextareaAutosize />
            </Box>

          </Box>
        </Box>
      </Box>
    </Box>
  );
}
