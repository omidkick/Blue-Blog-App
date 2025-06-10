"use client";

import { motion } from "framer-motion";
import Button from "@/ui/Button";
import { getUserApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CountdownBadge from "./CountdownBadge";

const HeroSection = () => {
  const router = useRouter();

  // Handle start writing logic
  const handleStartWriting = async () => {
    try {
      const { user } = await getUserApi();
      console.log(user);

      if (user) {
        router.push("/profile/posts/create");
      } else {
        router.push("/signin");
      }
    } catch (err) {
      toast.error(err?.response?.data?.message);
      router.push("/signin");
    }
  };

  return (
    <section
      dir="rtl"
      className="py-6 lg:py-10 px-4 md:px-10 lg:px-16 text-center md:text-right mb-8 lg:mb-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        {/* Text Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Countdown Badge */}
          <CountdownBadge />

          <h1 className="text-3xl md:text-5xl font-black text-secondary-800 !leading-relaxed">
            <span className="text-primary-900">بنویس،</span> به اشتراک بگذار{" "}
            <br />و{" "}
            <span className="text-secondary-700">در دنیای بلاگ بدرخش!</span>
          </h1>
          <p className="text-secondary-600 text-lg mt-6">
            در <strong className="text-primary-700 font-bold">بلو بلاگ</strong>{" "}
            می‌تونی درباره‌ی هر موضوعی بلاگ بنویسی، وبلاگ شخصی بسازی، لایک و
            کامنت بگیری و دنیای نوشتن رو با دیگران به اشتراک بذاری!
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-row gap-4 justify-center md:justify-start">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button
                variant="primary"
                className="hover:bg-primary-900"
                onClick={handleStartWriting}
              >
                شروع نوشتن
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Button variant="secondary" onClick={() => router.push("/blogs")}>
                بلاگ‌ها را ببین
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="flex-1"
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/images/Hero.png"
            alt="نویسنده بلاگ"
            className="w-full max-w-sm mx-auto rounded-2xl hover:scale-105 transition-transform duration-300"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
