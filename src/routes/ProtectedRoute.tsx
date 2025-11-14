import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const { user, loading } = useAuth();

  // Пока user загружается из localStorage показываем экран загрузки
  if (loading) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован → редирект на логин
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Если авторизован → рендерим приватный контент
  return <>{children}</>;
};

export default ProtectedRoute;
