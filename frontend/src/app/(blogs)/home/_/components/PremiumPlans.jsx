"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FaCheckCircle } from "react-icons/fa";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";

// smooth easing curves
const smoothEase = [0.25, 0.1, 0.25, 1];
const bounceEase = [0.34, 1.56, 0.64, 1];
const dramaticEase = [0.25, 0.46, 0.45, 0.94];

// heading animation with dramatic entrance
const headingVariants = {
  hidden: {
    opacity: 0,
    y: -60,
    scale: 0.8,
    filter: "blur(15px)",
    rotateX: -45,
  },
  visible: {
    opacity: 1,
    y: 0,
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

// Child animations for heading elements
const headingChildVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    x: -20,
    filter: "blur(5px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: smoothEase,
    },
  },
};

// container for dramatic staggered card animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.8, // Wait for heading to finish
    },
  },
};

// card animations with 3D perspective and dramatic entrance
const cardVariants = {
  hidden: {
    opacity: 0,
    y: 100,
    scale: 0.7,
    rotateX: -45,
    rotateY: 15,
    filter: "blur(10px)",
    transformPerspective: 1000,
  },
  visible: (isFeatured) => ({
    opacity: 1,
    y: 0,
    scale: isFeatured ? 1.1 : 1,
    rotateX: 0,
    rotateY: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: isFeatured ? bounceEase : dramaticEase,
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  }),
};

// hover animations
const cardHoverVariants = {
  hover: (isFeatured) => ({
    y: isFeatured ? -15 : -10,
    scale: isFeatured ? 1.13 : 1.02,
    rotateY: isFeatured ? 2 : 1,
    transition: {
      duration: 0.4,
      ease: smoothEase,
    },
  }),
};

// Feature list animations with wave effect
const featureVariants = {
  hidden: {
    opacity: 0,
    x: -30,
    scale: 0.8,
    filter: "blur(3px)",
  },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.5,
      ease: smoothEase,
      delay: index * 0.08,
    },
  }),
};

// check icon animation
const checkIconVariants = {
  hidden: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  visible: (delay) => ({
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: {
      delay: delay,
      duration: 0.4,
      ease: bounceEase,
      type: "spring",
      stiffness: 300,
      damping: 15,
    },
  }),
};

// Pricing animation with bounce
const pricingVariants = {
  hidden: {
    opacity: 0,
    scale: 0.5,
    y: 30,
    filter: "blur(5px)",
  },
  visible: (delay) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      delay: delay,
      duration: 0.6,
      ease: bounceEase,
      type: "spring",
      stiffness: 200,
      damping: 12,
    },
  }),
};

// Button animation
const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.8,
    filter: "blur(3px)",
  },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: delay,
      duration: 0.5,
      ease: smoothEase,
    },
  }),
};

const plans = [
  {
    title: "پلن پایه",
    features: [
      "دسترسی محدود به مقالات",
      "نوشتن تا ۵ مقاله در ماه",
      "دریافت پشتیبانی عمومی",
      "مشاهده آمار بازدید مقالات",
      "ویرایش مقاله تا ۲ بار",
    ],
    price: "۹۹,۰۰۰ تومان",
    discountPrice: "۴۹,۰۰۰ تومان",
    bgColor: "bg-secondary-100",
  },
  {
    title: "پلن حرفه‌ای",
    features: [
      "دسترسی کامل به همه بلاگ‌ها",
      "نوشتن نامحدود بلاگ",
      "نشان تایید نویسنده",
      "پشتیبانی سریع",
      "امکان شخصی‌سازی بلاگ",
    ],
    price: "۱۹۹,۰۰۰ تومان",
    discountPrice: "۹۹,۰۰۰ تومان",
    isFeatured: true,
    bgColor: "bg-secondary-50",
  },
  {
    title: "پلن سازمانی",
    features: [
      "اکانت‌های تیمی",
      "مدیریت اعضای تیم",
      "گزارش‌گیری پیشرفته",
      "پشتیبانی اختصاصی",
      "ویرایش مقاله تا ۳۰ بار",
    ],
    price: "۳۹۹,۰۰۰ تومان",
    discountPrice: "۲۹۹,۰۰۰ تومان",
    bgColor: "bg-secondary-100",
  },
];

