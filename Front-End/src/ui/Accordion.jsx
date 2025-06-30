"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import useOutsideClick from "@/hooks/useOutsideClick";

const AccordionItem = ({ isOpen, onClick, question, answer }) => {
  return (
    <div
      className={`rounded-xl transition-all duration-300 ${
        isOpen ? "bg-secondary-100 shadow-sm" : "bg-secondary-0"
      }`}
    >
      <button
        onClick={onClick}
        className={`flex items-center justify-between w-full py-4 px-5 text-right text-secondary-800 font-semibold  text-sm lg:text-base ${
          isOpen ? "bg-secondary-100" : "hover:bg-secondary-100"
        } rounded-xl transition-colors duration-200`}
      >
        <span className="text-secondary-700">{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0, scale: isOpen ? 1.1 : 1 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDownIcon className="w-4 h-4 lg:w-5 lg:h-5 text-primary-500" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { height: "auto", opacity: 1 },
              collapsed: { height: 0, opacity: 0 },
            }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden px-5 text-secondary-500 text-sm leading-relaxed"
          >
            <div className="pb-5 pt-4 border-t border-primary-900">{answer}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Accordion = ({ items }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const containerRef = useOutsideClick(() => setOpenIndex(null));

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <div className="space-y-3 lg:px-6" ref={containerRef}>
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          isOpen={openIndex === i}
          onClick={() => toggle(i)}
          question={item.question}
          answer={item.answer}
        />
      ))}
    </div>
  );
};

export default Accordion;
