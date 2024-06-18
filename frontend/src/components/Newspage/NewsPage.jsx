import React, { useEffect, useState } from 'react'
import { Avatar, Box, Button, FormControl, Input, MenuItem, Select, TextareaAutosize, Typography } from '@mui/material'
import { Sidebar } from '../Sidebar/Sidebar';
import { Header } from '../Header/Header';
import { NewsComponent } from './NewsComponent';
import AddToPhotosIcon from "@mui/icons-material/AddToPhotos";
import { useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { showNewsRoute, createNewsRoute } from '../../utils/APIRoutes';
import axios from 'axios';


export const NewsPage = () => {
  const user = useSelector((state) => state.user.userData);
  console.log(user)

  const [isMobile, setIsMobile] = useState(false);
  const [openCreateNews, setOpenCreateNews] = useState(false);
  const [role, setRole] = useState(0);
  const [allNews, setAllNews] = useState([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const createNews = async () => {
      await axios.post(createNewsRoute, {
        text: data.createNewsTextarea,
        owner: user.roles[data.createNewsSelectRole],
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err)) 
    }
    createNews();
  }

  const handleSelectChange = (event) => {
    setRole(event.target.value);
    setValue("createNewsSelectRole", event.target.value);
  };
  
  useEffect(() => {
    document.title = "Новости";
  }, []);

  useEffect(() => {
    const showNews = async () => {
      await axios
        .get(showNewsRoute)
        .then((res) => setAllNews(res.data.data))
        .catch((err) => console.log(err));
    }
    showNews();

    return () => {
      setAllNews([]);
    }

  }, [])

  useEffect(() => {
    setValue("createNewsSelectRole", role);

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
          display: "flex",
          width: "100%",
          height: "100%",
          backgroundColor: "#17212B",
          justifyContent: "center",
        }}
      >
        {isMobile ? "" : <Sidebar />}
        <Box
          sx={{
            overflowY: "scroll",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
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
          {user.roles.length !== 0 && (
            <Box
              id="create-news"
              sx={{
                width: "100%",
                position: "sticky",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Button
                onClick={() => setOpenCreateNews(!openCreateNews)}
                sx={{
                  width: "100%",
                }}
              >
                {openCreateNews ? "Закрыть" : "Создать новость"}
              </Button>
            </Box>
          )}
          {openCreateNews && (
            <Box
              sx={{
                width: "90%",
                maxWidth: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingY: "15px",
                gap: "10px",
              }}
            >
              <form
                onSubmit={handleSubmit(onSubmit)}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
                  width: "95%",
                  backgroundColor: "#3E546A",
                  borderRadius: "30px",
                  padding: "20px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  <Box
                    sx={{
                      backgroundColor: "white",
                      padding: "7px",
                      borderRadius: "20px",
                      outline: 3,
                    }}
                  >
                    <Avatar
                      sx={{
                        color: "black",
                        backgroundColor: "white",
                      }}
                    />
                  </Box>
                  <Select
                    labelId="create-news-select-role-label"
                    id="create-news-select-role"
                    name="createNewsSelectRole"
                    placeholder="Роль"
                    value={role}
                    onChange={handleSelectChange}
                    sx={{
                      backgroundColor: "white",
                      minWidth: "120px",
                      borderRadius: "20px",
                      outline: 3,
                    }}
                  >
                    {user.roles.map((role, index) => (
                      <MenuItem key={role} value={index}>
                        {role}
                      </MenuItem>
                    ))}
                  </Select>
                </Box>
                <TextareaAutosize
                  id="create-news-textarea"
                  name="createNewsTextarea"
                  style={{
                    width: "100%",
                    maxWidth: "450px",
                    fontFamily: "Inherit",
                    borderRadius: "20px",
                    padding: "10px",
                  }}
                  minRows={2}
                  placeholder="Расскажите о чем-то новом"
                  {...register("createNewsTextarea", {
                    required: "Это обязательное поле",
                  })}
                />
                {errors.createNewsTextarea && (
                  <Typography color={"red"}>Это обязательное поле</Typography>
                )}
                <Box
                  id="create-news-footer"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                  }}
                >
                  <Button
                    type="file"
                    onClick={(event) => event.stopPropagation()}
                  >
                    <AddToPhotosIcon
                      sx={{
                        color: "white",
                      }}
                    />
                  </Button>
                  <Button
                    sx={{
                      color: "white",
                    }}
                    type="submit"
                  >
                    Опубликовать
                  </Button>
                </Box>
              </form>
            </Box>
          )}

          {allNews.length === 0 ? (
            <span style={{ color: "white" }}>Загрузка...</span>
          ) : (
            allNews.map((news, index) => (
              <NewsComponent key={index} news={news} />
            ))
          )}
          {/* <NewsComponent />
          <NewsComponent />
          <NewsComponent />
          <NewsComponent />
          <NewsComponent /> */}
        </Box>
      </Box>
    </Box>
  );
}
