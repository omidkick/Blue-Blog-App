"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/slide-mobile-login.svg",
    title: "ورود با موبایل",
    description: "ورود آسان با موبایل و دسترسی سریع به حساب.",
  },
  {
    image: "/images/slide-computer-login.svg",
    title: "ورود با دسکتاپ",
    description: "سازگار با دسکتاپ – همه ابزار در اختیار شماست.",
  },
  {
    image: "/images/slide-login-security.svg",
    title: "امنیت تضمینی",
    description: "ورود امن و محافظت‌شده با تکنولوژی روز.",
  },
  {
    image: "/images/slide-creativity.svg",
    title: "خلاقیت و الهام",
    description: "محیطی الهام‌بخش برای نوشتن و ساختن محتوا.",
  },
];

const SignInSlider = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-primary-600 via-primary-500 to-primary-700 relative overflow-hidden">
      <div className="flex flex-col items-center justify-center w-full p-12 relative z-10">
        {/* Slide Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-8">
              <img
                src={slides[index].image}
                alt={slides[index].title}
                className="w-80 h-80 object-contain mx-auto drop-shadow-2xl"
              />
            </div>

            <h2 className="text-4xl font-bold text-secondary-0 mb-4">
              {slides[index].title}
            </h2>
            <p className="text-secondary-0/80 text-lg max-w-md mx-auto leading-relaxed">
              {slides[index].description}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-3">
          {slides.map((_, i) => (
            <motion.button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === i
                  ? "bg-white scale-110 shadow-md"
                  : "bg-white/30 hover:bg-white/70"
              }`}
              whileTap={{ scale: 0.8 }}
              aria-label={`رفتن به اسلاید ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SignInSlider;
