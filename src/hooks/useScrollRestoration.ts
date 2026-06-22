// hooks/useScrollRestoration.ts
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = () => {
  const location = useLocation();
  const key = `scroll_${location.pathname}`;

  // احفظ الموضع أثناء الـ scroll
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem(key, String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [key]);

  // استعد الموضع عند الدخول للصفحة
  useEffect(() => {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      // setTimeout ضروري — ينتظر الـ DOM يكتمل أولاً
      setTimeout(() => {
        window.scrollTo(0, parseInt(saved));
      }, 0);
    }
  }, [key]);
};