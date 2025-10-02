"use client";

import { HiPencilAlt, HiUserGroup, HiChartBar } from "react-icons/hi";
import { useEffect, useRef, useState } from "react";

const blogStats = [
  {
    icon: <HiPencilAlt className="text-primary-700 text-3xl" />,
    value: "۲۲۰ +",
    label: "مقالات منتشرشده",
  },
  {
    icon: <HiUserGroup className="text-primary-700 text-3xl" />,
    value: "۱۲۰۰ +",
    label: "اعضای فعال",
  },
  {
    icon: <HiChartBar className="text-primary-700 text-3xl" />,
    value: "۸۷ ٪ +",
    label: "درصد رشد بازدید",
  },
];

function BlogStatsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="md:py-4 px-4  rounded-2xl mt-4 md:mt-10 mb-16"
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Right: Title */}
        <div
          className={`flex flex-col items-start px-2 gap-1 mt-2 md:mb-4 fade-up-title text-justify space-y-3 ${
            isVisible ? "visible" : ""
          }`}
        >
          <h2 className="text-3xl lg:text-4xl font-black text-secondary-900">
            آمار بلو بلاگ
          </h2>
          <p className="text-sm lg:text-base text-secondary-400 font-medium leading-relaxed">
            آمار ها باعث افتخار ما هستند.
          </p>
        </div>

        {/* Left: Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6 gap-y-6 mt-4 md:mt-0 w-full md:w-2/3  max-w-4xl">
          {blogStats.map((stat, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center bg-secondary-0 p-6 rounded-xl shadow-md w-full text-center cursor-pointer card-hover fade-up stagger-${
                index + 1
              } ${isVisible ? "visible" : ""}`}
            >
              <div className="flex items-center gap-x-3">
                <span
                  className={`icon-rotate icon-bounce stagger-${index + 1} ${
                    isVisible ? "visible" : ""
                  }`}
                >
                  {stat.icon}
                </span>
                <span
                  className={`mt-2 text-2xl font-black text-secondary-700 value-slide stagger-${
                    index + 1
                  } ${isVisible ? "visible" : ""}`}
                >
                  {stat.value}
                </span>
              </div>
              <span
                className={`text-sm text-secondary-400 font-extrabold mt-4 label-fade stagger-${
                  index + 1
                } ${isVisible ? "visible" : ""}`}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogStatsSection;
