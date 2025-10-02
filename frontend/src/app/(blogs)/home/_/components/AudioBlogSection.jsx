"use client";

import truncateText from "@/utils/trancateText";
import { delay, motion } from "framer-motion";
import { useState } from "react";

const audioBlogs = [
  {
    id: 1,
    title: "۵ روش برای نوشتن بهتر",
    desc: "در این قسمت به نکاتی می‌پردازیم که نوشتن مقالات را برای شما آسان‌تر می‌کند.",
    author: "علی رضایی",
    duration: "۱۲:۳۲",
    avatar: "/images/user_2.png",
  },
  {
    id: 2,
    title: "ساخت بلاگ شخصی موفق",
    desc: "چطور بلاگی بسازیم که بازدیدکنندگان آن را فراموش نکنند؟ در این قسمت بررسی می‌کنیم.",
    author: "نگار موسوی",
    duration: "۹:۴۵",
    avatar: "/images/woman_2.webp",
  },
];

const AudioBlogSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation variants for sequential reveal
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3, 
        delayChildren: 0.1,
      },
    },
  };

  const titleVariants = {
    hidden: {
      y: 50,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const badgeVariants = {
    hidden: {
      scale: 0,
      rotate: -180,
      opacity: 0,
    },
    visible: {
      scale: 1,
      rotate: 0,
      opacity: 1,
      transition: {
        delay: 0.4, 
        duration: 0.6,
        type: "spring",
        stiffness: 200,
      },
    },
  };

  const descriptionVariants = {
    hidden: {
      y: 30,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.2, 
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const cardVariants = {
    hidden: {
      y: 60,
      opacity: 0,
      scale: 0.9,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: [0.33, 1, 0.68, 1],
      },
    },
  };

  const cardHoverVariants = {
    rest: {
      scale: 1,
      y: 0,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    hover: {
      scale: 1.02,
      y: -2,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  const playButtonVariants = {
    idle: {
      scale: 1,
      rotate: 0,
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.95,
      transition: {
        duration: 0.1,
      },
    },
  };

  return (
    <motion.section
      className="px-4 sm:px-6 md:px-14 py-12 lg:py-14"
      dir="rtl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {/* Section Title with Animated Icon and Badge */}
      <div className="mb-8 lg:mb-10 text-justify space-y-3">
        <motion.h2
          variants={titleVariants}
          className="relative text-2xl sm:text-3xl font-black text-secondary-900 mb-2 inline-block"
        >
          <span className="inline-flex items-center gap-3">
            <span>پادکست‌های صوتی</span>
            <motion.span
              animate={{
                rotate: [0, -8, 8, -5, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "easeInOut",
                repeatDelay: 2,
              }}
              className="text-2xl sm:text-3xl"
            >
              🎧
            </motion.span>
          </span>

          <motion.span
            variants={badgeVariants}
            className="absolute -top-4 -left-6 text-xs bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 py-1 rounded-full shadow-lg"
          >
            <motion.span
              animate={{
                opacity: [1, 0.7, 1],
              }}
              transition={{
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut",
              }}
            >
              جدید
            </motion.span>
          </motion.span>
        </motion.h2>

        <motion.p
          variants={descriptionVariants}
          className="text-sm lg:text-base text-secondary-400 font-medium leading-relaxed"
        >
          مجموعه‌ای از پادکست‌های جذاب در موضوعات متنوع برای علاقه‌مندان به
          محتوای شنیداری.
        </motion.p>
      </div>

      {/* Audio Blog Cards */}
      <motion.div className="grid gap-6 md:grid-cols-2">
        {audioBlogs.map(
          ({ id, title, desc, author, duration, avatar }, index) => (
            <motion.div
              key={id}
              variants={cardVariants}
              onHoverStart={() => setHoveredCard(id)}
              onHoverEnd={() => setHoveredCard(null)}
              className="group relative rounded-2xl border border-secondary-200 p-5 bg-secondary-0 flex items-start gap-4 shadow-card overflow-hidden cursor-pointer"
            >
              {/* Subtle background gradient on hover */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-secondary-50/80 to-primary-600/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredCard === id ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />

              {/* Play Button */}
              <motion.button
                variants={playButtonVariants}
                initial="idle"
                animate={hoveredCard === id ? "hover" : "idle"}
                whileTap="tap"
                className="relative w-14 h-14 flex justify-center items-center bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-600 text-white rounded-full shrink-0 shadow-lg hover:shadow-xl transition-all duration-300 z-10 border-2 border-white/20"
              >
                {/* Audio Wave Icon */}
                <motion.div
                  animate={
                    hoveredCard === id
                      ? {
                          scale: [1, 1.1, 1],
                        }
                      : { scale: 1 }
                  }
                  transition={{
                    duration: 0.4,
                    repeat: hoveredCard === id ? Infinity : 0,
                    ease: "easeInOut",
                  }}
                  className="flex items-center justify-center"
                >
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-white"
                  >
                    <path
                      d="M8 5v14l11-7z"
                      fill="currentColor"
                      stroke="currentColor"
                      strokeWidth="1"
                      strokeLinejoin="round"
                    />
                    <motion.path
                      d="M3 12h2M3 8h1M3 16h1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      initial={{ opacity: 0.6 }} // Fix for the opacity warning
                      animate={
                        hoveredCard === id
                          ? {
                              opacity: [0.5, 1, 0.5],
                            }
                          : { opacity: 0.6 }
                      }
                      transition={{
                        duration: 1.2,
                        repeat: hoveredCard === id ? Infinity : 0,
                        ease: "easeInOut",
                      }}
                    />
                  </svg>
                </motion.div>

                {/* Primary Ripple */}
                <motion.div
                  className="absolute -inset-2 rounded-full border-2 border-primary-800/40"
                  animate={{
                    scale: hoveredCard === id ? [1, 1.8, 1] : [1, 1.3, 1],
                    opacity: [0.6, 0, 0.6],
                  }}
                  transition={{
                    duration: hoveredCard === id ? 1.8 : 2.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                />

                {/* Secondary Ripple */}
                <motion.div
                  className="absolute -inset-1 rounded-full border-2 border-primary-500/30"
                  animate={{
                    scale: hoveredCard === id ? [1, 1.5, 1] : [1, 1.2, 1],
                    opacity: [0.7, 0, 0.7],
                  }}
                  transition={{
                    duration: hoveredCard === id ? 1.5 : 2,
                    repeat: Infinity,
                    delay: 0.4,
                    ease: "easeOut",
                  }}
                />

                {/* Third Ripple - Only on Hover */}
                <motion.div
                  className="absolute -inset-3 rounded-full border-2 border-purple-400/20"
                  animate={
                    hoveredCard === id
                      ? {
                          scale: [1, 2.5, 1],
                          opacity: [0.5, 0, 0.5],
                        }
                      : { scale: 1, opacity: 0 }
                  }
                  transition={{
                    duration: 2.2,
                    repeat: hoveredCard === id ? Infinity : 0,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                />

                {/* Inner Glow */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/10"
                  animate={
                    hoveredCard === id
                      ? {
                          opacity: [0, 0.4, 0],
                        }
                      : {
                          opacity: [0, 0.2, 0],
                        }
                  }
                  transition={{
                    duration: hoveredCard === id ? 1.5 : 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.button>

              {/* Content */}
              <div className="flex-1 relative z-10">
                <h3 className="text-base sm:text-lg font-extrabold text-secondary-800 mb-2 leading-tight">
                  {title}
                </h3>

                <p className="text-sm font-medium text-secondary-500 mb-3 line-clamp-2 leading-relaxed">
                  {truncateText(desc, 70)}
                </p>

                <div className="flex items-center gap-3 text-xs text-secondary-500">
                  <img
                    src={avatar}
                    alt={author}
                    className="w-7 h-7 rounded-full object-cover border-2 border-secondary-200 shadow-sm"
                  />

                  <span className="font-bold">{author}</span>

                  <span className="text-secondary-400">•</span>

                  <span className="font-semibold text-blue-600">
                    {duration}
                  </span>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-0 h-0 border-r-[20px] border-t-[20px] border-r-transparent border-t-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          )
        )}
      </motion.div>
    </motion.section>
  );
};

export default AudioBlogSection;
