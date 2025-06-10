"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { CheckIcon } from "@heroicons/react/20/solid";

function PersonalBlogSection() {
  const { ref, inView } = useInView({
    triggerOnce: true, // Trigger animation only once
    threshold: 0.2, // Trigger animation when 20% of the section is visible
  });

  // Variants for section animation
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: "easeInOut" },
    },
  };

  // Variants for individual item animations
  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={sectionVariants}
      className="py-6 lg:py-10 px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-8 mb-8 lg:mb-12 gap-y-16"
    >
      {/* Right Section (Image) */}
      <motion.div
        className="flex-1"
        initial={{ scale: 0.8 }}
        animate={{ scale: inView ? 1 : 0.8 }}
        transition={{ duration: 1 }}
      >
        <img
          src="/images/laptop2.png"
          alt="Personal Blog Illustration"
          className="w-full max-w-xs sm:max-w-sm md:max-w-md"
        />
      </motion.div>

      {/* Left Section (Info about Benefits) */}
      <motion.div
        className="flex-1 space-y-6 text-right md:pr-8"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={itemVariants}
      >
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary-900 leading-tight"
          variants={itemVariants}
        >
          چرا داشتن وبلاگ شخصی مهم است؟
        </motion.h2>

        {/* Intro Paragraph */}
        <motion.p
          className="text-base md:text-lg text-secondary-700 leading-relaxed"
          variants={itemVariants}
        >
          وبلاگ شخصی به شما این امکان را می‌دهد تا صدای خود را در دنیای آنلاین
          به اشتراک بگذارید و به عنوان یک
          <span className="text-primary-700 font-semibold"> متخصص </span>
          در حوزه خود شناخته شوید. این وبلاگ می‌تواند محلی برای معرفی نظرات،
          تجربیات یا حتی پروژه‌های شما باشد.
        </motion.p>

        {/* Bullet List */}
        <motion.ul
          className="space-y-3 text-secondary-700 text-base md:text-lg"
          variants={itemVariants}
        >
          <li className="flex items-start gap-2">
            <CheckIcon className="w-6 h-6 text-primary-900" />
            <span>ساخت شبکه و ایجاد ارتباطات جدید</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-6 h-6 text-primary-900" />
            <span>تقویت مهارت‌های نوشتاری و تحلیل</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-6 h-6 text-primary-900" />
            <span>فرصت‌های شغلی و ایجاد برند شخصی</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckIcon className="w-6 h-6 text-primary-900" />
            <span>مستندسازی تجربیات و اشتراک دانش</span>
          </li>
        </motion.ul>

        {/* Call to Action Paragraph */}
        <motion.p
          className="text-base md:text-lg text-secondary-700 leading-relaxed bg-primary-50 p-4 rounded-xl shadow-sm"
          variants={itemVariants}
        >
          اگر به دنبال فرصتی برای به اشتراک گذاشتن افکار و تجربیات خود هستید،{" "}
          <span className="text-primary-800 font-semibold">
            راه اندازی وبلاگ شخصی
          </span>{" "}
          بهترین گزینه است.
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default PersonalBlogSection;
