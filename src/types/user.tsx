// types/user.ts

// 🔐 Для регистрации - только обязательные поля
export interface RegisterData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}

// 👤 Основной тип пользователя (для отображения, карточек, профиля)
export interface User {
    id: string;
    name: string;
    email: string;
    photo: string;
    age: number;
    city: string;
    bio: string;
    password?: string; // опционально, только для внутреннего использования
}

// 🔑 Для логина - только email и пароль
export interface LoginData {
    email: string;
    password: string;
}