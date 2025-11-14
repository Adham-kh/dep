import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Match {
  id: string;
  username: string;
  photo: string;
}

const Matches: React.FC = () => {
  const { user } = useAuth();
  const [matches, setMatches] = useState<Match[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    // Загружаем лайки и пользователей
    const likes = JSON.parse(localStorage.getItem("likes") || "[]");
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Находим взаимные лайки (match)
    const myLikes = likes.filter((l: any) => l.fromUserId === user.id);
    const mutualMatches = users.filter((u: any) =>
      myLikes.some(
        (l: any) =>
          l.toUserId === u.id &&
          likes.some((r: any) => r.fromUserId === u.id && r.toUserId === user.id)
      )
    );

    setMatches(mutualMatches);
  }, [user]);

  return (
    <div style={{ padding: 20 }}>
      <h2>💞 Ваши совпадения</h2>

      {matches.length === 0 ? (
        <p>Пока совпадений нет 😢</p>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          {matches.map((m) => (
            <div
              key={m.id}
              onClick={() => navigate(`/chat/${m.id}`)}
              style={{
                width: 120,
                cursor: "pointer",
                textAlign: "center",
                border: "1px solid #ccc",
                borderRadius: 8,
                padding: 8,
              }}
            >
              <img
                src={m.photo}
                alt={m.username}
                style={{
                  width: "100%",
                  borderRadius: 8,
                  objectFit: "cover",
                  height: 120,
                }}
              />
              <p>{m.username}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Matches;
