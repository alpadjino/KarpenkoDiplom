import React from 'react'
import { Box, Button, Stack, Typography } from "@mui/material";
import ForumIcon from "@mui/icons-material/Forum";
import Diversity1Icon from "@mui/icons-material/Diversity1";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import { Link } from 'react-router-dom';
import { useHeaderContext } from '../HeaderProvider/HeaderProvider';
import { useSelector } from 'react-redux';

export const Sidebar = () => {
  const { isClicked, setIsClicked } = useHeaderContext();
  const user = useSelector((state) => state.user)

    const handleClick = (value) => {
      setIsClicked(value);
    };

  return (
    <Box
      sx={{
        position: "sticky",
        maxWidth: "70px",
        maxHeight: "100%",
        backgroundColor: "#0E1621",
        paddingX: "10px",
      }}
    >
      <Stack
        direction="column"
        height={"100%"}
        rowGap={"10px"}
        alignItems={"center"}
      >

        {user.userData._id &&
        
        <Link to="/main">
          <Button onClick={() => handleClick(false)}>
            <Box>
              <ForumIcon
                cursor={"pointer"}
                sx={{
                  color: !isClicked ? "#3F8EDD" : "gray",
                }}
              />
              <Typography
                color={!isClicked ? "#3F8EDD" : "gray"}
                textTransform={"capitalize"}
              >
                Чаты
              </Typography>
            </Box>
            <Box
              display={"flex"}
              position={"absolute"}
              left={"65%"}
              top={0}
              borderRadius={"30px"}
              bgcolor={"#3F8EDD"}
            >
              <Typography px={"3px"} fontSize={"10px"} color={"white"}>
                22
              </Typography>
            </Box>
          </Button>
        </Link>
}
        <Link to="/news">
          <Button onClick={() => handleClick(true)}>
            <Box textAlign={"center"}>
              <NewspaperIcon
                sx={{
                  color: isClicked ? "#3F8EDD" : "gray",
                }}
                cursor={"pointer"}
              />
              <Typography
                color={isClicked ? "#3F8EDD" : "gray"}
                textTransform={"capitalize"}
              >
                Новости
              </Typography>
            </Box>
          </Button>
        </Link>
      </Stack>
    </Box>
  );
}
