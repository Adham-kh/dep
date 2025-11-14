import React, { useState } from "react";
import { Link } from 'react-router-dom';
import reactLogo from '../assets/react.svg';
import viteLogo from '../assets/vite.svg';
import styles from './About.module.css';

const About: React.FC = () => {
  const [count, setCount] = useState(0);

  return (

    <div className={styles.infoCard}>
      <h1>О нас</h1>
      <p>
        Добро пожаловать в <strong>MyTinder</strong> — современную платформу для знакомств,
        где вы можете найти любовь, друзей или просто интересных людей рядом с вами.
      </p>
      <p>
        Мы верим, что настоящие отношения начинаются с честности и уважения.
        Поэтому MyTinder создаёт безопасное пространство, где каждый может быть собой.
      </p>
      <p>
        Если у вас есть вопросы — посетите раздел{" "}
        
        <Link to="/support" className={styles.supportLink}>
          Поддержка
        </Link>{" "}
        или{" "}

        <Link to="/contact" className={styles.supportLink}>
          Свяжитесь с нами
        </Link>.

      </p>

      <button onClick={() => setCount((count) => count + 1)}>
        🎯 Счётчик: {count}
      </button>

      <div className={styles.aboutNavLinks}>
        <Link to="/login" className="nav-link">
          📱 Перейти к авторизации
        </Link>
        <Link to="/register" className="nav-link">
          👤 Зарегистрироваться
        </Link>
      </div>

      {/* Логотипы технологий */}
      <div className={styles.links}>
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className={styles.logoImg} alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className={`${styles.logoImg} ${styles.logoReact}`} alt="React logo" />
        </a>
      </div>
    </div>

  );
};

export default About;