const PremiumPlans = () => {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  });

  const router = useRouter();

  return (
    <section
      ref={ref}
      dir="rtl"
      className="px-4 md:px-10 lg:px-20 text-secondary-800 py-12 overflow-hidden perspective-1000"
    >
      {/* animated heading */}
      <motion.div
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={inView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : headingVariants}
        className="max-w-5xl mx-auto text-center mb-12 md:mb-20"
      >
        <motion.h2
          variants={headingChildVariants}
          className="text-3xl md:text-4xl font-black text-secondary-900 mb-4"
        >
          اشتراک ویژه بلو بلاگ
        </motion.h2>
        <motion.p
          variants={headingChildVariants}
          className="text-base md:text-lg text-secondary-400"
        >
          برای امکانات حرفه‌ای‌تر و تجربه‌ای بهتر از نوشتن، یکی از پلن‌های زیر
          را انتخاب کن.
        </motion.p>
      </motion.div>

      {/* cards container */}
      <motion.div
        initial={prefersReducedMotion ? "visible" : "hidden"}
        animate={inView ? "visible" : "hidden"}
        variants={prefersReducedMotion ? {} : containerVariants}
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 gap-y-12 max-w-6xl mx-auto"
        style={{ perspective: "1000px" }}
      >
        {plans.map((plan, index) => (
          <div key={index} className="relative flex justify-center">
            <motion.div
              custom={plan.isFeatured}
              variants={prefersReducedMotion ? {} : cardVariants}
              whileHover={
                prefersReducedMotion
                  ? {}
                  : { ...cardHoverVariants.hover(plan.isFeatured) }
              }
              className="transform-gpu preserve-3d"
            >
              <motion.div
                variants={prefersReducedMotion ? {} : cardHoverVariants}
                className={`shadow-card w-72 lg:w-[250px] xl:w-[300px] rounded-2xl border shadow-lg
                  flex flex-col justify-between backdrop-blur-sm transform-gpu
                  ${plan.bgColor} 
                  ${
                    plan.isFeatured
                      ? " border-primary-500 border-2 shadow-primary-200/50"
                      : "border-secondary-200 shadow-secondary-200/30"
                  }
                  transition-all duration-300 ease-out
                `}
              >
                {/* plan title */}
                <motion.div
                  initial={
                    prefersReducedMotion
                      ? {}
                      : { opacity: 0, y: 20, filter: "blur(5px)" }
                  }
                  animate={
                    inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}
                  }
                  transition={{
                    delay: 1 + index * 0.15,
                    duration: 0.6,
                    ease: smoothEase,
                  }}
                  className={`px-6 py-6 text-center font-bold text-lg md:text-2xl rounded-t-2xl
                    ${
                      plan.isFeatured
                        ? "text-primary-900"
                        : "text-secondary-700"
                    }`}
                >
                  {plan.title}
                </motion.div>

                {/* features list */}
                <div className="px-6 py-4 space-y-3">
                  {plan.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      custom={i}
                      initial={prefersReducedMotion ? "visible" : "hidden"}
                      animate={inView ? "visible" : "hidden"}
                      variants={prefersReducedMotion ? {} : featureVariants}
                      className="flex items-center gap-2 text-secondary-500 text-sm md:text-base"
                    >
                      <motion.div
                        custom={1.2 + index * 0.15 + i * 0.05}
                        initial={prefersReducedMotion ? "visible" : "hidden"}
                        animate={inView ? "visible" : "hidden"}
                        variants={prefersReducedMotion ? {} : checkIconVariants}
                      >
                        <FaCheckCircle className="text-success flex-shrink-0" />
                      </motion.div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* pricing */}
                <motion.div
                  custom={1.4 + index * 0.15}
                  initial={prefersReducedMotion ? "visible" : "hidden"}
                  animate={inView ? "visible" : "hidden"}
                  variants={prefersReducedMotion ? {} : pricingVariants}
                  className="text-center mt-4 mb-2"
                >
                  <p className="text-sm text-secondary-400 line-through">
                    {plan.price}
                  </p>
                  <p className="text-lg md:text-xl font-extrabold text-red-500">
                    {plan.discountPrice}
                  </p>
                </motion.div>

                {/* CTA Button */}
                <motion.div
                  custom={1.6 + index * 0.15}
                  initial={prefersReducedMotion ? "visible" : "hidden"}
                  animate={inView ? "visible" : "hidden"}
                  variants={prefersReducedMotion ? {} : buttonVariants}
                  className="px-6 pb-6 mt-2"
                >
                  <motion.div
                    whileHover={
                      prefersReducedMotion ? {} : { scale: 1.05, y: -2 }
                    }
                    whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                    transition={{ duration: 0.2, ease: smoothEase }}
                  >
                    <Button
                      className="w-full transform transition-all duration-200"
                      variant={plan.isFeatured ? "primary" : "outline"}
                      onClick={() => router.push("/home")}
                    >
                      ثبت‌نام
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default PremiumPlans;
