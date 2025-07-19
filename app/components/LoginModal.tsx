import React, { useState } from "react";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (id: string) => void;
}

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        onLogin(username);
        alert("로그인 성공!");
      } else {
        alert("로그인 실패");
      }
    } catch {
      alert("네트워크 오류");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-xs relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        <h1 className="text-2xl font-bold mb-6 text-center">로그인</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="아이디"
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
            value={username}
            onChange={e => setUsername(e.target.value)}
            autoComplete="username"
            required
          />
          <input
            type="password"
            placeholder="비밀번호"
            className="border rounded px-3 py-2 focus:outline-none focus:ring"
            value={password}
            onChange={e => setPassword(e.target.value)}
            autoComplete="current-password"
            required
          />
          <button
            type="submit"
            className="bg-[#032D78] text-white font-semibold py-2 rounded hover:bg-blue-900 transition disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "로그인 중..." : "로그인"}
          </button>
        </form>
      </div>
    </div>
  );
} 