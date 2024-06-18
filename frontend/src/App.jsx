import React from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainPage } from './components/MainPage/MainPage';
import { RegisterPage } from './components/RegisterPage/RegisterPage';
import { LoginPage } from "./components/LoginPage/LoginPage";
import { NewsPage } from './components/Newspage/NewsPage';
import { CreateGroup } from './components/CreateGroup/CreateGroup';
import { NotFoundPage } from "./components/NotFoundPage/NotFoundPage";
import { ChatProvider } from './components/ChatProvider/ChatProvider';
import { CreateGroupProvider } from './components/CreateGroupProvider/CreateGroupProvider';
import io from 'socket.io-client';
import { CreateNewsPage } from './components/CreateNewsPage/CreateNewsPage';
import { CurrentNewsPage } from './components/Newspage/CurrentNewsPage';
import { EditPage } from './components/EditPage/EditPage';


const socket = io.connect('http://localhost:5000');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/main"
          element={
            <ChatProvider>
              <MainPage socket={socket} />
            </ChatProvider>
          }
        />
        <Route path="/news" element={<NewsPage />} />
        <Route
          path="/create"
          element={
            <CreateGroupProvider>
              <CreateGroup />
            </CreateGroupProvider>
          }
        />

        <Route path="/createNews" element={<CreateNewsPage />} />

        <Route path="/news/:id" element={<CurrentNewsPage />} />

        <Route path="/edit" element={<EditPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
