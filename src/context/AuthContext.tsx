// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import type { User } from "../types/user";

// 🎯 Context отвечает ТОЛЬКО за состояние сессии
interface AuthContextType {
  user: User | null;                    // Текущий авторизованный пользователь
  setUser: (user: User | null) => void; // Функция для установки пользователя
  logout: () => void;                   // Функция выхода (управление сессией)
  loading: boolean;                     // Флаг загрузки сессии
}

// Создание контекста с начальным значением undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Кастомный хук для использования контекста аутентификации
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

// Провайдер контекста аутентификации
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Состояние для хранения данных текущего пользователя
  const [user, setUser] = useState<User | null>(null);

  // Состояние загрузки - показывает, идет ли восстановление сессии
  const [loading, setLoading] = useState(true);

  // Эффект для восстановления пользовательской сессии при загрузке приложения
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setLoading(false);
  }, []);

  // 🎯 Функция для выхода из системы (управление сессией)
  const logout = () => {
    // Удаляем данные пользователя из localStorage (завершаем сессию)
    localStorage.removeItem("user");
    
    // Сбрасываем состояние пользователя
    setUser(null);
  };

  // Возвращаем провайдер контекста
  return (
    <AuthContext.Provider value={{ 
      user,      // Текущий пользователь
      setUser,   // Установка пользователя
      logout,    // Выход из системы (управление сессией)
      loading    // Состояние загрузки
    }}>
      {children}
    </AuthContext.Provider>
  );
};