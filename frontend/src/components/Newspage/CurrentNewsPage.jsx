import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getOneNewsRoute, setLikeRoute } from "../../utils/APIRoutes";
import axios from "axios";
import {
  Avatar,
  Box,
  Button,
  ImageList,
  ImageListItem,
  Input,
  Typography,
} from "@mui/material";
import { Comment } from "../Comment/Comment";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import CommentIcon from "@mui/icons-material/Comment";
import { Header } from "../Header/Header";
import { Sidebar } from "../Sidebar/Sidebar";

export const CurrentNewsPage = () => {
    const { id } = useParams();
    const [news, setNews] = useState();
    const [match, setMatch] = useState("")
    const [colsCount, setColsCount] = useState(0);
    const [openComments, setOpenComments] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [pressedLike, setPressedLike] = useState(false);

    const user = useSelector((state) => state.user.userData);

      const handlePressLike = async () => {
        await axios
          .post(setLikeRoute, {
            userId: user._id,
            newsId: news._id,
          })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));

        setPressedLike(!pressedLike);
      };
  
  useEffect(() => {
    document.title = "Новости";
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

    useEffect(() => {
      const getCurrentNews = async () => {
        try {
          const response = await axios.get(`${getOneNewsRoute}/${id}`);
          const fetchedNews = response.data.data;
          setNews(fetchedNews);

          const regex = /(\d{2}):(\d{2})/;
          let timeString = "";

          if (fetchedNews.updatedAt) {
            timeString = fetchedNews.updatedAt.toString();
          } else if (fetchedNews.createdAt) {
            timeString = fetchedNews.createdAt.toString();
          }

          if (timeString) {
            const match = timeString.match(regex);
            if (match) {
              setMatch(match[0]);
            }
          }

          if (fetchedNews.images) {
            if (fetchedNews.images.length === 1) setColsCount(1);
            else if (fetchedNews.images.length === 2) setColsCount(2);
            else setColsCount(3);
          }
          
          setPressedLike(user.likes.includes(fetchedNews._id));
      
        } catch (error) {
          console.error("Error fetching news:", error);
        }
      };

      getCurrentNews();
    }, []);

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
          {news ? (
            <Box
              sx={{
                border: 1,
                borderColor: "white",
                borderRadius: "20px",
                padding: "10px",
                marginRight: "10px",
                marginY: "10px",
                backgroundColor: "#3E546A",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  minWidth: "230px",
                  maxWidth: "500px",
                  maxHeight: "450px",
                }}
              >
                <Box display={"flex"} gap={"10px"} alignItems={"center"}>
                  <Avatar src={news.avatar} />
                  <Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography color={"#3F9EDD"}>
                        {news.extendedOwner.name}
                      </Typography>
                      <Link to="/news">
                        <CloseIcon
                          sx={{
                            cursor: "pointer",
                            color: "white",
                          }}
                        />
                      </Link>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                      }}
                    >
                      <Link to={`/news/${news._id}`}>Запись</Link>
                      <Typography color={"white"}>
                        опубликована в {match}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Typography
                  sx={{
                    marginTop: "10px",
                    color: "white",
                    wordBreak: "break-word",
                    maxWidth: 500,
                  }}
                >
                  {news.text}
                </Typography>
              </Box>

              <ImageList
                sx={{
                  width: "auto",
                  height: "auto",
                  maxWidth: 500,
                  maxHeight: 450,
                }}
                rowHeight={130}
                cols={colsCount}
              >
                {news.images.length !== 0 &&
                  news.images.map((image) => (
                    <ImageListItem>
                      <img src={image} />
                    </ImageListItem>
                  ))}

                {/* <ImageListItem>
          <img src="https://images.hdqwalls.com/download/sunset-tree-red-ocean-sky-7w-2880x1800.jpg" />
        </ImageListItem> */}
              </ImageList>

              <Box
                id="news-component-footer"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Button size="small" onClick={handlePressLike}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    {!pressedLike ? (
                      <FavoriteBorderIcon
                        sx={{
                          color: "white",
                        }}
                      />
                    ) : (
                      <FavoriteIcon
                        sx={{
                          color: "red",
                        }}
                      />
                    )}
                    <Typography color={"white"}>{news.likes.length}</Typography>
                  </Box>
                </Button>

                <Button
                  onClick={() => {
                    setOpenComments(!openComments);
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                    }}
                  >
                    <CommentIcon
                      sx={{
                        color: "white",
                      }}
                    />
                    <Typography color="white">0</Typography>
                  </Box>
                </Button>

                <Button
                  onClick={async () => {
                    const fullUrl = `${window.location.origin}/news/${news._id}`;
                    await navigator.clipboard.writeText(fullUrl);
                    alert("Ссылка скопирована");
                  }}
                >
                  <ReplyIcon
                    sx={{
                      color: "white",
                    }}
                  />
                </Button>
              </Box>
              {openComments && (
                <Box
                  id="news-component-comments-section"
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    marginY: "10px",
                    paddingY: "10px",
                    borderTop: 1,
                    borderColor: "white",
                    gap: "10px",
                  }}
                >
                  <Comment />
                  <Box
                    sx={{
                      position: "sticky",
                    }}
                  >
                    <Input placeholder="Оставьте комментарий..." />
                  </Box>
                </Box>
              )}
            </Box>
          ) : (
            <Typography color="white">Loading...</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}
