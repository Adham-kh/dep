import React, { useState, useRef, useEffect } from "react";
import styles from "./Swipe.module.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getUsersFromDatabase } from "../utils/fakeData";
import { likeService } from "../servises/LikeServise";

// 🎯 Интерфейс для пользователя
interface User {
    id: string;
    name: string;
    age: number;
    photo: string;
    bio: string;
    email?: string;
    city?: string;
}

// 💫 Основной компонент свайп-интерфейса
const SwipeLogic: React.FC = () => {
    // 🔐 Получаем текущего авторизованного пользователя из контекста
    const { user: currentUser } = useAuth();

    // 🧭 Хук для навигации между страницами
    const navigate = useNavigate();

    // 📊 Состояния компонента
    const [users, setUsers] = useState<User[]>([]); // Список пользователей для свайпов
    const [currentIndex, setCurrentIndex] = useState(0); // Индекс текущей карточки
    const [startX, setStartX] = useState(0); // Начальная позиция касания для свайпа
    const [isDragging, setIsDragging] = useState(false); // Флаг активного перетаскивания
    const [swipeDirection, setSwipeDirection] = useState<"left" | "right" | null>(null); // Направление свайпа

    // 🎯 Ссылка на DOM-элемент карточки для управления анимациями
    const cardRef = useRef<HTMLDivElement>(null);

    // 📥 Функция для загрузки пользователей из базы данных
    const loadUsers = () => {
        // Получаем пользователей из fakeData (исключая текущего пользователя)
        const usersFromDatabase = getUsersFromDatabase(currentUser?.id);
        setUsers(usersFromDatabase);
        setCurrentIndex(0); // Сбрасываем индекс на первую карточку
        console.log(`📥 Загружено ${usersFromDatabase.length} пользователей из базы данных`);
    };

    // 🔄 Загружаем пользователей при монтировании компонента и при изменении текущего пользователя
    useEffect(() => {
        loadUsers();
    }, [currentUser]);

    // 👆 Обработчик начала касания (тач или мышь)
    const handleTouchStart = (e: React.TouchEvent) => {
        setStartX(e.touches[0].clientX); // Запоминаем начальную позицию X
        setIsDragging(true); // Активируем режим перетаскивания
        setSwipeDirection(null); // Сбрасываем индикатор направления
    };

    // 🖐️ Обработчик движения во время свайпа
    const handleTouchMove = (e: React.TouchEvent) => {
        // Если не в режиме перетаскивания или карточка не найдена - выходим
        if (!isDragging || !cardRef.current) return;

        // 📏 Вычисляем разницу между текущей и начальной позицией
        const diff = e.touches[0].clientX - startX;
        const maxOffset = 200; // Максимальное смещение карточки
        const offset = Math.max(-maxOffset, Math.min(maxOffset, diff)); // Ограничиваем смещение

        // 🎭 Применяем трансформации: смещение + поворот пропорционально смещению
        cardRef.current.style.transform = `translateX(${offset}px) rotate(${offset * 0.1}deg)`;

        // 🎨 Изменяем прозрачность для визуальной обратной связи
        cardRef.current.style.opacity = (1 - Math.abs(offset) / maxOffset).toString();

        // 🎯 Показываем индикатор направления при значительном смещении
        if (offset > 50) {
            setSwipeDirection("right"); // Свайп вправо = Лайк
        } else if (offset < -50) {
            setSwipeDirection("left"); // Свайп влево = Дизлайк
        } else {
            setSwipeDirection(null); // Сбрасываем если смещение маленькое
        }
    };

    // 🚀 Обработчик окончания свайпа (когда пользователь отпускает карточку)
    const handleTouchEnd = () => {
        if (!cardRef.current || !isDragging) return;

        // 📍 Получаем текущее смещение карточки из CSS трансформации
        const currentTransform = cardRef.current.style.transform;
        const currentX = parseInt(currentTransform.match(/translateX\(([-\d.]+)px\)/)?.[1] || "0");

        // 🎯 Если смещение превышает порог - обрабатываем свайп
        if (Math.abs(currentX) > 100) {
            swipe(currentX > 0 ? "right" : "left"); // Определяем направление
        } else {
            // 🔄 Возвращаем карточку на место (отмена свайпа)
            cardRef.current.style.transition = "all 0.3s ease";
            cardRef.current.style.transform = "translateX(0px) rotate(0deg)";
            cardRef.current.style.opacity = "1";
            setSwipeDirection(null); // Сбрасываем индикатор

            // ⏰ Убираем transition после анимации возврата
            setTimeout(() => {
                if (cardRef.current) cardRef.current.style.transition = "";
            }, 300);
        }

        setIsDragging(false); // Деактивируем режим перетаскивания
    };

    // 💫 Функция обработки свайпа (вызывается при достижении порога)
    const swipe = (dir: "left" | "right") => {
        // 🛡️ Проверяем что карточка существует и есть еще карточки
        if (!cardRef.current || currentIndex >= users.length) return;

        setSwipeDirection(dir); // Устанавливаем направление для индикатора

        // 🎬 Анимация ухода карточки за экран
        cardRef.current.style.transition = "all 0.5s ease";
        cardRef.current.style.transform = `translateX(${dir === "right" ? 500 : -500}px) rotate(${dir === "right" ? 30 : -30}deg)`;
        cardRef.current.style.opacity = "0";

        // ⏰ После завершения анимации обрабатываем результат
        setTimeout(() => {
            const swipedUser = users[currentIndex]; // Получаем свайпнутого пользователя
            console.log(`🌀 ${swipedUser.name} свайпнут ${dir}`);




            if (dir === "right" && currentUser) {
                const added = likeService.add(currentUser.id, swipedUser.id );
                if (added) {
                    console.log(`❤️ Лайк сохранен для ${swipedUser.name}`);
                    if (likeService.isMutual(currentUser.id, swipedUser.id)) {
                        console.log(`🎉 МАТЧ! С ${swipedUser.name}`);
                        // здесь можно вызвать модалку или уведомление
                    }
                }
            }

            // ➡️ Переходим к следующей карточке
            setCurrentIndex(prev => prev + 1);
            setSwipeDirection(null); // Сбрасываем индикатор

            // 🔄 Сбрасываем стили для следующей карточки
            if (cardRef.current) {
                cardRef.current.style.transition = "";
                cardRef.current.style.transform = "";
                cardRef.current.style.opacity = "1";
            }
        }, 500); // Задержка соответствует длительности анимации
    };

    

    // 🔄 Функция для начала заново (перезагрузка пользователей)
    const restartSwipe = () => {
        loadUsers();
    };

    // 🎭 Сброс анимации при смене карточки
    useEffect(() => {
        if (cardRef.current) {
            cardRef.current.style.transition = "";
            cardRef.current.style.transform = "";
            cardRef.current.style.opacity = "1";
            setSwipeDirection(null);
        }
    }, [currentIndex]);

    // 🏁 Все карточки просмотрены - показываем сообщение
    if (currentIndex >= users.length) {
        return (
            <>
                {/* 🪄 Фиксированный фон под всем интерфейсом */}
                <div className={styles.background}></div>

                <div className={styles.container}>
                    <div className={styles.emptyState}>
                        <h2>🎉 Вы просмотрели всех пользователей!</h2>
                        <p>В базе данных больше нет новых анкет</p>
                        <button
                            className={styles.primaryButton}
                            onClick={restartSwipe}
                        >
                            🔄 Проверить снова
                        </button>
                    </div>

                    {/* 📱 Нижняя навигация */}
                    <div className={styles.bottomNav}>
                        <button className={styles.navButton} onClick={() => navigate("/swipe")}>
                            <span className={styles.navIcon}>💞</span>
                            <span className={styles.navText}>Знакомства</span>
                        </button>
                        <button className={styles.navButton} onClick={() => navigate("/likes")}>
                            <span className={styles.navIcon}>❤️</span>
                            <span className={styles.navText}>Лайки</span>
                        </button>
                        <button className={styles.navButton} onClick={() => navigate("/chats")}>
                            <span className={styles.navIcon}>💬</span>
                            <span className={styles.navText}>Чаты</span>
                        </button>
                        <button className={styles.navButton} onClick={() => navigate("/profile")}>
                            <span className={styles.navIcon}>👤</span>
                            <span className={styles.navText}>Профиль</span>
                        </button>
                    </div>
                </div>
            </>
        );
    }

    // 🎨 Основной интерфейс свайпера
    return (
        <>
            {/* 🪄 Фиксированный фон под всем интерфейсом */}
            <div className={styles.background}></div>

            <div className={styles.container}>
                {/* 🃏 Карточка */}
                <div className={styles.cardContainer}>
                    <div
                        ref={cardRef}
                        className={styles.card}
                        style={{ backgroundImage: `url(${users[currentIndex].photo})` }}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                    >
                        {swipeDirection && (
                            <div className={`${styles.swipeIndicator} ${styles[swipeDirection]}`}>
                                {swipeDirection === "right" ? "❤️ ЛАЙК" : "❌ ДИЗЛАЙК"}
                            </div>
                        )}

                        <div className={styles.info}>
                            <h3>{users[currentIndex].name}, {users[currentIndex].age}</h3>
                            <p>{users[currentIndex].bio}</p>
                            {users[currentIndex].city && (
                                <p className={styles.city}>📍 {users[currentIndex].city}</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* 🎛 Кнопки действий */}
                <div className={styles.buttons}>
                    <button className={`${styles.actionButton} ${styles.dislike}`} onClick={() => swipe("left")}>
                        <span className={styles.buttonIcon}>❌</span>
                        <span className={styles.buttonText}>Нет</span>
                    </button>
                    <button className={`${styles.actionButton} ${styles.like}`} onClick={() => swipe("right")}>
                        <span className={styles.buttonIcon}>❤️</span>
                        <span className={styles.buttonText}>Да</span>
                    </button>
                </div>
            </div>

            {/* 📱 Нижняя навигация - ВНЕ контейнера */}
            <div className={styles.bottomNav}>
                <button className={styles.navButton} onClick={() => navigate("/swipe")}>
                    <span className={styles.navIcon}>💞</span>
                    <span className={styles.navText}>Знакомства</span>
                </button>
                <button className={styles.navButton} onClick={() => navigate("/likes")}>
                    <span className={styles.navIcon}>❤️</span>
                    <span className={styles.navText}>Лайки</span>
                </button>
                <button className={styles.navButton} onClick={() => navigate("/chats")}>
                    <span className={styles.navIcon}>💬</span>
                    <span className={styles.navText}>Чаты</span>
                </button>
                <button className={styles.navButton} onClick={() => navigate("/profile")}>
                    <span className={styles.navIcon}>👤</span>
                    <span className={styles.navText}>Профиль</span>
                </button>
            </div>
        </>
    );
};

export default SwipeLogic;