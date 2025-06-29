import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

const Accordion = ({ items = [], renderTitle, renderContent }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="space-y-6">
      {items.map((item, index) => (
        <div
          key={index}
          className={clsx("w-full rounded-2xl border transition-all", {
            "bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:to-gray-900 shadow-md border-green-100 dark:border-green-900":
              openIndex === index,
            "bg-white dark:bg-blue-950 shadow-sm hover:shadow-md border-gray-100 dark:border-gray-800":
              openIndex !== index,
          })}
        >
          <button
            onClick={() => toggleAccordion(index)}
            className={clsx(
              "w-full px-6 py-3 border-b rounded-t-2xl flex flex-col sm:justify-between sm:items-center sm:flex-row gap-2 focus:outline-none cursor-pointer transition-all duration-200 transform hover:scale-[1.01] hover:-translate-y-0.5 hover:shadow-lg",
              openIndex === index
                ? "bg-gradient-to-r from-green-50 via-orange-50 to-blue-100 border-green-300 shadow-md text-blue-950 font-semibold dark:from-green-950 dark:via-gray-800 dark:to-blue-950 dark:border-green-800 dark:text-green-100"
                : "bg-gradient-to-r from-blue-50 to-gray-100 border-gray-200 text-gray-800 dark:from-gray-900 dark:to-gray-800 dark:border-gray-700 dark:text-gray-200"
            )}
          >
            {renderTitle(item, index, openIndex === index)}
          </button>

          <AnimatePresence initial={false}>
            {openIndex === index && (
              <motion.div
                layout
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 70,
                  damping: 18,
                }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 pt-4 rounded-b-2xl bg-white dark:bg-gradient-to-b dark:from-gray-900 dark:to-gray-950 dark:text-gray-100">
                  {renderContent(item, index)}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
