import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './auth/Login.tsx';
import Register from './auth/Register.tsx';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import SwipePage from './pages/SwipePage.tsx';
import { LikesPage  } from './pages/LikePages.tsx';


import { AuthProvider } from './context/AuthContext';
import Profile from './auth/Profile.tsx';
import ProtectedRoute from './routes/ProtectedRoute.tsx';

import './index.css';
import About from './pages/About.tsx';
import Matches from './pages/Matches.tsx';

const rootElement = document.getElementById('root') as HTMLElement;

// import { initFakeData } from "./utils/fakeData";
// initFakeData();

ReactDOM.createRoot(rootElement).render(

  <React.StrictMode>

    {/* 🔽 теперь у нас есть глобальный контекст авторизации */}
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Основной layout */}

          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<><div>Страница поддержки</div></>} />
            <Route path="/contact" element={<><div>Связаться с нами</div></>} />

            {/* 🔒 Приватная страница */}

            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/swipe" element={<ProtectedRoute><SwipePage /></ProtectedRoute>} />
            <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />
            <Route path="/likes" element={<ProtectedRoute><LikesPage /></ProtectedRoute>} />
            <Route path="/matches" element={<ProtectedRoute><Matches /></ProtectedRoute>} />

          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 🔒 Приватная страница */}

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
