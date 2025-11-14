import React, { useEffect, useState, useCallback } from "react";
//import { likeService } from "../servises/LikeServise"; // оставил твой путь
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "./LikePages.module.css"

export const LikesPage: React.FC = () => {
    const { user: currentUser } = useAuth();
    const [matches, setMatches] = useState<any[]>([]);
    const navigate = useNavigate();

    const loadMatches = useCallback(() => {
        if (!currentUser) return;

        // 1. Получаем все лайки и пользователей из localStorage
        const likes = JSON.parse(localStorage.getItem("likes") || "[]");
        // const users = JSON.parse(localStorage.getItem("users") || "[]");
        console.log(likes, "adasdasd")
        // 2. Находим id пользователей, которых лайкнул текущий пользователь
        const likedIds = likes
            .filter((l: any) => l.fromUserId === currentUser.id)
            .map((l: any) => l.toUserId);



        // 3. Находим взаимные лайки (кто лайкнул текущего пользователя)
        const mutualIds = likedIds.filter((id: string) =>
            likes.some((l: any) => l.fromUserId === id && l.toUserId === currentUser.id)
        );

        console.log("💞 Совпадения с текущим пользователем (id):", mutualIds);

        // // 4. Получаем объекты пользователей по этим id
        // const matchedUsers = users.filter((u: any) => mutualIds.includes(u.id));
        // console.log("💞 Объекты совпадений:", matchedUsers);

        setMatches(mutualIds);
    }, [currentUser]);


    useEffect(() => {
        // Загружаем при монтировании + при смене currentUser
        loadMatches();

        // Слушаем событие storage — если в другой вкладке поменяли localStorage
        const onStorage = (e: StorageEvent) => {
            if (e.key === "likes" || e.key === "users" || e.key === null) {
                console.info("storage event detected:", e.key);
                loadMatches();
            }
        };
        window.addEventListener("storage", onStorage);

        return () => {
            window.removeEventListener("storage", onStorage);
        };
    }, [loadMatches]);

    if (!currentUser) return <p>Загрузка пользователя...</p>;

    return (
        <div className={styles.matchesContainer}>
            <div className={styles.matchesHeader}>
                <h2 className={styles.matchesTitle}>💞 Совпадения</h2>
                <div className={styles.matchesControls}>
                    <button
                        onClick={loadMatches}
                        className={styles.controlButton}
                    >
                        Refresh
                    </button>
                    <button
                        onClick={() => {
                            console.log(matches);
                        }}
                        className={styles.controlButton}
                    >
                        Log для тестов
                    </button>
                    <button
                        onClick={() => {
                            console.log("Все likes сейчас в localStorage:", JSON.parse(localStorage.getItem("likes") || "[]"));
                        }}
                        className={styles.controlButton}
                    >
                        Log Likes
                    </button>
                </div>
            </div>

            <div className={styles.currentUserInfo}>
                <p>Текущий пользователь: {currentUser.id}</p>
            </div>

            {matches.length === 0 ? (
                <div className={styles.noMatches}>
                    <p className={styles.noMatchesText}>Пока нет совпадений 😔</p>
                    <p className={styles.noMatchesHint}>
                        (Убедись, что в localStorage есть ключи <code>likes</code> и <code>users</code>.)
                    </p>
                </div>
            ) : (
                <ul className={styles.matchesList}>
                    {matches.map((user) => (
                        <li
                            key={user}
                            className={styles.matchItem}
                            onClick={() => navigate(`/chat/${user.id}`)}
                        >
                            <img
                                src={user.avatar || "/placeholder.jpg"}
                         
                                className={styles.matchAvatar}
                            />
                            <p className={styles.matchName}>{user}</p>
                        </li>
                    ))}
                </ul>
            )}

            <div>
                <div className={styles.matchesCounter}>Количество совпадений: {matches.length}</div>
            </div>
        </div>
    );
};
