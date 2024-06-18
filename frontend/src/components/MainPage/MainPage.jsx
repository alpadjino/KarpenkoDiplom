import React, { useEffect, useState } from 'react'
import { Sidebar } from '../Sidebar/Sidebar';
import { MessangerBar } from '../MessangerBar/MessangerBar';
import { Box } from '@mui/material';
import { ChatComponent } from './ChatComponent';
import { Header } from '../Header/Header';
import { useChatContext } from "../ChatProvider/ChatProvider";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
 

export const MainPage = ({ socket }) => {
  const [isMobile, setIsMobile] = useState(false);
  const { openChat, setOpenChat } = useChatContext();
  const { selectedChat } = useChatContext();
  
  const navigate = useNavigate();

  const isLogin = useSelector((state) => state.user.userData._id);

  useEffect(() => {
    if (selectedChat) setOpenChat(true);
    else setOpenChat(false);
  }, [selectedChat, openChat]);

  useEffect(() => {
    if (!isLogin) {
      navigate("/news");
    } 
    document.title = "Чаты";
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
      }}
    >
      {isLogin && (
        <>
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
            {isMobile ? (
              <>
                <MessangerBar
                  visible={openChat ? "none" : "block"}
                  size={"100%"}
                />
                {selectedChat && (
                  <ChatComponent
                    chat={selectedChat}
                    visible={openChat ? "flex" : "none"}
                    socket={socket}
                  />
                )}
              </>
            ) : (
              <>
                <Sidebar />
                <MessangerBar visible={"block"} size={"17%"} />
                {selectedChat && (
                  <ChatComponent
                    chat={selectedChat}
                    visible={openChat ? "flex" : "none"}
                    maxH={"50%"}
                    socket={socket}
                  />
                )}
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
}
