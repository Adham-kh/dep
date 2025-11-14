import React, { useState, useEffect, useRef } from "react";
import { useNavigate, type To } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import styles from "./Header.module.css";

// 🧩 Хук для входа тестового пользователя
// 🧩 Хук для входа тестового пользователя
const useDemoUser = () => {
  const { setUser } = useAuth();

  const setupDemoUser = () => {
    // 🎯 Создаем ТОЛЬКО тестового пользователя
    const demoUser = {
      id: "demo-user-123",
      name: "Demo User",
      email: "demo@mytinder.com",
      photo: "https://i.pravatar.cc/300?img=11",
      age: 25,
      city: "Москва",
      bio: "Тестовый пользователь для демонстрации"
    };

    // 🎯 Сохраняем ТОЛЬКО текущего пользователя
    localStorage.setItem("user", JSON.stringify(demoUser));
    setUser(demoUser);
    
    console.log("🎯 Успешный вход как тестовый пользователь");
    return true;
  };

  return { setupDemoUser };
};

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { setupDemoUser } = useDemoUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // 🔽 Ссылки для бургер-меню
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  // Закрываем бургер при клике вне меню
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isMenuOpen]);

  // Переход по навигации
  const handleNavClick = (path: string | number) => {
    setIsMenuOpen(false);

    if (typeof path === "number") {
      navigate(path); // назад
    } else {
      navigate(path as To); // строка
    }
  };

  const handleLogoClick = () => {
    setIsMenuOpen(false);
    navigate("/");
  };

  const handleDemoLogin = () => {
    const success = setupDemoUser();
    if (success) navigate("/profile");
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
    navigate("/login");
  };

  return (
    <header className={styles.siteHeader}>
      <div className={styles.logo} onClick={handleLogoClick}>
        💞 MyTinder
      </div>

      <button
        ref={buttonRef}
        className={`${styles.menuToggle} ${isMenuOpen ? styles.menuToggleActive : ""}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav
        ref={menuRef}
        className={`${styles.navLinks} ${isMenuOpen ? styles.navLinksActive : ""}`}
      >
        {/* Основные ссылки */}
        <button className={styles.navButton} onClick={() => handleNavClick(-1)}>
          ← Назад
        </button>
        <button className={styles.navButton} onClick={() => handleNavClick("/about")}>
          О нас
        </button>
        <button className={styles.navButton} onClick={() => handleNavClick("/contact")}>
          Связаться
        </button>

        {/* Авторизация */}
        {!user ? (
          <>
            <button className={styles.navButton} onClick={() => handleNavClick("/login")}>
              Войти
            </button>
            <button className={styles.navButton} onClick={() => handleNavClick("/register")}>
              Регистрация
            </button>
            <button className={styles.navButton} onClick={handleDemoLogin}>
              Войти как тестовый
            </button>
          </>
        ) : (
          <>
            <button className={styles.navButton} onClick={() => handleNavClick("/swipe")}>
              💞 Свайпы
            </button>
            <button className={styles.navButton} onClick={() => handleNavClick("/matches")}>
              💬 Сообщения
            </button>
            <button className={styles.navButton} onClick={() => handleNavClick("/profile")}>
              Мой профиль
            </button>
            <button className={styles.navButton} onClick={handleLogout}>
              Выйти
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;