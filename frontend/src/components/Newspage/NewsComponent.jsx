import React, { useState } from 'react'
import { Avatar, Box, Button, ImageList, ImageListItem, Input, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import { Comment } from '../Comment/Comment';
import { useSelector } from 'react-redux';
import { deleteOneNewsRoute, setLikeRoute } from '../../utils/APIRoutes';
import axios from 'axios';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";

export const NewsComponent = ( {news} ) => {

  const [openComments, setOpenComments] = useState(false);

  const user = useSelector((state) => state.user.userData)

  const [pressedLike, setPressedLike] = useState(user.likes?.includes(news._id));
  
  
  const colsCount = () => {
    if (news.images.length === 1) return 1
    else if (news.images.length === 2) return 2
    else return 3
  }

  const regex = /(\d{2}):(\d{2})/;
  const time = news.updatedAt;
  let match = "";
  if (time) {
    match = time.match(regex);
    match = match[0];
  } else {
    match = news.createdAt.match(regex);
    match = match[0];
  }

  const deleteNews = async () => {
    await axios
      .delete(deleteOneNewsRoute, {
        data: {newsId: news._id,}
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }

  const handlePressLike = async () => {
    await axios
      .post(setLikeRoute, {
        userId: user._id,
        newsId: news._id,
      })
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    setPressedLike(!pressedLike);
  }

  return (
    <Box
      sx={{
        border: 1,
        borderColor: "white",
        borderRadius: "20px",
        padding: "10px",
        marginRight: "10px",
        marginY: "10px",
        maxWidth: "500px",
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
              {news.extendedOwner.admins.includes(user._id) && (
                <CloseIcon
                  onClick={deleteNews}
                  sx={{
                    cursor: "pointer",
                    color: "white",
                  }}
                />
              )}
            </Box>
            <Box
              sx={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
              }}
            >
              <Link to={`/news/${news._id}`}>Запись</Link>
              <Typography color={"white"}>опубликована в {match}</Typography>
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
        cols={colsCount()}
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
            <Typography color={"white"}>
            { 
              news.likes.length
            }</Typography>
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
  );
}
