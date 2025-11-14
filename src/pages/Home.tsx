import styles from "./Home.module.css"; // локальные стили
import reactLogo from "../assets/react.svg";
import nestLogo from "../assets/Nest.js.svg";
import postgresLogo from "../assets/PostgresSQL.svg";
import redisLogo from "../assets/Redis.svg";
import dockerLogo from "../assets/Docker.svg";

// import { useEffect } from "react";
import { Link } from "react-router-dom";
// Локальные заглушки-скриншоты UI. Замените этими путями на реальные PNG/JPG,
// либо перезапишите файлы в src/assets/screens/ с вашими скринами.
import homeShot from "../assets/screens/home-ui.svg";
import swipeShot from "../assets/screens/swipe-ui.svg";


const Home = () => {
  // Роль используем, чтобы показать, что гость в демо-режиме


  return (

    <div className={styles.section}>

      <section className={styles.hero}>

        <h1 className={styles.title}>💞 MyTinder — демо-проект для портфолио</h1>

        <p className={styles.subtitle}>
          Демо-клон механики свайпов «как в Tinder». Фокус — архитектура, UX и чистый код.
          Стек: <strong>React + TypeScript + Vite</strong> (клиент), <strong>Nest.js + PostgreSQL + Redis + Docker</strong> (сервер/инфраструктура — концептуально).
        </p>

        <div className={styles.ctaRow}>
          <Link to="/about" className="nav-link">О проекте</Link>
        </div>

      </section>

      <h2>🧠 Используемые технологии</h2>
      <div className={styles.techGrid}>
        <div className={`${styles.techCard}`}><img src={reactLogo} alt="React" /><span>React</span></div>
        <div className={`${styles.techCard}`}><img src={nestLogo} alt="Nest.js" /><span>Nest.js</span></div>
        <div className={`${styles.techCard}`}><img src={postgresLogo} alt="PostgreSQL" /><span>PostgreSQL</span></div>
        <div className={`${styles.techCard}`}><img src={redisLogo} alt="Redis" /><span>Redis</span></div>
        <div className={`${styles.techCard}`}><img src={dockerLogo} alt="Docker" /><span>Docker</span></div>
      </div>

      {/* Короткая тех-выжимка: зачем и как устроено. */}
      <section className={styles.card}>
        <h3>🎯 Цель проекта</h3>
        <p className={styles.muted}>
          Показать современный фронтенд-подход: модульные стили (CSS Modules), грамотная структура,
          анимации и доступность. Бэкенд и хранилища отражены на уровне архитектуры.
        </p>
        <ul className={styles.list}>
          <li>Роли: <code>guest</code> и <code>user</code> через Context.</li>
          <li>Защита маршрутов: <code>ProtectedRoute</code> (редирект гостя на /login).</li>
          <li>Свайпы: плавная анимация; в гостевом режиме — демонстрация без сохранения.</li>
        </ul>
      </section>

      {/* Доп. секция: как хранится auth/роль (для читателя). */}
      <section className={styles.card}>
        <h3>🔐 Аутентификация и роли</h3>
        <p className={styles.muted}>
          В демо используется <code>localStorage</code> (фиктивный token) + Context для роли. В проде это заменяется
          на полноценный backend-поток (JWT/OAuth, refresh-токены, revoke и т.д.).
        </p>
      </section>

      {/* Как работает свайп: пошаговый поток. */}
      <section className={styles.card}>
        <h3>🌀 Как работает свайп</h3>
        <div className={styles.flow}>
          <div className={styles.flowItem}>
            <span className={styles.flowBadge}>1</span>
            <span className={styles.muted}>Палец/мышь двигает карточку по оси X (touch/mouse events)</span>
          </div>
          <div className={styles.flowItem}>
            <span className={styles.flowBadge}>2</span>
            <span className={styles.muted}>При отпускании — порог → определяем направление (left/right)</span>
          </div>
          <div className={styles.flowItem}>
            <span className={styles.flowBadge}>3</span>
            <span className={styles.muted}>Анимация ухода карточки + переключение на следующую</span>
          </div>
          <div className={styles.flowItem}>
            <span className={styles.flowBadge}>4</span>
            <span className={styles.muted}>Гостевой режим: действие не сохраняется; у авторизованного — запрос к API</span>
          </div>
        </div>
      </section>

      {/* Планы развития (roadmap): короткий список */}
      <section className={styles.card}>
        <h3>🗺️ Планы развития</h3>
        <ul className={`${styles.list} ${styles.roadmap}`}>
          <li>Интеграция <code>react-tinder-card</code> для прод-фич (undo/stack коллбэки)</li>
          <li>Бэкенд: Nest.js + PostgreSQL: лайки/матчи/сообщения + OAuth</li>
          <li>Уведомления в хедере, real-time (WebSocket), загрузка фото</li>
          <li>Unit/Integration тесты, Lighthouse 90+ (Perf/A11y/SEO)</li>
        </ul>
      </section>

      {/* Галерея скриншотов: быстрый визуальный обзор */}
      <section className={styles.card}>
        <h3>🖼️ Скриншоты</h3>
        <div className={styles.gallery}>
          <div className={styles.galleryGrid}>
            <figure className={styles.shot}>
              <img
                className={styles.shotImg}
                src={swipeShot}
                alt="Экран свайпа (скрин UI)"
                loading="lazy"
              />
              <figcaption className={styles.shotCaption}>Экран свайпа: карточка с анимацией и кнопками лайк/дизлайк</figcaption>
            </figure>
            <figure className={styles.shot}>
              <img
                className={styles.shotImg}
                src={homeShot}
                alt="Главная (скрин UI)"
                loading="lazy"
              />
              <figcaption className={styles.shotCaption}>Техраздел: стек технологий и краткая архитектура</figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* Футер-напоминание */}
      <footer className={styles.footer}>
        Сделано с ❤️ для портфолио. Автор: <strong>Adham</strong>
      </footer>
    </div>
  );
};

export default Home;
