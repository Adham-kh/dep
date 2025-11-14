import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface Message {
  chatId: string;
  fromUserId: string;
  toUserId: string;
  text: string;
  timestamp: number;
}

const Chat: React.FC = () => {
  const { chatId } = useParams<{ chatId: string }>();
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("messages") || "[]");
    const chatMessages = saved.filter((m: any) => m.chatId === chatId);
    setMessages(chatMessages);
  }, [chatId]);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !text.trim()) return;

    const newMessage: Message = {
      chatId: chatId!,
      fromUserId: user.id,
      toUserId: chatId!.replace(user.id, ""), // грубая логика
      text,
      timestamp: Date.now(),
    };

    const allMessages = JSON.parse(localStorage.getItem("messages") || "[]");
    const updated = [...allMessages, newMessage];
    localStorage.setItem("messages", JSON.stringify(updated));
    setMessages(updated.filter((m: any) => m.chatId === chatId));
    setText("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>💬 Чат</h2>
      <div
        style={{
          height: 300,
          overflowY: "auto",
          border: "1px solid #ccc",
          borderRadius: 8,
          padding: 10,
          marginBottom: 10,
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.timestamp}
            style={{
              textAlign: msg.fromUserId === user?.id ? "right" : "left",
              margin: "6px 0",
            }}
          >
            <span
              style={{
                display: "inline-block",
                padding: "8px 12px",
                borderRadius: 12,
                background:
                  msg.fromUserId === user?.id ? "#dcf8c6" : "#f1f1f1",
              }}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={sendMessage} style={{ display: "flex", gap: 8 }}>
        <input
          style={{ flex: 1, padding: 8 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Введите сообщение..."
        />
        <button type="submit">📩</button>
      </form>
    </div>
  );
};

export default Chat;
