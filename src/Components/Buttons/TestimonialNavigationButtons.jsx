import { ChevronLeft, ChevronRight } from "lucide-react";

const TestimonialNavigationButtons = ({ onPrev, onNext }) => {
  // base styles
  const baseStyles =
    "p-3 rounded-full bg-white/90 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-md ring-1 ring-green-400/20 hover:ring-green-400 transition-all duration-300 hover:scale-105";

  // icon styles
  const iconStyles = "w-5 h-5 text-green-500 dark:text-green-400";

  return (
    <>
      {/* Desktop buttons */}
      <button
        onClick={onPrev}
        className={`absolute left-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center sm:mx-1 ${baseStyles}`}
        aria-label="Previous Testimonial"
      >
        <ChevronLeft className={iconStyles} />
      </button>
      <button
        onClick={onNext}
        className={`absolute right-0 top-1/2 -translate-y-1/2 hidden md:flex items-center justify-center sm:mx-1 ${baseStyles}`}
        aria-label="Next Testimonial"
      >
        <ChevronRight className={iconStyles} />
      </button>

      {/* Mobile buttons */}
      <div className="mt-6 flex justify-center gap-4 md:hidden">
        <button
          onClick={onPrev}
          className={baseStyles}
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className={iconStyles} />
        </button>
        <button
          onClick={onNext}
          className={baseStyles}
          aria-label="Next Testimonial"
        >
          <ChevronRight className={iconStyles} />
        </button>
      </div>
    </>
  );
};

export default TestimonialNavigationButtons;
