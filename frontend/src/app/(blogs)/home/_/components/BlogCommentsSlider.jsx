"use client";

import { useRef, useState, useEffect } from "react";
import { StarIcon as StarSolid } from "@heroicons/react/20/solid";
import {
  HandThumbUpIcon,
  StarIcon as StarOutline,
} from "@heroicons/react/24/outline";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { toLocalDateShort } from "@/utils/dateFormatter";
import Avatar from "@/ui/Avatar";
import useWindowWidth from "@/hooks/useWindowWidth";

const comments = [
  {
    name: "زهرا امیری",
    comment:
      "مقاله خیلی مفید و کاربردی بود، پیشنهاد میکنم حتما بخونید! اطلاعاتش خیلی کامل و روان ارائه شده بود و تونستم خیلی از نکات مهم رو یاد بگیرم.",
    blogTitle: "۱۰ نکته برای حرفه‌ای شدن در جاوااسکریپت",
    date: "2025-06-10",
    rating: 5,
    avatarSrc: "/images/woman_3.webp",
  },
  {
    name: "امین قاسمی",
    comment:
      "کاش این مقاله رو زودتر می‌خوندم! بعضی بخش‌هاش واقعا چشم بازکن بود و دیدم نسبت به توسعه پروژه‌هام خیلی تغییر کرد.",
    blogTitle: "چگونه پروژه واقعی بسازیم؟",
    date: "2025-04-01",
    rating: 2,
    avatarSrc: "/images/user_1.webp",
  },
  {
    name: "ندا رضایی",
    comment:
      "با خوندن این مقاله دیدم نسبت به توسعه فرانت‌اند خیلی بهتر شد، ممنونم از نویسنده. توضیحات کاملا ساده و قابل فهم بود و مثال‌ها به یادگیری کمک کردند.",
    blogTitle: "درک بهتر از React",
    date: "2025-05-20",
    rating: 5,
    avatarSrc: "/images/woman_3.webp",
  },
  {
    name: "محمد یزدی",
    comment:
      "توضیحات کامل و دقیق بودن. بهترین مقاله‌ای که تو این زمینه خوندم. بخش‌های مختلف به خوبی دسته‌بندی شده بود و تونستم به راحتی نکات اصلی رو استخراج کنم.",
    blogTitle: "راهنمای جامع Node.js",
    date: "2025-03-28",
    rating: 3,
    avatarSrc: "/images/user_1.webp",
  },
  {
    name: "سارا کریمی",
    comment:
      "این مقاله نه تنها برای مبتدی‌ها بلکه برای افراد حرفه‌ای هم نکات جالبی داشت. توضیحاتی که درباره بهینه‌سازی عملکرد ارائه شده بود خیلی کاربردی و به‌روز بود. پیشنهاد میکنم به همه توسعه‌دهنده‌ها بخونن.این مقاله نه تنها برای مبتدی‌ها بلکه برای افراد حرفه‌ای هم نکات جالبی داشت. توضیحاتی که درباره بهینه‌سازی عملکرد ارائه شده بود خیلی کاربردی و به‌روز بود. پیشنهاد میکنم به همه توسعه‌دهنده‌ها بخونن.",
    blogTitle: "بهینه‌سازی عملکرد در توسعه وب",
    date: "2025-05-15",
    rating: 5,
    avatarSrc: "/images/woman_3.webp",
  },
  {
    name: "امیرحسین نادری",
    comment:
      "مطالب مقاله کاملا جامع و به‌روز بودن. در ابتدا فکر می‌کردم بعضی از بخش‌ها سخت باشن اما نویسنده تونسته با زبانی ساده مفاهیم پیچیده رو شرح بده. ممنونم از این منبع عالی.",
    blogTitle: "مفاهیم پیشرفته جاوااسکریپت",
    date: "2025-06-05",
    rating: 4,
    avatarSrc: "/images/user_1.webp",
  },
  {
    name: "مهناز صادقی",
    comment:
      "واقعا مفید بود. مخصوصا قسمت‌هایی که به نکات تجربی و مشکلات رایج اشاره کرده بود. این مطالب به من کمک کرد تو پروژه‌هام کمتر خطا داشته باشم و سرعت کارم بالا بره.داشته باشم و سرعت کارم بالا بره.داشته باشم و سرعت کارم بالا بره.داشته باشم و سرعت کارم بالا بره.داشته باشم و سرعت کارم بالا بره.",
    blogTitle: "راهنمای حل مشکلات رایج در React",
    date: "2025-05-30",
    rating: 1,
    avatarSrc: "/images/woman_3.webp",
  },
];

