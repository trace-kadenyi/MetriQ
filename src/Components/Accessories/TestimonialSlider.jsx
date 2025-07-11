import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import testimonials from "../../data/testimonials";
import slideVariants from "../../constants/slideVariants";
import TestimonialNavigationButtons from "../Buttons/TestimonialNavigationButtons";

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goToNextSlide = (dir) => {
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length
    );
  };

  // handle pagination
  useEffect(() => {
    const interval = setInterval(() => goToNextSlide(1), 7000);
    return () => clearInterval(interval);
  }, [index]);

  // destructure quote and name
  const { quote, name } = testimonials[index];

  return (
    <div className="relative max-w-3xl mx-auto px-6 h-[180px]">
      <AnimatePresence custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.5 }}
          className="text-center"
          aria-live="polite"
        >
          <div>
            <p className="italic text-lg text-gray-700 dark:text-gray-300 min-h-[145px] sm:min-h-[76px]">
              "{quote}"
            </p>
            <br />
            <span className="block text-sm not-italic font-semibold text-gray-600 dark:text-gray-400 min-h-[50px] sm:min-h-[20px]">
              {name}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Testimonials Navigation Buttons */}
      <TestimonialNavigationButtons
        onPrev={() => goToNextSlide(-1)}
        onNext={() => goToNextSlide(1)}
      />
    </div>
  );
};

export default TestimonialSlider;
