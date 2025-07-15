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

  // 갤러리용 이미지 배열
  const galleryImages = [
    "/carousel_title_2.jpg",
    "/carousel_title_4.jpg",
    "/window.svg",
  ];
  const [galleryIndex, setGalleryIndex] = useState(0);
  const prevGallery = () => setGalleryIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1));
  const nextGallery = () => setGalleryIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1));

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
          {/* 갤러리 영역 (사진 갤러리) */}
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-3">갤러리</h2>
            <div className="flex gap-3">
              {galleryImages.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`gallery-${i}`}
                  className="w-1/3 h-28 object-cover rounded-lg border shadow-sm"
                />
              ))}
            </div>
          </div>
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
        <aside className="w-full md:w-[280px] flex-shrink-0 bg-white rounded-lg p-4 h-fit flex flex-col gap-6">
          {/* 첫 번째 구획: 스쿠버 다이빙 교육과정 */}
          <section className="bg-white border rounded-lg shadow p-4 mb-2">
            <h2 className="text-lg font-bold mb-4 text-center">스쿠버 다이빙 교육과정</h2>
            <ul className="space-y-3">
              {[
                { name: "오픈워터 다이버", desc: "입문자를 위한 기본 과정" },
                { name: "어드밴스드 오픈워터", desc: "심화 다이빙 기술 습득" },
                { name: "레스큐 다이버", desc: "응급상황 대처 및 구조 기술" },
                { name: "다이브마스터", desc: "프로페셔널 다이버 과정" },
                { name: "EFR(응급처치)", desc: "응급처치 및 CPR 교육" },
              ].map((course, idx) => (
                <li key={idx} className="border bg-white rounded p-3 shadow-sm hover:shadow transition">
                  <div className="font-semibold text-[#032D78]">{course.name}</div>
                  <div className="text-gray-600 text-sm">{course.desc}</div>
                </li>
              ))}
            </ul>
          </section>
          {/* 두 번째 구획: 공지사항 샘플 */}
          <section className="bg-white border rounded-lg shadow p-4 mb-2">
            <h2 className="text-lg font-bold mb-4 text-center">공지사항</h2>
            <ul className="space-y-2">
              {[
                { title: "5월 정기 다이빙 안내", date: "2024-05-10" },
                { title: "장비 점검 서비스 오픈", date: "2024-04-28" },
                { title: "신규 강사님 소개", date: "2024-04-15" },
              ].map((notice, idx) => (
                <li key={idx} className="bg-white rounded p-2 border hover:bg-gray-100 transition">
                  <div className="font-medium text-sm">{notice.title}</div>
                  <div className="text-gray-400 text-xs">{notice.date}</div>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
      <Footer />
    </div>
  );
}