export default function BlogCommentsSlider() {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const windowWidth = useWindowWidth();
  const [mounted, setMounted] = useState(false);

  // Don't calculate slidesToShow until we have the actual window width
  const slidesToShow = windowWidth ? (windowWidth < 1024 ? 1 : 2) : 2;
  const totalSlides = comments.length;

  const settings = {
    dots: false,
    infinite: false,
    rtl: true,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    arrows: false,
    beforeChange: (_, next) => setCurrentSlide(next),
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Check if at start or end
  const isAtStart = currentSlide === 0;
  const isAtEnd = currentSlide >= totalSlides - slidesToShow;

  // Handle component mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Force slider refresh when component mounts or slidesToShow changes
  useEffect(() => {
    if (mounted && sliderRef.current && windowWidth) {
      const timer = setTimeout(() => {
        // Reset to first slide and refresh
        sliderRef.current.slickGoTo(0);
        setCurrentSlide(0);

        // Trigger a window resize event to force slider recalculation
        window.dispatchEvent(new Event("resize"));
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [mounted, slidesToShow, windowWidth]);

  // loading state
  if (!windowWidth) {
    return (
      <motion.section
        className="py-16 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-16">
            {/* Testimonials Cards Skeleton */}
            <motion.div
              className="lg:w-2/3 w-full"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="grid lg:grid-cols-2 gap-4">
                {[1, 2].map((item) => (
                  <motion.div
                    key={item}
                    className={`${item === 2 ? "hidden lg:block" : ""}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + item * 0.1 }}
                  >
                    <div className="relative overflow-hidden bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 min-h-[320px] flex flex-col justify-between">
                      <div className="animate-pulse">
                        <div className="flex items-center gap-1 mb-4">
                          <div className="w-5 h-5 bg-secondary-200 rounded"></div>
                          <div className="h-3 bg-secondary-200 rounded-full w-24"></div>
                        </div>

                        <div className="mb-6">
                          <div className="h-4 bg-secondary-200 rounded-full w-4/5 mb-2"></div>
                          <div className="h-4 bg-secondary-200 rounded-full w-3/4"></div>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="h-3 bg-secondary-200 rounded-full w-full"></div>
                          <div className="h-3 bg-secondary-200 rounded-full w-5/6"></div>
                          <div className="h-3 bg-secondary-200 rounded-full w-4/5"></div>
                          <div className="h-3 bg-secondary-200 rounded-full w-3/4"></div>
                        </div>
                      </div>

                      <div className="mt-auto pt-4 border-t-2 border-secondary-200">
                        <div className="animate-pulse flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-secondary-200 rounded-full"></div>
                            <div className="flex flex-col gap-1">
                              <div className="h-3 bg-secondary-200 rounded-full w-20"></div>
                              <div className="h-2 bg-secondary-200 rounded-full w-16"></div>
                            </div>
                          </div>

                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className="w-5 h-5 bg-secondary-200 rounded-sm"
                              ></div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div
                        className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        style={{ animationDelay: `${item * 0.3}s` }}
                      ></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Header Section */}
            <motion.div
              className="lg:w-1/3 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-right"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              <div className="relative mb-4">
                <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-secondary-900 opacity-90">
                  نظرات کاربران
                </h2>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-secondary-100/20 to-transparent animate-pulse rounded-lg"></div>
              </div>

              <p className="text-secondary-400 text-sm sm:text-base leading-relaxed font-medium mb-6 max-w-md opacity-80">
                بخشی از بازخورد کاربران درباره مقالات آموزشی
              </p>

              <div className="flex gap-4 mb-4">
                <div className="w-10 h-10 bg-secondary-200 rounded-full animate-pulse"></div>
                <div className="w-10 h-10 bg-secondary-200 rounded-full animate-pulse"></div>
              </div>

              <div className="flex items-center gap-2 text-secondary-400 text-sm">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-secondary-300 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-secondary-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-secondary-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="opacity-60">در حال بارگذاری...</span>
              </div>
            </motion.div>
          </div>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            0% {
              transform: translateX(-100%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </motion.section>
    );
  }

  return (
    <motion.section
      className="py-16 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col-reverse lg:flex-row justify-between gap-10 lg:gap-16">
          {/* Right Section - Slider */}
          <motion.div
            className="lg:w-2/3 w-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Slider
              {...settings}
              key={`slider-${slidesToShow}`}
              ref={sliderRef}
              className="[&_.slick-slide]:px-2 [&_.slick-list]:-mx-2 rtl-slider"
            >
              {comments.map(
                ({ name, comment, blogTitle, date, rating, avatarSrc }, i) => (
                  <div key={i} className="px-2 py-4">
                    <motion.div
                      className="bg-secondary-0 rounded-2xl p-6 flex flex-col justify-between min-h-[320px] shadow-[0_2px_6px_rgba(0,0,0,0.05),0_8px_20px_rgba(0,0,0,0.08)] transition-shadow duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06),0_12px_28px_rgba(0,0,0,0.1)]"
                      whileHover={{
                        y: -4,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <div>
                        <div className="flex items-center text-green-600 font-medium mb-4 text-sm gap-1">
                          <HandThumbUpIcon className="w-5 h-5" />
                          <span>پیشنهاد می‌کنم</span>
                        </div>
                        <h3 className="text-secondary-800 font-bold text-base mb-6">
                          {blogTitle}
                        </h3>
                        <p className="text-secondary-400 text-sm leading-6 mb-4 line-clamp-4 overflow-y-auto font-medium">
                          {comment}
                        </p>
                      </div>

                      <div className="mt-auto pt-4 border-t-2 border-secondary-300 flex items-center justify-between">
                        <div className="flex items-center text-xs text-secondary-700">
                          <Avatar src={avatarSrc} width={32} />
                          <div className="flex flex-col">
                            <span className="font-semibold text-secondary-900">
                              {name}
                            </span>
                            <span className="text-xs mt-1 text-secondary-400">
                              {toLocalDateShort(date)}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, index) =>
                            index < rating ? (
                              <StarSolid
                                key={index}
                                className="w-5 h-5 text-yellow-400"
                              />
                            ) : (
                              <StarOutline
                                key={index}
                                className="w-5 h-5 text-yellow-300"
                              />
                            )
                          )}
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )
              )}
            </Slider>
          </motion.div>

          {/* Left Section */}
          <motion.div
            className="lg:w-1/3 w-full flex flex-col justify-center items-center lg:items-start text-center lg:text-right"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <motion.h2
              className="text-2xl sm:text-3xl xl:text-4xl font-black text-secondary-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              نظرات کاربران
            </motion.h2>
            <motion.p
              className="text-secondary-400 text-sm sm:text-base leading-relaxed font-medium mb-6 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              بخشی از بازخورد کاربران درباره مقالات آموزشی
            </motion.p>
            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <motion.button
                onClick={() => sliderRef.current?.slickNext()}
                disabled={isAtEnd}
                className={`p-2 rounded-full shadow-md transition ${
                  isAtEnd
                    ? "bg-secondary-300 cursor-not-allowed"
                    : "bg-primary-900 hover:bg-primary-700"
                }`}
                whileHover={!isAtEnd ? { scale: 1.05 } : {}}
                whileTap={!isAtEnd ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
              >
                <ChevronRightIcon className="w-6 h-6 text-white" />
              </motion.button>
              <motion.button
                onClick={() => sliderRef.current?.slickPrev()}
                disabled={isAtStart}
                className={`p-2 rounded-full shadow-md transition ${
                  isAtStart
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-primary-900 hover:bg-primary-700"
                }`}
                whileHover={!isAtStart ? { scale: 1.05 } : {}}
                whileTap={!isAtStart ? { scale: 0.95 } : {}}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeftIcon className="w-6 h-6 text-white" />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
