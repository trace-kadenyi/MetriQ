import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const TestimonialSlider = () => {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleNext = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
      setFade(true);
    }, 200); // Match with fade-out timing
  };

  const handlePrev = () => {
    setFade(false);
    setTimeout(() => {
      setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
      setFade(true);
    }, 200);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % testimonials.length);
        setFade(true);
      }, 200);
    }, 7000);

    return () => clearInterval(interval);
  }, [index]);

  const { quote, name } = testimonials[index];

  return (
    <div className="relative max-w-3xl mx-auto px-6">
      {/* Main text block with fixed height */}
      <div
        className={`transition-opacity duration-500 ease-in-out ${
          fade ? "opacity-100" : "opacity-0"
        } text-center h-[180px] flex flex-col items-center justify-center`}
      >
        <p className="italic text-lg text-gray-700 dark:text-gray-300 max-w-xl">
          "{quote}"
        </p>
        <br />
        <span className="text-sm not-italic font-semibold text-gray-600 dark:text-gray-400">
          {name}
        </span>
      </div>

      {/* Desktop arrows (side-aligned) */}
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center 
               p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
               shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300
               hover:scale-105"
        aria-label="Previous Testimonial"
      >
        <ChevronLeft className="w-5 h-5 text-green-500 dark:text-green-400" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center 
               p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
               shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300
               hover:scale-105"
        aria-label="Next Testimonial"
      >
        <ChevronRight className="w-5 h-5 text-green-500 dark:text-green-400" />
      </button>

      {/* Mobile arrows (below content) */}
      <div className="mt-6 flex justify-center gap-4 md:hidden">
        <button
          onClick={handlePrev}
          className="p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
                 shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300 
                 hover:scale-105"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-green-500 dark:text-green-400" />
        </button>
        <button
          onClick={handleNext}
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
