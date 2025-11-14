// src/utils/fakeData.ts
import type { User } from "../types/user";
// 🔧 База данных тестовых пользователей
export const fakeUsersDatabase: User[] = [
    {
        id: "u2",
        name: "Рахим",
        email: "anna@mail.com",
        password: "1234",
        age: 25,
        city: "Тверь",
        bio: "UX-дизайнер, обожаю путешествия и стартапы ✈️",
        photo: "https://i.pravatar.cc/300?img=5"
    },
    {
        id: "u3",
        name: "Адхам",
        email: "max@mail.com",
        password: "1234",
        age: 29,
        city: "Казань",
        bio: "Фронтенд-разработчик. Люблю JS и настольные игры 🎲",
        photo: "https://i.pravatar.cc/300?img=7"
    },
    {
        id: "u4",
        name: "Света",
        email: "sveta@mail.com",
        password: "1234",
        age: 23,
        city: "Екатеринбург",
        bio: "Инженер-строитель, люблю спорт и хорошее кино 🎬",
        photo: "https://i.pravatar.cc/300?img=9"
    },
    {
        id: "u5",
        name: "Дмитрий",
        email: "dmitry@mail.com",
        password: "1234",
        age: 31,
        city: "Новосибирск",
        bio: "Data scientist, увлекаюсь AI и машинным обучением 🤖",
        photo: "https://i.pravatar.cc/300?img=11"
    },
    {
        id: "u6",
        name: "Ольга",
        email: "olga@mail.com",
        password: "1234",
        age: 26,
        city: "Ростов-на-Дону",
        bio: "Маркетолог, люблю фотографию и йогу 📸",
        photo: "https://i.pravatar.cc/300?img=13"
    }
];

// 🔧 Функция для получения пользователей (исключая текущего)
export const getUsersFromDatabase = (currentUserId: string | undefined): User[] => {
    return fakeUsersDatabase.filter(user => user.id !== currentUserId);
};

// 🔧 Функция для поиска пользователя по ID
export const findUserById = (id: string): User | undefined => {
    return fakeUsersDatabase.find(user => user.id === id);
};

