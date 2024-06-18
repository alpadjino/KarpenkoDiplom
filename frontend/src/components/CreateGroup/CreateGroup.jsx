import React, { useEffect, useState } from 'react'
import { Header } from '../Header/Header';
import { Avatar, Box, Button, Input, List, Typography } from '@mui/material';
import { Sidebar } from '../Sidebar/Sidebar';
import { UserComponent } from './UserComponent';
import { addRolesRoute, createChatRoute, getAllUsersRoute } from '../../utils/APIRoutes';
import axios from 'axios'
import { useCreateGroupContext } from "../CreateGroupProvider/CreateGroupProvider";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export const CreateGroup = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [chatName, setChatName] = useState("");
    const [allUsers, setAllUsers] = useState([]); 
    const [findText, setFindText] = useState("");

    const { selectedUsers, selectedAdmins } = useCreateGroupContext();
    const { setReset } = useCreateGroupContext();

    const navigate = useNavigate()

    const isAdmin = useSelector((state) => state.user.userData.isAdmin); 

    const handleChatCreate = async () => {
      const config = {
        headers: {
          token: localStorage.getItem('accessToken'),
        }
      }

      const data = {
        chatName: chatName,
        users: selectedUsers,
        admins: selectedAdmins,
      };
      
      await axios.post(createChatRoute, data, config)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err, "Ошибка создания чата");
      })

      await axios.post(addRolesRoute, {
        admins: selectedAdmins,
        role: chatName,
      })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err));
    }

    useEffect(() => {
      const handleShowUsers = async () => {
        await axios
          .get(getAllUsersRoute)
          .then((res) => {
            setAllUsers(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      handleShowUsers();
    }, []);

    useEffect(() => {
      if (!isAdmin) navigate("/news")
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
          className={"Group_Create"}
          sx={{
            marginX: "auto",
            backgroundColor: "#17212B",
            padding: "20px",
            marginY: "30px",
            borderRadius: "20px",
            minWidth: "280px",
          }}
        >
          <Box
            className={"Create_Header"}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Avatar />
            <Box
              className={"Groupe_Name"}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100px",
                gap: "10px",
                alignItems: "center",
              }}
            >
              <Typography color={"white"}>Название группы</Typography>
              <Input
                placeholder="Название группы"
                disableUnderline={true}
                value={chatName}
                onChange={(e) => setChatName(e.target.value)}
                sx={{
                  paddingX: "10px",
                  borderRadius: "20px",
                  color: "white",
                  backgroundColor: "gray",
                }}
              />
            </Box>

            <Box
              className={"Groupe_Main"}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "10px",
                maxWidth: "350px",
              }}
            >
              <Typography color={"white"}>Выберите участников</Typography>
              <Input
                placeholder="Найти"
                value={findText}
                disableUnderline={true}
                onChange={(e) => setFindText(e.target.value)}
                sx={{
                  backgroundColor: "white",
                  borderRadius: "20px",
                  paddingLeft: "10px",
                  width: "80%",
                }}
              />
              <Box
                className={"Groupe_Main_Users"}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <List
                  sx={{
                    overflowY: "scroll",
                    maxHeight: "200px",
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
                  {allUsers.length === 0
                    ? "Loading..."
                    : allUsers.map((user, index) => {
                        let regex = new RegExp(
                          `\\b(name|email|surname|avatar|_id|role)\\b`,
                          "g"
                        );
                        if (
                          JSON.stringify(user)
                            .replace(regex, "")
                            .indexOf(findText) !== -1
                        ) {
                          return (
                            <UserComponent key={index} user={allUsers[index]} />
                          );
                        }
                      })}
                </List>
                <Button
                  disabled={selectedUsers.length === 0}
                  onClick={() => setReset((prev) => !prev)}
                  sx={{
                    width: "100%",
                    padding: "10px",
                    marginX: "auto",
                    marginBottom: "10px",
                    color: "red",
                    backgroundColor: "white",
                    border: 1,
                    marginTop: "20px",
                    "&:hover": {
                      backgroundColor: "red",
                      color: "white",
                      borderColor: "red",
                    },
                  }}
                >
                  Сбросить
                </Button>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    type={"submit"}
                    disabled={chatName === ""}
                    onClick={handleChatCreate}
                    sx={{
                      marginX: "auto",
                    }}
                  >
                    Создать
                  </Button>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
