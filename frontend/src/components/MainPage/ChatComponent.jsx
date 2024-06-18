import React, { useEffect, useRef, useState } from 'react'
import { Avatar, Box, Button, Input, Typography } from '@mui/material'
import { FriendMessage } from './FriendMessage';
import { MyMessage } from './MyMessage';
import SendIcon from "@mui/icons-material/Send";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useChatContext } from "../ChatProvider/ChatProvider";
import { useSelector  } from 'react-redux'
import { getChatMessage, sendMyMessage } from '../../utils/APIRoutes';
import axios from 'axios';

export const ChatComponent = ({ visible, maxH, chat, socket }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [pastMessages, setPastMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1)
  const [firstOpen, setFirstOpen] = useState(true);

  const { setSelectedChat } = useChatContext();

  console.log(chat)

  const userData = useSelector((state) => state.user.userData);

  const chatMainRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      await axios
        .get(getChatMessage, {
          headers: {
            chatid: chat._id,
            currentPage: currentPage,
          },
        })
        .then((res) => {
          console.log(res.data.message);
          if (res.data.message !== "Все сообщения выгружены") {
            setPastMessages(res.data.data);
            setLoading(false);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchMessages();
  }, [loading]);

  useEffect(() => {
    socket.emit("userId", userData._id);

    socket.on(chat._id, (msg, userId) => {
      setMessages((prevMessages) => [...prevMessages, { text: msg, sender: { _id: userId } }]);
      setTimeout(() => {
        if (chatMainRef.current)
          chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
        }, 50)
    });
  }, []);

  const sendMessage = async (e) => {
      e.preventDefault();

      if (message.trim() !== "") {
      await axios
        .post(sendMyMessage, {
          text: message,
          sender: userData._id,
          chatId: chat._id,
        })
        .then((res) => {
          socket.emit("message", {
            msg: message,
            chatId: chat._id,
            userId: userData._id,
          });
          setMessage("");
        })
        .catch((err) => console.log(err));
    } else {
      setMessage("");
    }
  };

  const handleBackBottom = () => {
    setSelectedChat(null);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage(event);
    }
  };

  const handleEscapeFromChat = (event) => {
    console.log(event.key);
    if (event.key === "Escape") {
      handleBackBottom();
    }
  };

  useEffect(() => {
    if (pastMessages.length !== 0 && firstOpen) {
      chatMainRef.current.scrollTop = chatMainRef.current.scrollHeight;
      setFirstOpen(false);
    }

    const handleScroll = () => {
      if (chatMainRef.current.scrollTop === 0) {
        setLoading(true);
        setCurrentPage((prev) => prev + 1);
      }
    };

    chatMainRef.current.addEventListener("scroll", handleScroll);

    return () => {
      if (chatMainRef.current) {
        chatMainRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, [loading, messages]);

  return (
    <Box
      id="chat-container"
      sx={{
        position: "relative",
        display: visible,
        flexDirection: "column",
        alignItems: "center",
        justifyItems: "center",
        width: "100%",
        maxWidth: maxH,
        marginBottom: "20px",
        paddingX: "10px",
        paddingBottom: "10px",
        gap: "10px",
      }}
    >
      <Box
        className={"chat-header"}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "15px",
          backgroundColor: "#17212B",
          padding: "5px",
          width: "100%",
        }}
      >
        <Box
          id="chat-header-left"
          sx={{
            display: "flex",
          }}
        >
          <Button onClick={handleBackBottom}>
            <ArrowBackIcon
              sx={{
                color: "#DAE0E6",
              }}
            />
          </Button>

          <Box
            id="chat-header-main-info"
            sx={{
              display: "flex",
              gap: "15px",
            }}
          >
            <Avatar />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "3px",
              }}
            >
              <Typography
                fontSize={"13px"}
                fontWeight={"bold"}
                color={"#DAE0E6"}
              >
                {chat.name}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  gap: "5px",
                }}
              >
                <Typography fontSize={"13px"} color={"#435C6D"}>
                  {chat.users.length}
                </Typography>
                <Typography fontSize={"13px"} color={"#435C6D"}>
                  участика
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        
        <Button>
          <MoreVertIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
      </Box>

      <Box
        className={"chat-main"}
        ref={chatMainRef}
        sx={{
          overflowY: "scroll",
          width: "100%",
          gap: "15px",
          height: "100%",
          paddingBottom: "5px",
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
        {pastMessages.length !== 0 &&
          pastMessages.map((msg) =>
            msg.sender._id === userData._id ? (
              <MyMessage key={msg._id} message={msg} />
            ) : (
              <FriendMessage key={msg._id} message={msg} />
            )
          )}
        {messages.map((msg, index) => {
          return msg.sender._id === userData._id ? (
            <MyMessage key={index} message={msg} />
          ) : (
            <FriendMessage key={index} message={msg} />
          );
        })}
      </Box>

      <Box
        className={"chat-footer"}
        sx={{
          display: "flex",
          alignItems: "center",
          bottom: "0",
          paddingY: "10px",
          gap: "20px",
          width: "100%",
          outline: 1,
          outlineColor: "gray",
          backgroundColor: "#0E1621",
        }}
      >
        <Button>
          <AttachFileIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
        <Input
          id="send_message"
          disableUnderline={true}
          value={message}
          type="text"
          autoComplete="off"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Напишите сообщение..."
          sx={{
            color: "white",
            width: "100%",
            paddingX: "5px",
          }}
        />
        <Button onClick={sendMessage}>
          <SendIcon
            sx={{
              color: "white",
            }}
          />
        </Button>
      </Box>
    </Box>
  );
}
