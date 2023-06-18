"use client";
import { useRef, useEffect, useState, useCallback } from "react";
export default function FirstSection() {
  const [scrollY, setScrollY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  //* 현재 스크롤의 위치를 추적하는 함수. */
  const handleScroll = useCallback(() => {
    setScrollY(window.scrollY);
  }, []);

  useEffect(() => {
    document.addEventListener("scroll", handleScroll, { passive: true });
    return () => document.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const { current } = ref;
  let currnetHeignt = 0;
  if (current) {
    currnetHeignt = Math.min(1, scrollY / current.clientHeight);
  }

  return (
    <div
      className="flex justify-center items-center flex-col min-h-screen sticky top-0 -z-10"
      ref={ref}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover "
        style={{ transform: `translateY(-${currnetHeignt * 20}vh)` }}
      >
        <source src="/video-bg.mp4" type="video/mp4" />
      </video>
      <div className="gap-4 flex flex-col text-white drop-shadow-[0_5px_3px_rgba(0,0,0,0.4)] text-center z-10 font-bold">
        <h1 className="text-5xl">NFT-MARKET</h1>
        <h2 className="text-2xl">
          <span>Unlock infinite world of digital treasures</span>
          <span>parllax</span>
        </h2>
      </div>
    </div>
  );
}
