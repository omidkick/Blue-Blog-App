"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import useOutsideClick from "@/hooks/useOutsideClick";
import { useInView } from "react-intersection-observer";

const faqData = [
  {
    question: "چطور در سایت ثبت‌نام کنم؟",
    answer:
      "برای ثبت‌نام، وارد صفحه ثبت‌نام شوید و اطلاعات خود را وارد کنید...",
  },
  {
    question: "آیا می‌توانم بلاگ خودم را بنویسم؟",
    answer:
      "بله، بعد از ورود به حساب کاربری، از داشبورد گزینه «ایجاد بلاگ» را انتخاب کنید.",
  },
  {
    question: "چگونه بلاگ‌های محبوب را پیدا کنم؟",
    answer:
      "شما می‌توانید از بخش «بلاگ‌های محبوب» در صفحه اصلی استفاده کنید...",
  },
  {
    question: "آیا می‌توانم بلاگ‌های دیگران را لایک یا ذخیره کنم؟",
    answer: "بله، با کلیک روی آیکون قلب می‌توانید بلاگ‌ها را لایک کنید...",
  },
  {
    question: "چگونه پروفایل خودم را ویرایش کنم؟",
    answer:
      "از منوی کاربری خود وارد بخش «پروفایل من» شوید و اطلاعات را ویرایش کنید.",
  },
];

// Professional easing curves
const dramaticEase = [0.25, 0.46, 0.45, 0.94];
const smoothEase = [0.25, 0.1, 0.25, 1];
const bounceEase = [0.34, 1.56, 0.64, 1];

// title animation with dramatic entrance
const titleVariants = {
  hidden: {
    opacity: 0,
    y: -60,
    x: -30,
    scale: 0.8,
    filter: "blur(10px)",
    rotateX: -25,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    rotateX: 0,
    transition: {
      duration: 1,
      ease: dramaticEase,
      staggerChildren: 0.3,
    },
  },
};

// Child animations for title elements
const titleChildVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    x: -20,
    filter: "blur(5px)",
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

// accordion container animation
const accordionContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 80,
    rotateY: -15,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateY: 0,
    transition: {
      duration: 0.9,
      ease: dramaticEase,
      delay: 0.6,
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

// Individual FAQ item animation
const faqItemVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    x: -20,
    scale: 0.85,
    rotateX: -20,
    filter: "blur(5px)",
  },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: smoothEase,
      delay: index * 0.08,
      type: "spring",
      stiffness: 120,
      damping: 15,
    },
  }),
};

// hover animations
// const itemHoverVariants = {
//   hover: {
//     scale: 1.02,
//     y: -2,
//     rotateY: 1,
//     transition: {
//       duration: 0.1,
//       ease: smoothEase,
//     },
//   },
//   tap: {
//     scale: 0.98,
//     transition: {
//       duration: 0.1,
//     },
//   },
// };

// chevron animation
const chevronVariants = {
  closed: {
    rotate: 0,
    scale: 1,
    filter: "blur(0px)",
  },
  open: {
    rotate: 180,
    scale: 1.15,
    filter: "blur(0px)",
    transition: {
      duration: 0.4,
      ease: bounceEase,
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
  hover: {
    scale: 1.2,
    rotate: 15,
    transition: {
      duration: 0.2,
      ease: smoothEase,
    },
  },
};

// content animation
const contentVariants = {
  open: {
    height: "auto",
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      height: {
        duration: 0.4,
        ease: dramaticEase,
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
      scale: {
        duration: 0.3,
        delay: 0.05,
      },
    },
  },
  collapsed: {
    height: 0,
    opacity: 0,
    scale: 0.95,
    filter: "blur(2px)",
    transition: {
      height: {
        duration: 0.3,
        ease: smoothEase,
      },
      opacity: {
        duration: 0.15,
      },
      scale: {
        duration: 0.2,
      },
    },
  },
};

// Content text animation
const textContentVariants = {
  hidden: {
    y: -15,
    opacity: 0,
    scale: 0.95,
    filter: "blur(3px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.1,
      duration: 0.4,
      ease: smoothEase,
    },
  },
};

export default function FAQSection() {
  const isDesktop = useIsDesktop();
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useOutsideClick(() => setOpenIndex(null));

  // Single ref for the entire section
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section
      ref={sectionRef}
      dir="rtl"
      className="py-10 lg:py-16 px-4 sm:px-6 md:px-8 mx-auto overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 lg:gap-x-14">
        {/* Title */}
        <motion.div
          variants={titleVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="lg:w-4/12 text-justify space-y-3 md:w-2/3 md:mx-auto"
        >
          <motion.h2
            variants={titleChildVariants}
            className="text-3xl lg:text-4xl font-black text-secondary-900"
          >
            سوالات متداول
          </motion.h2>
          <motion.p
            variants={titleChildVariants}
            className="text-sm lg:text-base text-secondary-400 font-medium leading-relaxed"
          >
            در این بخش به سوالاتی که کاربران به طور مکرر می‌پرسند پاسخ داده شده
            است. اگر سوالی دارید، ابتدا این بخش را بررسی کنید.
          </motion.p>
        </motion.div>

        {/* Accordion Items */}
        <motion.div
          variants={accordionContainerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
          className="lg:w-8/12 space-y-3 lg:px-6 md:w-2/3 md:mx-auto lg:max-w-2xl transform-gpu"
          ref={containerRef}
        >
          {faqData.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                custom={i}
                variants={faqItemVariants}
                initial="hidden"
                animate={sectionInView ? "visible" : "hidden"}
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.2, ease: "easeOut" },
                }}
                className={`rounded-xl transition-all duration-300 transform-gpu ${
                  isOpen
                    ? "bg-secondary-100 shadow-lg"
                    : "bg-secondary-0 shadow-sm"
                }`}
              >
                <motion.button
                  onClick={() => toggle(i)}
                  className={`flex items-center justify-between w-full py-4 px-5 text-right text-secondary-800 font-semibold text-sm lg:text-base ${
                    isOpen ? "bg-secondary-100" : "hover:bg-secondary-100"
                  } rounded-xl transition-colors duration-200`}
                  whileHover={{
                    backgroundColor: isOpen ? undefined : "rgba(0,0,0,0.02)",
                  }}
                >
                  <span className="text-secondary-700">{item.question}</span>
                  <motion.div
                    variants={chevronVariants}
                    animate={isOpen ? "open" : "closed"}
                    whileHover={isDesktop && !isOpen ? "hover" : {}}
                    className="transform-gpu"
                  >
                    <ChevronDownIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary-500" />
                  </motion.div>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={contentVariants}
                      className="overflow-hidden px-5 text-secondary-500 text-sm leading-relaxed transform-gpu"
                    >
                      <motion.div
                        variants={textContentVariants}
                        initial="hidden"
                        animate="visible"
                        className="pb-5 pt-4 border-t border-primary-900"
                      >
                        {item.answer}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
