import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 mt-16">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-2 px-4 text-center">
        <div className="font-bold text-lg">manty.co.kr</div>
        <div className="text-sm text-gray-400">© {new Date().getFullYear()} manty. All rights reserved.</div>
        <div className="flex gap-4 mt-2">
          <Link href="/" className="hover:underline">홈</Link>
          <Link href="/posts" className="hover:underline">게시판</Link>
          <Link href="/devtools" className="hover:underline">DevTools</Link>
        </div>
      </div>
    </footer>
  );
} 