'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const images = [
  '/carousel_title_4.jpg',
  '/carousel_title_2.jpg',
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="w-screen max-w-none px-0 flex flex-col items-center">
      <div className="relative w-full h-56 sm:h-80 flex items-center justify-center bg-gray-100 rounded-none overflow-hidden">
        <button
          onClick={prev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
          aria-label="이전"
        >
          ◀
        </button>
        {images[index] === '/carousel_title_4.jpg' ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/carousel_title_4.jpg"
              alt="carousel-4"
              fill
              className="object-cover w-full h-full"
              unoptimized
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-black text-center px-4">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow">MANTY SCUBA</h2>
              <p className="text-lg sm:text-2xl font-medium drop-shadow mb-8">
                &quot;다이빙 강사가 들려주는 개발이야기에서 만티스쿠바를 개발하면서 얻은 지식을 공유합니다.
              </p>
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <a
                  href="/posts"
                  className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-full shadow hover:bg-blue-50 transition border border-blue-200"
                >
                  개발이야기
                </a>
              </div>
            </div>
          </div>
        ) : images[index] === '/carousel_title_2.jpg' ? (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src="/carousel_title_2.jpg"
              alt="carousel-2"
              fill
              className="object-cover w-full h-full"
              unoptimized
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
              <h2 className="text-3xl sm:text-5xl font-bold mb-4 drop-shadow">MANTY SCUBA</h2>
              <p className="text-lg sm:text-2xl font-medium drop-shadow">
                IT와 스쿠바 다이빙을 좋아하는 사람들 - 서울, 분당 지역
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={images[index]}
            alt={`carousel-${index}`}
            fill
            className="object-cover w-full h-full"
            unoptimized
          />
        )}
        <button
          onClick={next}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white z-10"
          aria-label="다음"
        >
          ▶
        </button>
      </div>
      <div className="flex gap-2 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-blue-500' : 'bg-gray-300'}`}
            onClick={() => setIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
} 