import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

// testimonials container
const testimonials = [
  {
    quote:
      "MetriQ helped us cut our homepage load time by 38%. The visual breakdown made it easy to explain the problem to marketing.",
    name: "– Alex M., Frontend Developer at Finlytics",
  },
  {
    quote:
      "With AI summaries, I no longer need to write performance briefs manually. Clients instantly understand the bottlenecks.",
    name: "– Jamie R., SEO Consultant for Small Agencies",
  },
  {
    quote:
      "I used MetriQ to compare our site to competitors before a redesign. The visual charts made stakeholder buy-in much easier.",
    name: "– Dana K., Product Designer at Nomadic",
  },
  {
    quote:
      "It’s like Lighthouse, but clearer. I track vitals weekly and quickly flag regressions thanks to saved history.",
    name: "– Leo G., Freelance Web Performance Auditor",
  },
];

// slidevariants func
const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    position: "absolute",
  }),
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    position: "absolute",
  }),
};

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const paginate = (dir) => {
    setDirection(dir);
    setIndex(
      (prev) => (prev + dir + testimonials.length) % testimonials.length
    );
  };

  // handle pagination
  useEffect(() => {
    const interval = setInterval(() => paginate(1), 7000);
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

      {/* Desktop Arrows */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center 
                 p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300
                 hover:scale-105"
        aria-label="Previous Testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-green-500 dark:text-green-400" />
      </button>

      <button
        onClick={() => paginate(1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center 
                 p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300
                 hover:scale-105"
        aria-label="Next Testimonial"
      >
        <ChevronRight className="w-5 h-5 text-green-500 dark:text-green-400" />
      </button>

      {/* Mobile Arrows */}
      <div className="mt-6 flex justify-center gap-4 md:hidden">
        <button
          onClick={() => paginate(-1)}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300 
                     hover:scale-105"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-green-500 dark:text-green-400" />
        </button>
        <button
          onClick={() => paginate(1)}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                     shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300 
                     hover:scale-105"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-5 h-5 text-green-500 dark:text-green-400" />
        </button>
      </div>
    </div>
  );
};

export default TestimonialSlider;
