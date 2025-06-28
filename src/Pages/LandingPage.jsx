import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Zap,
  Activity,
  Clock,
  TrendingUp,
  SquareKanban,
  MoveRight,
  ChartNoAxesCombined,
  ChevronsLeftRightEllipsis,
  TrendingUpDown,
} from "lucide-react";
import { easeOut, motion } from "framer-motion";
import clsx from "clsx";

import {
  ScrollFadeFunc,
  EaseOutFunc,
  HoverFunc,
  heroVariants,
  fadeUp,
  StepCard,
} from "../Components/Accessories/FramerMotion";
import useUrlForm from "../hooks/urlForm";
import {
  getStatusColor,
  getScoreStatus,
} from "../Components/ResultsBlocks/CurrResultsBlock";
import Popup from "../Components/Accessories/Popup";
import ThemeToggle from "../Components/Accessories/ThemeToggle";

const LandingPage = () => {
  const {
    url,
    isValidFormat,
    hasSubmitted,
    handleChange,
    handleSubmit,
    loading,
    setLoading,
    showPopup,
    setShowPopup,
    partialResults,
    submittedUrl,
    showLongWaitMessage,
  } = useUrlForm();

  const navigate = useNavigate();

  // render scores
  const renderScore = (label, score) => {
    const status = getScoreStatus(score);
    const colorClass = getStatusColor(status, "text");
    const ratingText = status.charAt(0).toUpperCase() + status.slice(1); // e.g. "Good", "Average", "Poor"

    return (
      <p className="mb-1 font-semibold">
        {label}:{" "}
        <span className={clsx(colorClass)}>
          {score ?? "N/A"}{" "}
          {score !== undefined && <span className="ml-1">({ratingText})</span>}
        </span>
      </p>
    );
  };

  return (
    <main>
      {/* hero section */}
      <section className="hero_sect h-screen w-full flex justify-center flex-col overflow-x-hidden">
        <motion.div
          variants={heroVariants}
          initial="hidden"
          animate="visible"
          className="text-white p-4 lg:p-22 dark:text-gray-200"
        >
          <motion.h1
            variants={fadeUp}
            className="text-3xl md:text-5xl lg:text-7xl font-bold p-2 leading-12 md:leading-20"
          >
            Monitor, Compare & <br /> Understand Your <br />
            Website's Performance
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl p-2 leading-10 md:w-3/4 xl:w-1/2"
          >
            Get real-time and historical Core Web Vitals in one beautiful
            dashboard.
          </motion.p>
          <motion.form
            onSubmit={handleSubmit}
            className="md:w-3/4 dark:text-gray-300"
            variants={fadeUp}
          >
            <input
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="Enter site URL"
              autoFocus
              required
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2 mr-4 hover:border-white dark:border-gray-400 dark:hover:border-gray-400 hover:ring-2 w-3/4 md:w-1/2"
            />

            {url && !hasSubmitted && (
              <p
                className={`text-sm ${
                  isValidFormat ? "text-green-600" : "text-red-600"
                }`}
              >
                {isValidFormat ? "URL format looks good" : "Invalid URL format"}
              </p>
            )}
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-500 dark:bg-blue-900 rounded-lg my-2 flex items-center justify-center min-w-[120px] ${
                loading
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-white dark:hover:bg-gray-400 hover:text-blue-500 hover:font-semibold dark:hover:text-blue-600"
              }`}
              disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Analyze Now"
              )}
            </button>
          </motion.form>
        </motion.div>
        {/* popup */}
        {showPopup && (
          <Popup
            showPopup={showPopup}
            setShowPopup={setShowPopup}
            loading={loading}
            setLoading={setLoading}
            partialResults={partialResults}
            submittedUrl={submittedUrl}
            showLongWaitMessage={showLongWaitMessage}
            navigate={navigate}
          />
        )}
      </section>

      {/* Why MetricMind */}
      <ScrollFadeFunc>
        <section className="text-center bg-white py-16 dark:bg-blue-950">
          <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950 dark:text-gray-100">
            Why MetricMind?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left p-3 dark:text-gray-300">
            {[
              {
                icon: Activity,
                text: "Fetches Per Web Vitals from PageSpeed insights",
              },
              { icon: Clock, text: "Tracks performance over time" },
              {
                icon: TrendingUp,
                text: "Smart insights, not just raw numbers",
              },
              { icon: Zap, text: "Fast, clean UI for devs and non-devs alike" },
            ].map(({ icon: Icon, text }, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: easeOut }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <Icon className="text-green-500 w-5 h-5 mt-1" />
                <span
                  dangerouslySetInnerHTML={{
                    __html: text.replace(/(.*?)(\s|$)/, "<strong>$1</strong> "),
                  }}
                />
              </motion.li>
            ))}
          </ul>
        </section>
      </ScrollFadeFunc>
      {/* Process */}
      <ScrollFadeFunc>
        <section className="pt-16 pb-21 text-center px-4 bg-gradient-to-b from-white to-slate-100 dark:from-blue-950 dark:via-gray-800 dark:to-blue-950">
          <h2 className="text-4xl font-extrabold mb-16 text-blue-950 leading-tight dark:text-gray-100">
            Simple, Smart, Powerful
          </h2>

          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-stretch gap-8 bg-white rounded-2xl shadow-lg p-10 dark:bg-gray-900">
            {[
              {
                icon: ChevronsLeftRightEllipsis,
                text: "Enter your website URL",
              },
              {
                icon: ChartNoAxesCombined,
                text: "We fetch & display your core web vitals",
              },
              {
                icon: TrendingUpDown,
                text: "Return anytime to compare past results",
              },
            ].map((step, index) => (
              <React.Fragment key={index}>
                <StepCard
                  Icon={step.icon}
                  stepNumber={index + 1}
                  text={step.text}
                />
                {index < 2 && (
                  <MoveRight className="w-6 h-6 hidden lg:block mt-14" />
                )}
              </React.Fragment>
            ))}
          </div>
        </section>
      </ScrollFadeFunc>

      {/* What you get */}
      <ScrollFadeFunc>
        <section className="bg-white bg-gradient-to-b dark:from-blue-950 dark:via-gray-900 dark:to-blue-900 py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-950 dark:text-gray-100">
            What You Get
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
            {[
              {
                icon: SquareKanban,
                title: "One Dashboard",
                desc: "Monitor everything in one place",
              },
              {
                icon: Clock,
                title: "Historical Logs",
                desc: "Access your old reports anytime",
              },
              {
                icon: Zap,
                title: "Lightning Fast",
                desc: "Optimized performance fetches",
              },
            ].map(({ icon: Icon, title, desc }, i) => (
              <HoverFunc
                key={i}
                className="p-6 bg-white dark:bg-gray-900 shadow-md rounded-md text-center"
              >
                <Icon className="mx-auto text-green-500 w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2 dark:text-gray-200">
                  {title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {desc}
                </p>
              </HoverFunc>
            ))}
          </div>
        </section>
      </ScrollFadeFunc>
      {/* Testimonials */}
      <ScrollFadeFunc>
        <section className="bg-slate-50 py-16 border-t border-gray-200 dark:border-none dark:bg-gray-900">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-950 dark:text-gray-100">
            Loved by Early Testers
          </h2>
          <div className="max-w-3xl mx-auto px-4 text-center italic text-lg text-gray-700 dark:text-gray-300">
            "MetricMind makes it stupidly easy to track web vitals. The UI is
            clean and the insights are actually useful."
            <br />
            <span className="text-sm not-italic font-seminold text-gray-600 dark:text-gray-400">
              -Beta User
            </span>
          </div>
        </section>
      </ScrollFadeFunc>
      {/* Footer */}
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
    </main>
  );
};

export default LandingPage;
