"use client";

// Imports
import { motion } from "framer-motion";
import Button from "@/ui/Button";
import { getUserApi } from "@/services/authService";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import CountdownBadge from "./CountdownBadge";
import { useInView } from "react-intersection-observer";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const textVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const headingVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: 25,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.4,
    },
  },
};

const buttonContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.9,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
  hover: {
    scale: 1.05,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
    },
  },
};

const imageContainerVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateY: -15,
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.3,
    },
  },
};

const imageVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
    filter: "blur(12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.4,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.5,
    },
  },
};

const bgShapeVariants = {
  hidden: {
    opacity: 0,
    scale: 0.6,
    rotate: -10,
    filter: "blur(20px)",
  },
  visible: {
    opacity: 0.9,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: {
      duration: 1.6,
      ease: [0.25, 0.46, 0.45, 0.94],
      delay: 0.2,
    },
  },
};

const floatingVariants = {
  animate: {
    y: [-8, 8, -8],
    rotate: [-2, 2, -2],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const countdownVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.7,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 0.1,
    },
  },
};

const HeroSection = () => {
  const isDesktop = useIsDesktop();
  const router = useRouter();

  const handleStartWriting = async () => {
    try {
      const { user } = await getUserApi();
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

  const { ref: textRef, inView: textInView } = useInView({
    triggerOnce: true,
    threshold: isDesktop ? 0.4 : 0.2,
    rootMargin: "50px",
  });

  const { ref: imageRef, inView: imageInView } = useInView({
    triggerOnce: true,
    threshold: isDesktop ? 0.3 : 0.1,
    rootMargin: "30px",
  });

  const TextContent = (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={textInView ? "visible" : "hidden"}
    >
      <motion.div variants={countdownVariants}>
        <CountdownBadge />
      </motion.div>

      <motion.h1
        className="text-3xl lg:text-4xl xl:text-5xl font-black text-secondary-800 !leading-relaxed"
        variants={headingVariants}
      >
        <span className="text-primary-900">بنویس،</span>{" "}
        به اشتراک بگذار <br />و{" "}
        <span className="text-secondary-700">در دنیای بلاگ بدرخش!</span>
      </motion.h1>

      <motion.p
        className="text-secondary-400 font-semibold xl:text-lg mt-6"
        variants={paragraphVariants}
      >
        در{" "}
        <strong className="text-primary-800 font-bold">بلو بلاگ</strong>{" "}
        می‌تونی درباره‌ی هر موضوعی بلاگ بنویسی، وبلاگ شخصی بسازی، لایک و کامنت
        بگیری و دنیای نوشتن رو با دیگران به اشتراک بذاری!
      </motion.p>

      <motion.div
        className="mt-8 flex flex-row gap-4 justify-center md:justify-start"
        variants={buttonContainerVariants}
      >
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="primary"
            className="hover:bg-primary-900 transition-colors duration-200"
            onClick={handleStartWriting}
          >
            شروع نوشتن
          </Button>
        </motion.div>
        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
          <Button
            variant="secondary"
            className="transition-colors duration-200"
            onClick={() => router.push("/blogs")}
          >
            بلاگ‌ها را ببین
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const ImageContent = (
    <motion.div
      className="relative w-full max-w-sm mx-auto"
      variants={imageContainerVariants}
      initial="hidden"
      animate={imageInView ? "visible" : "hidden"}
    >
      <motion.div
        className="absolute inset-0 m-auto w-64 h-64 md:w-80 md:h-80 bg-gradient-to-br from-primary-600 to-primary-800 rounded-full z-0"
        variants={bgShapeVariants}
        animate={imageInView ? ["visible", "animate"] : "hidden"}
        {...floatingVariants}
        style={{
          background: "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
          filter: "drop-shadow(0 25px 50px rgba(59, 130, 246, 0.3))",
        }}
      />

      <motion.img
        src="/images/Hero.png"
        alt="نویسنده بلاگ"
        className="w-full rounded-2xl relative z-10"
        variants={imageVariants}
        style={{
          filter: "drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))",
        }}
      />
    </motion.div>
  );

  return (
    <section
      dir="rtl"
      className="py-6 lg:py-10 px-4 md:px-10 lg:px-16 text-center md:text-right mb-8 lg:mb-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">
        <div ref={textRef} className="flex-1">
          {TextContent}
        </div>

        <div ref={imageRef} className="flex-1">
          {ImageContent}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;