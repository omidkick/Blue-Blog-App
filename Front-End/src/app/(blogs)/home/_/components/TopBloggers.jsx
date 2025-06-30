"use client";

// Imports
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { DocumentTextIcon } from "@heroicons/react/24/solid";
import { useInView } from "react-intersection-observer";
import { toPersianDigits } from "@/utils/numberFormatter";

// Blogger's Data
const staticBloggers = [
  {
    _id: "1",
    name: "علی رضایی",
    avatarUrl: "/images/user_2.png",
    postCount: 12,
  },
  {
    _id: "2",
    name: "زهرا احمدی",
    avatarUrl: "/images/woman_1.webp",
    postCount: 9,
  },
  {
    _id: "3",
    name: "محمد حسینی",
    avatarUrl: "/images/user_3.png",
    postCount: 7,
  },
  {
    _id: "4",
    name: "نگار موسوی",
    avatarUrl: "/images/woman_2.webp",
    postCount: 5,
  },
  {
    _id: "5",
    name: "سارا کاظمی",
    avatarUrl: "/images/woman_3.webp",
    postCount: 3,
  },
];

// animation variants
const titleVariants = {
  hidden: {
    opacity: 0,
    y: -50,
    scale: 0.8,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic bezier
      staggerChildren: 0.2,
    },
  },
};

const titleChildVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    x: -20,
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const sliderContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.7,
    y: 100,
    rotateX: -45,
    transformPerspective: 1000,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 1,
      delay: 0.6,
      ease: [0.23, 1, 0.32, 1],
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.85,
    rotate: -10,
    filter: "blur(5px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.85,
    rotate: 10,
    filter: "blur(5px)",
    transition: {
      duration: 0.4,
      ease: "easeIn",
    },
  },
};

const dotVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "backOut",
      delay: 0.1,
    },
  },
};

export default function TopBloggers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentBlogger = staticBloggers[currentIndex];

  // Separate refs for sequential animation
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section
      ref={sectionRef}
      className="w-full max-w-5xl mx-auto px-6 py-12 flex flex-col md:flex-row-reverse md:items-center md:gap-x-16 gap-y-10"
    >
      {/* Title and description */}
      <motion.div
        variants={titleVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        className="flex-1 md:max-w-md text-center md:text-right"
      >
        <motion.h2
          variants={titleChildVariants}
          className="text-4xl font-black text-secondary-900 mb-4 leading-tight"
        >
          برترین بلاگرها
        </motion.h2>

        <motion.p
          variants={titleChildVariants}
          className="text-secondary-400 font-medium text-sm md:text-base mb-6 leading-relaxed"
        >
          معرفی بهترین بلاگرهای فعال با بیشترین تعداد پست‌ها. همراه ما باشید و
          از مطالب جذابشان بهره ببرید!
        </motion.p>
      </motion.div>

      {/* Blogger slider */}
      <motion.div
        variants={sliderContainerVariants}
        initial="hidden"
        animate={sectionInView ? "visible" : "hidden"}
        className="flex-1 max-w-lg mx-auto md:mx-0"
      >
        <motion.div className="perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentBlogger._id}
              variants={cardVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="bg-secondary-100 rounded-2xl shadow-card p-6 md:p-8 flex flex-col items-center gap-6 md:gap-8 transform-gpu"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="relative w-24 md:w-32 h-24 md:h-32 rounded-full overflow-hidden border-2 border-primary-700 shadow-lg"
              >
                <Image
                  src={currentBlogger.avatarUrl}
                  alt={currentBlogger.name}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-center space-y-3 md:space-y-4"
              >
                <h3 className="text-lg md:text-2xl font-semibold text-primary">
                  {currentBlogger.name}
                </h3>
                <p className="text-sm text-secondary-700 dark:text-secondary-400 flex items-center justify-center gap-1.5">
                  <DocumentTextIcon className="w-4 md:w-5 h-4 md:h-5 text-primary-900" />
                  تعداد پست‌ها:{" "}
                  <span className="font-medium text-primary-900">
                    {toPersianDigits(currentBlogger.postCount)}
                  </span>
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Navigation dots */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex items-center justify-center mt-6 md:mt-8 gap-3 md:gap-5"
        >
          {staticBloggers.map((_, i) => (
            <motion.button
              key={i}
              variants={dotVariants}
              initial="hidden"
              animate={sectionInView ? "visible" : "hidden"}
              transition={{ delay: 1.3 + i * 0.1 }}
              onClick={() => setCurrentIndex(i)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`w-2.5 md:w-3 h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                currentIndex === i
                  ? "bg-primary-900 scale-125 md:scale-150 shadow-lg"
                  : "bg-secondary-300 hover:bg-secondary-400"
              }`}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
