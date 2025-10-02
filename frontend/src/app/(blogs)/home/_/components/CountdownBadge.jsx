"use client";

import { HiOutlineCalendar } from "react-icons/hi";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toPersianDigits } from "@/utils/numberFormatter";

const CountdownBadge = () => {
  // Set target date (example: 5 days from now)
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5);

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Countdown finished
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row items-center gap-6 mb-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex items-center gap-4 bg-primary-700 rounded-xl px-3 py-2"
        role="timer"
        aria-live="polite"
        aria-atomic="true"
      >
        <HiOutlineCalendar className="w-7 h-7 text-white" />
        <div className="flex gap-3 font-bold text-white md:text-base">
          <TimeSegment label="روز" value={timeLeft.days} />
          <TimeSegment label="ساعت" value={timeLeft.hours} />
          <TimeSegment label="دقیقه" value={timeLeft.minutes} />
          <TimeSegment label="ثانیه" value={timeLeft.seconds} />
        </div>
      </motion.div>

      {/* Discount label outside the countdown */}
      <span className=" badge badge--danger text-sm font-bold">تخفیف ۲۰٪</span>
    </div>
  );
};

const TimeSegment = ({ label, value }) => (
  <div className="flex flex-col items-center min-w-[40px]">
    <span className="text-lg font-mono">{toPersianDigits(value)}</span>
    <span className="text-xs text-white">{label}</span>
  </div>
);

export default CountdownBadge;
