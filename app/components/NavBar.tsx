'use client';

import React, { useState } from "react";
import Link from "next/link";
import { Menu } from '@headlessui/react';

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  return (
    <nav className="w-full border-b border-b-[#032D78] bg-[#032D78] text-[15px]">
      <div className="w-full flex items-center gap-6 px-4 py-3 justify-between relative">
        <div className="flex items-center gap-6 min-w-0">
          {/* 햄버거 버튼 (모바일) */}
          <button
            className="md:hidden text-white focus:outline-none mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="메뉴 열기"
          >
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          {/* PC 메뉴 */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="font-bold text-white hover:text-blue-200">홈</Link>
            <Link href="/posts" className="font-bold text-white hover:text-blue-200">게시판</Link>
            <Menu as="div" className="relative">
              {({ open }) => (
                <>
                  <Menu.Button className="font-bold text-white hover:text-blue-200 focus:outline-none flex items-center gap-1">
                    DevTools
                    <span className="text-xs">
                      {open ? "▲" : "▼"}
                    </span>
                  </Menu.Button>
                  <Menu.Items className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/devtools/base64"
                          className={`block px-4 py-2 ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                        >
                          base64
                        </Link>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <Link
                          href="/devtools/urlencoding"
                          className={`block px-4 py-2 ${active ? 'bg-blue-50 text-blue-700' : 'text-gray-800'}`}
                        >
                          urlencoding
                        </Link>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </>
              )}
            </Menu>
          </div>
        </div>
        {/* 우측 로그인/관리 메뉴 (PC) */}
        <div className="hidden md:flex items-center gap-4 ml-auto">
          <Link href="/login" className="text-white hover:text-blue-200 font-semibold">로그인</Link>
          <Link href="/admin" className="text-white hover:text-blue-200 font-semibold">관리</Link>
        </div>
        {/* 모바일 메뉴 오버레이 */}
        {mobileOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
            <div className="absolute top-0 left-0 w-64 h-full bg-[#032D78] shadow-lg flex flex-col gap-2 p-6" onClick={e => e.stopPropagation()}>
              <button
                className="self-end mb-6 text-white"
                onClick={() => setMobileOpen(false)}
                aria-label="메뉴 닫기"
              >
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Link href="/" className="font-bold text-white hover:text-blue-200 py-2">홈</Link>
              <Link href="/posts" className="font-bold text-white hover:text-blue-200 py-2">게시판</Link>
              <div className="relative">
                <details>
                  <summary className="font-bold text-white hover:text-blue-200 py-2 cursor-pointer select-none">DevTools</summary>
                  <div className="flex flex-col ml-4 mt-1">
                    <Link href="/devtools/base64" className="block px-2 py-1 text-white hover:text-blue-200">base64</Link>
                    <Link href="/devtools/urlencoding" className="block px-2 py-1 text-white hover:text-blue-200">urlencoding</Link>
                  </div>
                </details>
              </div>
              <div className="mt-8 flex flex-col gap-2 border-t border-white/20 pt-4">
                <Link href="/login" className="text-white hover:text-blue-200 font-semibold">로그인</Link>
                <Link href="/admin" className="text-white hover:text-blue-200 font-semibold">관리</Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 