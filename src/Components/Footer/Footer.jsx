import { useState } from "react";
import { motion } from "framer-motion";

import { EaseOutFunc } from "../Accessories/FramerMotion";
import MainForm from "../MainForm/MainForm";

const Footer = () => {
  const [showForm, setShowForm] = useState(false);

  const handleClick = (e) => {
    e.target.classList.add("hidden");
    setHide(true);
  };
  return (
    <EaseOutFunc>
      <section className="py-20 bg-blue-950 text-white dark:text-gray-100 text-center">
        <h2 className="text-4xl font-bold mb-6">
          Start Analyzing Smarter Today
        </h2>
        <p className="text-xl mb-6">
          Join developers making better decisions with MetricMind.
        </p>

        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{
              scale: [1, 1.15, 1],
              transition: { duration: 0.8, ease: "easeInOut" },
            }}
            className="bg-white dark:bg-gray-300 text-blue-950 px-6 py-3 rounded-md font-semibold hover:bg-blue-100 dark:hover:bg-gray-300 transition cursor-pointer"
          >
            Get Started Free
          </motion.button>
        )}
        {showForm && (
          <div className="flex flex-col items-center justify-center w-full">
            <MainForm
              formClass="flex flex-col items-center w-full max-w-md mx-auto px-4"
              inputClass="w-full mb-4 mr-0"
              buttonClass="mx-auto"
            />
          </div>
        )}
      </section>
    </EaseOutFunc>
  );
};

export default Footer;
