import { EaseOutFunc } from "../Accessories/FramerMotion";
import { easeOut, motion } from "framer-motion";

const Footer = () => {
  return (
    <EaseOutFunc>
      <section className="py-20 bg-blue-950 text-white dark:text-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Analyzing Smarter Today
        </h2>
        <p className="text-xl mb-6">
          Join developers making better decisions with MetricMind.
        </p>
        <motion.button
          whileHover={{
            scale: [1, 1.15, 1],
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="bg-white dark:bg-gray-300 text-blue-950 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 dark:hover:bg-gray-300 transition cursor-pointer"
        >
          Get Started Free
        </motion.button>
      </section>
    </EaseOutFunc>
  );
};

export default Footer;
