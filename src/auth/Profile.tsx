import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

const Profile: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [avatar, setAvatar] = useState(user?.photo || "");

  const handleSave = () => {
    if (!user) return;

    const updatedUser = { ...user, username, email, avatar };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const index = users.findIndex((u: any) => u.id === user.id);
    if (index !== -1) {
      users[index] = { ...users[index], username, email, avatar };
      localStorage.setItem("users", JSON.stringify(users));
    }

    window.location.reload();
  };

  if (!user) return <div className={styles.container}>Пользователь не найден 😢</div>;

  return (
    <>
      {/* 🪄 Фиксированный фон под всем интерфейсом */}
      <div className={styles.background}></div>

      <div className={styles.container}>
        <div className={`${styles.profileCard} ${isEditing ? styles.editing : ''}`}>
          <img
            src={avatar || "https://cdn-icons-png.flaticon.com/512/1077/1077012.png"}
            alt="avatar"
            className={styles.avatar}
          />

          {isEditing ? (
            <>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Имя"
                className={styles.input}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className={styles.input}
              />
              <input
                type="text"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="URL аватара"
                className={styles.input}
              />
              <button onClick={handleSave} className={styles.saveButton}>
                💾 Сохранить
              </button>
              <button onClick={() => setIsEditing(false)} className={styles.cancelButton}>
                ✖ Отмена
              </button>
            </>
          ) : (
            <>
              <h3>{user.name}</h3>
              <p>{user.email}</p>

              <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                ✏️ Редактировать
              </button>
            </>
          )}

          <button
            onClick={() => navigate("/swipe")}
            className={styles.swipeButton}
          >
            💞 Смотреть анкеты
          </button>

          <button onClick={logout} className={styles.logoutButton}>
            🚪 Выйти
          </button>
        </div>
      </div>
    </>
  );
};

export default Profile;