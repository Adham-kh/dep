import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from "./Login.module.css"


function Login() {
  // локальное состояние для полей
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');



  // временная функция при отправке формы
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // отменяем перезагрузку страницы
    console.log('Вход:', { email, password });
    alert(`Попытка входа:\nEmail: ${email}\nПароль: ${password}`);
  };

  return (
    <main className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Главная страница приложения</h1>
        <Link to="/" className={styles.backLink}>
          ← Назад
        </Link>
      </div>

      <div className={styles.formWrapper}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.formTitle}>Вход</h2>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </label>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              Пароль:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
                required
              />
            </label>
          </div>

          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
