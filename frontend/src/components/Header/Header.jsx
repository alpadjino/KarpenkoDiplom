import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar, Box, Button, Stack, Typography } from '@mui/material'
import ForumIcon from "@mui/icons-material/Forum";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useHeaderContext } from '../HeaderProvider/HeaderProvider';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserData } from '../../slices/userSlice';

export const Header = () => {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const { isClicked, setIsClicked } = useHeaderContext();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector(state => state.user);
  
  const showSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };
  
  const handleClick = (value) => {
    setIsClicked(value)
  }

  const handleExit = () => {
    localStorage.removeItem("accessToken");
    navigate("/login")
  }

  const handleLogin = () => {
    navigate("/login")
  }
  
  useEffect(() => {
    dispatch(fetchUserData(localStorage.getItem("accessToken")));
  }, [isClicked, isSidebarVisible]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          padding: "10px",
          justifyContent: "space-between",
          backgroundColor: "#0E1621",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: "20px",
            paddingX: "5px",
            alignItems: "center",
          }}
        >
          <Button
            onClick={() => {
              showSidebar();
            }}
          >
            <MenuIcon
              sx={{
                cursor: "pointer",
                color: "#768C9E",
              }}
            />
          </Button>
          <Typography
            sx={{
              color: "white",
              fontWeight: "bold",
            }}
          >
            Название прриложения
          </Typography>
        </Box>
      </Box>
      {isSidebarVisible && (
        <Box
          className="Header_Sidebar"
          sx={{
            position: "absolute",
            height: "85%",
            width: "200px",
            zIndex: 99,
            padding: "20px",
            backgroundColor: "#0E1621",
          }}
        >
          {user.userData._id ? (
            <Box
              className={"User_Profile"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
                marginBottom: "20px",
                backgroundColor: "#17212B",
                padding: "10px",
              }}
            >
              <Avatar src={user.userData.avatar} />
              <Box>
                <Typography color={"white"}>
                  {user.userData.name} {user.userData.surname}
                </Typography>
                <Typography color={"white"}>{user.userData.email}</Typography>
              </Box>
              <Box
                id="edit-container"
                sx={{
                  display: "flex",
                  gap: "5px",
                  paddingTop: "10px",
                  cursor: "pointer",
                  borderTop: 1,
                  width: "100%",
                  justifyContent: "center",
                  borderColor: "white",
                }}
              >
                <EditIcon
                  sx={{
                    color: "white",
                  }}
                />
                <Link to="/edit">
                  <Typography color={"white"}>Редактировать</Typography>
                </Link>
              </Box>
            </Box>
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                gap: "10px",
                marginBottom: "20px",
                backgroundColor: "#17212B",
                padding: "10px",
              }}
            >
              <Link to="/login">
                <Typography color={"white"}>Войдите</Typography>
              </Link>
              <Typography color={"white"}>или</Typography>
              <Link to="/register">
                <Typography color={"white"}>зарегистрируйтесь</Typography>
              </Link>
            </Box>
          )}
          <Stack direction="column" rowGap={"10px"} alignItems={"center"}>
            <Box
              id={"Navigation_Block_Text"}
              sx={{
                backgroundColor: "#3F9EDD",
                borderRadius: "100px",
                mb: "10px",
                width: "100%",
              }}
            >
              <Typography
                id={"Navigation_Text"}
                sx={{
                  color: "white",
                  textAlign: "center",
                  padding: "10px",
                  cursor: "default",
                }}
              >
                Навигация
              </Typography>
            </Box>
            {user.userData._id && (
              <Link to="/main" onClick={() => handleClick(false)}>
                <Button>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
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
                    left={"30%"}
                    top={"-5px"}
                    borderRadius={"30px"}
                    bgcolor={"#3F8EDD"}
                  >
                    <Typography px={"3px"} fontSize={"10px"} color={"white"}>
                      22
                    </Typography>
                  </Box>
                </Button>
              </Link>
            )}

            <Link to="/news" onClick={() => handleClick(true)}>
              <Button>
                <Box textAlign={"center"} display="flex" gap={"10px"}>
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

            {user.userData.isAdmin && (
              <Box
                id="navigation-section-functions"
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                <Box
                  id={"Navigation_Block_Functions"}
                  sx={{
                    backgroundColor: "#3F9EDD",
                    borderRadius: "100px",
                    mb: "10px",
                    width: "100%",
                  }}
                >
                  <Typography
                    id={"Function_Text"}
                    sx={{
                      color: "white",
                      textAlign: "center",
                      padding: "10px",
                      cursor: "default",
                    }}
                  >
                    Функции
                  </Typography>
                </Box>

                <Link to="/create">
                  <Button>
                    <Box textAlign={"center"} display="flex" gap={"10px"}>
                      <AddCircleOutlineIcon
                        sx={{
                          color: "#3F8EDD",
                        }}
                        cursor={"pointer"}
                      />
                      <Typography
                        color={"#3F8EDD"}
                        textTransform={"capitalize"}
                      >
                        Создать группу
                      </Typography>
                    </Box>
                  </Button>
                </Link>
              </Box>
            )}
            <Box
              sx={{
                position: "absolute",
                bottom: "0",
                width: "100%",
              }}
            >
              {user.userData._id ? (
                <Button
                  onClick={handleExit}
                  variant="contained"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "black",
                    },
                  }}
                >
                  Выход
                </Button>
              ) : (
                <Button
                  onClick={handleLogin}
                  variant="contained"
                  sx={{
                    width: "100%",
                    "&:hover": {
                      color: "white",
                      backgroundColor: "black",
                    },
                  }}
                >
                  Войти
                </Button>
              )}
            </Box>
          </Stack>
        </Box>
      )}
    </>
  );
}
