// app/posts/page.tsx
'use client';

import React, { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  content: string;
  // 필요한 필드 추가
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    setLoading(true);
    setError(null);
    const API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
    fetch(`${API_BASE}/posts${query ? `?query=${encodeURIComponent(query)}` : ''}`)
      .then((res) => {
        if (!res.ok) throw new Error('데이터를 불러오지 못했습니다');
        return res.json();
      })
      .then((data) => setPosts(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">등록글 목록</h1>
      <form
        className="mb-4 flex gap-2"
        onSubmit={e => {
          e.preventDefault();
          setQuery(search);
        }}
      >
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="검색어를 입력하세요"
          className="border rounded px-2 py-1 flex-1"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          검색
        </button>
      </form>
      <ul className="space-y-2">
        {posts.map((post) => (
          <li key={post.id} className="border p-3 rounded">
            <h2 className="font-semibold">{post.title}</h2>
            <p>{post.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
