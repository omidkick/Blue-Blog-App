"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckIcon } from "@heroicons/react/20/solid";
import { useIsDesktop } from "@/hooks/useIsDesktop";

function PersonalBlogSection() {
  const isDesktop = useIsDesktop();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const imageVariants = {
    hidden: { 
      opacity: 0, 
      x: isDesktop ? 60 : 0,
      y: isDesktop ? 0 : 40,
      scale: 0.9,
      rotate: isDesktop ? 5 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1.2,
      },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      x: isDesktop ? -60 : 0,
      y: isDesktop ? 0 : 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 18,
        duration: 1,
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const textItemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      x: isDesktop ? -20 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const listItemVariants = {
    hidden: { 
      opacity: 0, 
      x: -30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 12,
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className="py-6 lg:py-10 px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-8 mb-8 lg:mb-12 gap-y-16"
    >
      {/* Right Section (Image) */}
      <motion.div className="flex-1" variants={imageVariants}>
        <motion.img
          src="/images/laptop2.png"
          alt="Personal Blog Illustration"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
        />
      </motion.div>

      {/* Left Section (Info about Benefits) */}
      <motion.div
        className="flex-1 space-y-6 text-right md:pr-8"
        variants={contentVariants}
      >
        {/* Heading */}
        <motion.h2
          className="text-2xl sm:text-3xl font-black text-secondary-900 mb-2 inline-block"
          variants={textItemVariants}
        >
          چرا داشتن وبلاگ شخصی مهم است؟
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          className="text-sm lg:text-base text-secondary-400 font-medium leading-relaxed"
          variants={textItemVariants}
        >
          وبلاگ شخصی به شما این امکان را می‌دهد تا صدای خود را در دنیای آنلاین
          به اشتراک بگذارید و به عنوان یک
          <motion.span className="text-primary-700 font-semibold">
            {" "}متخصص{" "}
          </motion.span>
          در حوزه خود شناخته شوید. این وبلاگ می‌تواند محلی برای معرفی نظرات،
          تجربیات یا حتی پروژه‌های شما باشد.
        </motion.p>

        {/* Bullet List */}
        <motion.div variants={textItemVariants}>
          <motion.ul className="space-y-3 text-secondary-500 text-sm">
            {[
              "ساخت شبکه و ایجاد ارتباطات جدید",
              "تقویت مهارت‌های نوشتاری و تحلیل", 
              "فرصت‌های شغلی و ایجاد برند شخصی",
              "مستندسازی تجربیات و اشتراک دانش"
            ].map((item, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-2"
                variants={listItemVariants}
                custom={index}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -180 }}
                  transition={{ 
                    delay: 0.8 + (index * 0.1),
                    type: "spring",
                    stiffness: 200,
                    damping: 15
                  }}
                >
                  <CheckIcon className="w-4 h-4 text-primary-900" />
                </motion.div>
                <span>{item}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Call to Action Paragraph */}
        <motion.p
          className="text-secondary-400 leading-relaxed p-4 rounded-xl"
          variants={textItemVariants}
        >
          اگر به دنبال فرصتی برای به اشتراک گذاشتن افکار و تجربیات خود هستید،{" "}
          <motion.span className="text-primary-800 font-semibold">
            راه اندازی وبلاگ شخصی
          </motion.span>{" "}
          بهترین گزینه است.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default PersonalBlogSection;
