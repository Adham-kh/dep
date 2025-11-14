// src/services/likeService.ts

export interface Like {
    fromUserId: string;
    toUserId: string;
    timestamp: string;
}

const STORAGE_KEY = "likes";

export  const likeService = {
    // Получить все лайки
    getAll(): Like[] {
        return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    },

    // Добавить лайк
    add(fromUserId: string, toUserId: string): boolean {
        const likes = this.getAll();
        const exists = likes.some(like => like.fromUserId === fromUserId && like.toUserId === toUserId);
        if (exists) return false;

        likes.push({
            fromUserId,
            toUserId,
            timestamp: new Date().toISOString(),
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(likes));
        return true;
    },

    // Проверить взаимный лайк
    isMutual(userA: string, userB: string): boolean {
        const likes = this.getAll();
        return (
            likes.some(l => l.fromUserId === userA && l.toUserId === userB) &&
            likes.some(l => l.fromUserId === userB && l.toUserId === userA)
        );
    },

    // Очистить лайки (для тестов)
    clear() {
        localStorage.removeItem(STORAGE_KEY);
    },

    // Получить всех пользователей, с которыми есть взаимный лайк
    getMatches(currentUserId: string): string[] {
        const likes = this.getAll();

        const matches = likes
            .filter(like => like.fromUserId === currentUserId)
            .map(like => like.toUserId)
            .filter(toId =>
                likes.some(l => l.fromUserId === toId && l.toUserId === currentUserId)
            );

        return matches;
    },
    
};
