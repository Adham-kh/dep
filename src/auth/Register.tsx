import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Register.module.css"

export default function Register() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));

        console.log(e.target);

    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert("Пароли не совпадают!");
            return;
        }
        console.log("Регистрация:", formData);
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
        <h2 className={styles.formTitle}>Регистрация</h2>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Имя:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
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
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        <div className={styles.formGroup}>
          <label className={styles.label}>
            Подтвердите пароль:
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </label>
        </div>

        <button type="submit" className={styles.submitButton}>
          Создать аккаунт
        </button>

        <div className={styles.loginLink}>
          <p className={styles.loginText}>
            Уже есть аккаунт?{" "}
            <Link to="/login" className={styles.loginLinkText}>
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  </main>
);




};

