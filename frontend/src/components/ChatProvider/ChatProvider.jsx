import React, { createContext, useContext, useState } from 'react'

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [openChat, setOpenChat] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,

        openChat,
        setOpenChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => useContext(ChatContext);

export { ChatProvider };