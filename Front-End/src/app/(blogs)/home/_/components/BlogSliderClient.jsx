"use client";

// Imports
import { useRef, useEffect, useState } from "react";
import { motion, useMotionValue, useAnimationFrame } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  ChatBubbleLeftEllipsisIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";
import Author from "@/app/(blogs)/blogs/_components/Author";
import CoverImage from "@/app/(blogs)/blogs/_components/CoverImage";
import ButtonIcon from "@/ui/ButtonIcon";
import { toPersianDigits } from "@/utils/numberFormatter";
import { postTypeStyle } from "@/utils/postTypeStyle";
import truncateText from "@/utils/trancateText";
import Button from "@/ui/Button";
import { useRouter } from "next/navigation";

export default function BlogSliderClient({ posts }) {
  const sliderRef = useRef();
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);

  // Animation Setup
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  // Auto-scroll using animation frame
  useAnimationFrame((t, delta) => {
    if (!isHovered && sliderRef.current) {
      const scrollWidth = sliderRef.current.scrollWidth / 2;
      let currentX = x.get();
      currentX += (delta / 1000) * 30; 

      if (Math.abs(currentX) >= scrollWidth) {
        currentX = 0;
      }
      x.set(currentX);
    }
  });

  if (!posts.length) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: "easeInOut" }}
      className="overflow-hidden bg-secondary-100 py-4 px-5 rounded-3xl lg:mx-12 mb-8 lg:mb-14"
      dir="rtl"
    >
      <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row gap-8 items-start">
        {/* Sidebar */}
        <div className="md:w-1/4 w-full text-center md:text-right lg:self-end">
          <h2 className="text-2xl sm:text-3xl font-black text-secondary-900 mb-2 ">
            آخرین بلاگ ها
          </h2>
          <p className="text-secondary-400 font-medium text-sm mb-6 leading-relaxed">
            بلاگ بنویس، دیده شو و بلاگر شو !
          </p>
          <Button
            variant="primary"
            onClick={() => router.push("/blogs")}
            className="text-sm font-semibold"
          >
            مشاهده همه بلاگ ها
          </Button>
        </div>

        {/* Slider */}
        <div className="md:w-3/4 w-full overflow-hidden ">
          <motion.div
            ref={sliderRef}
            className="flex flex-nowrap p-2"
            style={{ x }}
          >
            {[...posts, ...posts].map((post, idx) => (
              <motion.div
                key={idx}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="flex-shrink-0 w-[280px] border border-secondary-300 rounded-xl p-3 mr-4 bg-secondary-0 cursor-pointer"
              >
                <CoverImage {...post} />
                <div className="mt-2 space-y-4">
                  {/* Card Header */}
                  <Link href={`/blogs/${post.slug}`}>
                    <h2 className="font-bold text-secondary-700 flex justify-between items-center mb-2">
                      {truncateText(post.title, 25)}
                      {post.type && (
                        <span
                          className={`text-xs font-medium ${
                            postTypeStyle[post.type]?.className
                          }`}
                        >
                          {postTypeStyle[post.type]?.label}
                        </span>
                      )}
                    </h2>
                  </Link>
                  <div className="flex justify-between items-center mb-3 text-xs text-secondary-500">
                    <Author {...post.author} />
                    <div className="flex items-center">
                      <ClockIcon className="w-4 h-4 stroke-secondary-500 ml-1" />
                      <span>
                        خواندن: {toPersianDigits(post.readingTime)} دقیقه
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-x-4">
                    <ButtonIcon variant="secondary">
                      <ChatBubbleLeftEllipsisIcon />
                      {toPersianDigits(post.commentsCount)}
                    </ButtonIcon>
                    <ButtonIcon variant="red">
                      <SolidHeartIcon />
                      <span className="mr-1 font-bold">
                        {toPersianDigits(post.likesCount || 0)}
                      </span>
                    </ButtonIcon>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
