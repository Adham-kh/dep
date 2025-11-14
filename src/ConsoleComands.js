// Получаем все лайки из localStorage
const likes = JSON.parse(localStorage.getItem("likes") || "[]");

// Для каждой записи создаём обратный лайк, если его нет
likes.forEach(like => {
  const exists = likes.some(
    l => l.fromUserId === like.toUserId && l.toUserId === like.fromUserId
  );
  if (!exists) {
    likes.push({
      fromUserId: like.toUserId,
      toUserId: like.fromUserId,
      timestamp: new Date().toISOString(),
    });
  }
});

// Сохраняем обратно
localStorage.setItem("likes", JSON.stringify(likes));

console.log("✅ Все взаимные лайки добавлены!");
console.log(likes);

