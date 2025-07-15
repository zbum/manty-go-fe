"use client";
import Carousel from "./components/Carousel";
import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
};

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";

  useEffect(() => {
    fetch(`${API_BASE}/posts?limit=5&sort=desc`)
      .then((res) => {
        if (!res.ok) throw new Error("데이터를 불러오지 못했습니다");
        return res.json();
      })
      .then((data) => setRecentPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  function formatDate(dateString: string) {
    const d = new Date(dateString);
    const pad = (n: number) => n.toString().padStart(2, '0');
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  }

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Carousel />
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-8 mt-8 px-4">
        {/* 최근 등록글 (좌측) */}
        <section className="flex-1">
          <h2 className="text-xl font-bold mb-4">최근 등록글</h2>
          {loading ? (
            <div>로딩 중...</div>
          ) : error ? (
            <div className="text-red-500">에러: {error}</div>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-1">
              {recentPosts.map((post) => (
                <li key={post.id} className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition">
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-1">{post.content}</p>
                  <p className="text-[#032D78] text-sm line-clamp-2 mt-2">{formatDate(post.createdAt)}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
        {/* 우측 좁은 패널 */}
        <aside className="w-full md:w-[280px] flex-shrink-0 bg-gray-50 border rounded-lg p-4 h-fit">
          <div className="text-gray-500 text-center">여기에 원하는 내용을 추가하세요</div>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
