"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useIsDesktop } from "@/hooks/useIsDesktop";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import Button from "@/ui/Button";

const pollQuestion = "به نظر شما بهترین سبک نوشتن چیست؟";

const pollOptions = [
  "داستانی و روایی",
  "آموزشی و تحلیلی",
  "طنز و سرگرمی",
  "نقد و بررسی",
];

// animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth feel
      staggerChildren: 0.1,
    },
  },
};

const titleVariants = {
  hidden: {
    opacity: 0,
    y: -30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const descriptionVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.2,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const formVariants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: [0.25, 0.46, 0.45, 0.94],
      staggerChildren: 0.08,
    },
  },
};

const optionVariants = {
  hidden: {
    opacity: 0,
    x: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: 0.3,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const successVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.34, 1.56, 0.64, 1], 
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
};

const WeeklyPoll = () => {
  const isDesktop = useIsDesktop();
  const [selectedOption, setSelectedOption] = useState(null);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = () => {
    if (selectedOption) setHasVoted(true);
  };

  return (
    <section dir="rtl" className="py-10 px-4 md:px-8 lg:px-16 rounded-3xl">
      <motion.div
        className="flex flex-col-reverse lg:flex-row !lg:justify-between items-center gap-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Poll Form Section */}
        <motion.div
          variants={formVariants}
          className="w-full lg:w-8/12 space-y-3 lg:px-6 md:w-2/3 md:mx-auto lg:max-w-2xl"
        >
          <AnimatePresence mode="wait">
            {!hasVoted ? (
              <motion.div
                key="poll-form"
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={formVariants}
              >
                <RadioGroup value={selectedOption} onChange={setSelectedOption}>
                  <motion.div
                    className="space-y-4"
                    variants={containerVariants}
                  >
                    {pollOptions.map((option, index) => (
                      <motion.div
                        key={option}
                        variants={optionVariants}
                        whileHover={{
                          scale: 1.02,
                          transition: { duration: 0.2, ease: "easeOut" },
                        }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <RadioGroup.Option
                          value={option}
                          className={({ checked }) =>
                            `cursor-pointer rounded-xl px-6 py-4 border-2 transition-all duration-300
                             ${
                               checked
                                 ? "bg-primary-50 border-primary-800 text-primary-900 font-semibold"
                                 : "bg-secondary-0 border-secondary-300 text-secondary-800 hover:border-secondary-400 hover:bg-secondary-50"
                             }`
                          }
                        >
                          {option}
                        </RadioGroup.Option>
                      </motion.div>
                    ))}
                  </motion.div>

                  <motion.div variants={buttonVariants}>
                    <Button
                      className="mt-8 btn btn-primary w-full lg:w-1/2 lg:text-lg font-bold"
                      onClick={handleVote}
                      disabled={!selectedOption}
                    >
                      <motion.span
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        ثبت رأی
                      </motion.span>
                    </Button>
                  </motion.div>
                </RadioGroup>
              </motion.div>
            ) : (
              <motion.div
                key="success-message"
                variants={successVariants}
                initial="hidden"
                animate="visible"
                className="text-primary-900 font-semibold text-lg text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: 0.2,
                    duration: 0.5,
                    type: "spring",
                    stiffness: 200,
                  }}
                  className="inline-block mr-2"
                ></motion.div>
                رأی شما با موفقیت ثبت شد. از مشارکت شما سپاسگزاریم !🙏
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Title + Description Section */}
        <div className="lg:w-4/12 text-justify space-y-3 md:w-2/3 md:mx-auto">
          <motion.h2
            variants={titleVariants}
            className="text-3xl lg:text-4xl font-black text-secondary-900"
          >
            نظرسنجی هفتگی
          </motion.h2>

          <motion.p
            variants={descriptionVariants}
            className="text-sm lg:text-base text-secondary-400 font-medium leading-relaxed"
          >
            {pollQuestion}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
};

export default WeeklyPoll;
