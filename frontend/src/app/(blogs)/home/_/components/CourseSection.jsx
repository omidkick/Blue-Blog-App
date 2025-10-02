"use client";

// Imports
import { motion } from "framer-motion";
import Slider from "react-slick";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useInView } from "react-intersection-observer";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import Button from "@/ui/Button";

const courses = [
  {
    id: 1,
    title: "مقدمه‌ای بر بلاگ‌نویسی",
    description: "یاد بگیر چطور بلاگ خودتو راه بندازی و شروع کنی.",
    image: "/images/blog-course-1.png",
  },
  {
    id: 2,
    title: "تسلط بر تولید محتوا",
    description: "بهبود نوشتار، روایت‌گری و ساختار محتوایی.",
    image: "/images/blog-course-2.png",
  },
  {
    id: 3,
    title: "سئو برای بلاگرها",
    description: "نکات سئو برای رتبه گرفتن مطالب تو گوگل.",
    image: "/images/blog-course-3.png",
  },
  {
    id: 4,
    title: "کسب درآمد از بلاگ",
    description: "درآمدزایی از طریق تبلیغات، همکاری و فروش محتوا.",
    image: "/images/blog-course-4.png",
  },
];

// Custom Arrows
const PrevArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="قبلی"
    className="absolute -right-6 top-1/2 -translate-y-1/2 bg-primary-900 hover:bg-primary-800 text-white p-2 rounded-full shadow-lg z-10"
  >
    <ChevronRightIcon className="w-5 h-5" />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="بعدی"
    className="absolute -left-6 top-1/2 -translate-y-1/2 bg-primary-900 hover:bg-primary-800 text-white p-2 rounded-full shadow-lg z-10"
  >
    <ChevronLeftIcon className="w-5 h-5" />
  </button>
);

export default function CourseSlider() {
  const isDesktop = useIsDesktop();

  const settings = {
    rtl: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    pauseOnHover: true,
    centerMode: true,
    centerPadding: "0px",
    beforeChange: (current, next) => {
      if (document.activeElement instanceof HTMLElement) {
        document.activeElement.blur();
      }
    },
  };

  // Animation variants
  const textVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const sliderVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 1, ease: "easeOut" },
    },
  };

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { ref: sliderRef, inView: sliderInView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <section className="py-12 px-4 sm:px-8 overflow-x-hidden" dir="rtl">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-8 md:gap-16">
        {/* Text Section */}
        {isDesktop ? (
          <motion.div
            ref={textRef}
            className="text-right md:w-1/2 space-y-4"
            variants={textVariants}
            initial="hidden"
            animate={textInView ? "visible" : "hidden"}
          >
            <h2 className="text-2xl sm:text-3xl font-black text-secondary-900 mb-2">
              دوره‌های آموزشی بلو بلاگ
            </h2>
            <p className="text-secondary-400 text-sm sm:text-base leading-relaxed font-medium">
              این دوره‌ها بهت کمک می‌کنن که نوشتن بلاگ رو از پایه یاد بگیری و
              توش حرفه‌ای بشی.
            </p>
          </motion.div>
        ) : (
          <div ref={textRef} className="text-right md:w-1/2 space-y-4">
            <h2 className="text-2xl sm:text-3xl xl:text-4xl font-black text-secondary-900">
              دوره‌های آموزشی بلو بلاگ
            </h2>
            <p className="text-secondary-400 text-sm sm:text-base leading-relaxed font-medium">
              این دوره‌ها بهت کمک می‌کنن که نوشتن بلاگ رو از پایه یاد بگیری و
              توش حرفه‌ای بشی.
            </p>
          </div>
        )}

        {/* Slider Section */}

        {
          // In Desktop Screens
          isDesktop ? (
            <motion.div
              ref={sliderRef}
              className="relative w-full max-w-72 lg:max-w-sm xl:max-w-xl md:w-1/2 h-auto"
              variants={sliderVariants}
              initial="hidden"
              animate={sliderInView ? "visible" : "hidden"}
            >
              <div className="shadow-card-md absolute inset-0 bg-secondary-100 rounded-2xl shadow-md" />
              <Slider {...settings} className="relative z-10 rtl-slider">
                {courses.map(({ id, title, description, image }) => (
                  <div
                    key={id}
                    className="flex flex-col items-center justify-center p-4 text-center"
                    tabIndex={-1}
                  >
                    <img
                      src={image}
                      alt={title}
                      className="block mx-auto w-48 h-48 object-contain mb-4"
                    />
                    <h3 className="text-lg font-bold text-primary-900 mb-3">
                      {title}
                    </h3>
                    <p className="text-sm text-secondary-400 font-medium">
                      {description}
                    </p>
                    <Button
                      onClick={() => {}}
                      className="mt-3 w-full max-w-[140px] py-2 text-sm"
                    >
                      ثبت‌نام
                    </Button>
                  </div>
                ))}
              </Slider>
            </motion.div>
          ) : (
            // In Mobile  Screens
            <div
              ref={sliderRef}
              className="relative w-full max-w-72 lg:max-w-sm xl:max-w-xl md:w-1/2 h-auto"
            >
              <div className="absolute inset-0 bg-secondary-100 rounded-2xl shadow-md z-0" />
              <Slider
                {...settings}
                className="shadow-card-md relative z-10 rtl-slider"
              >
                {courses.map(({ id, title, description, image }) => (
                  <div
                    key={id}
                    className="flex flex-col items-center justify-center p-4 text-center"
                    tabIndex={-1}
                  >
                    <img
                      src={image}
                      alt={title}
                      className="block mx-auto w-48 h-48 object-contain mb-4"
                    />
                    <h3 className="text-lg font-bold text-primary-900 mb-3">
                      {title}
                    </h3>
                    <p className="text-xs text-secondary-400 font-medium">
                      {description}
                    </p>
                    <Button
                      onClick={() => {}}
                      className="mt-3 w-full max-w-[140px] py-2 text-sm"
                    >
                      ثبت‌نام
                    </Button>
                  </div>
                ))}
              </Slider>
            </div>
          )
        }
      </div>
    </section>
  );
}
