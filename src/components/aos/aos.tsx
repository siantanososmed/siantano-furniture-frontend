"use client";
import { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";

export default function AosInit({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);
  return <>{children}</>;
}
