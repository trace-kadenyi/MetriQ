import React, { useRef, useState } from "react";
import axios from "axios";
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
  CheckCircle,
  ArrowRightCircle,
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
} from "../Components/FramerMotion";
import useUrlForm from "../Components/urlForm";
import preloaderGif from "../assets/preloader_gif.gif";
import {
  scoreColour,
  borderColour,
  getStatusColor,
  getScoreStatus,
} from "../Components/ResultsBlock";

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
          className="text-white p-4 lg:p-22"
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
            className="md:w-3/4"
            variants={fadeUp}
          >
            <input
              type="text"
              value={url}
              onChange={handleChange}
              placeholder="Enter site URL"
              autoFocus
              required
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2 mr-4 hover:border-white hover:ring-2 w-3/4 md:w-1/2"
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
              className={`px-4 py-2 bg-blue-500 rounded-lg my-2 flex items-center justify-center min-w-[120px] ${
                loading
                  ? "cursor-default"
                  : "cursor-pointer hover:bg-white hover:text-blue-500 hover:font-semibold"
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
          <>
            {/* Faded Background */}
            <div className="absolute inset-0 backdrop-blur-md bg-white/10 z-10"></div>
            {/* Animated Popup */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 z-20 transform -translate-x-1/2 -translate-y-1/2 bg-white text-gray-800 shadow-xl border border-gray-200 rounded-2xl p-8 w-[95%] max-w-xl text-center"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  setShowPopup(false);
                  setLoading(false);
                }}
                className="absolute top-4 right-5 text-gray-400 hover:text-red-600 text-2xl font-bold"
                aria-label="Close popup"
              >
                &times;
              </button>

              {/* Spinner or Results */}
              {!partialResults ? (
                <>
                  <div className="my-2 mx-auto flex justify-center">
                    <img
                      src={preloaderGif}
                      alt="Analyzing site"
                      className="w-12 h-12"
                    />
                  </div>
                  <h3 className="text-base font-medium">
                    Generating your PageSpeed Insights report...
                  </h3>
                  {!showLongWaitMessage && (
                    <div>
                      <p className="text-sm text-gray-500 mt-1">
                        Hang tight — this may take up to 30 seconds.
                      </p>
                    </div>
                  )}
                  {/* Appears when it take more than 20s */}
                  {showLongWaitMessage && (
                    <div className="mt-3 text-sm max-w-md mx-auto text-center">
                      <p className="text-red-600 font-semibold leading-relaxed">
                        Note that this may take longer than usual because the
                        website has a large number of resources or complex
                        scripts that require deeper analysis.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <motion.h3
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="text-xl font-bold text-blue-950 mb-6"
                  >
                    <CheckCircle className="text-blue-950 w-6 h-6 inline-block mr-2" />
                    Report Ready
                  </motion.h3>

                  <div className="grid grid-cols-2 gap-6 text-sm text-left justify-center">
                    {/* Mobile Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <h4
                        className={`font-semibold text-lg mb-1 ${scoreColour(
                          partialResults.mobile.performance
                        )}`}
                      >
                        📱 Mobile
                      </h4>
                      <hr
                        className={`mb-4 border-t-2 ${borderColour(
                          partialResults.mobile.performance
                        )}`}
                      />{" "}
                      {renderScore(
                        "Performance",
                        partialResults.mobile?.performance
                      )}
                      {renderScore("SEO", partialResults.mobile?.seo)}
                      {renderScore(
                        "Accessibility",
                        partialResults.mobile?.accessibility
                      )}
                      {renderScore(
                        "Best Practices",
                        partialResults.mobile?.bestPractices
                      )}
                    </motion.div>

                    {/* Desktop Results */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      <h4
                        className={`font-semibold text-lg mb-1 ${scoreColour(
                          partialResults.desktop.performance
                        )}`}
                      >
                        🖥️ Desktop
                      </h4>
                      <hr
                        className={`mb-4 border-t-2 ${borderColour(
                          partialResults.desktop.performance
                        )}`}
                      />{" "}
                      {renderScore(
                        "Performance",
                        partialResults.desktop?.performance
                      )}
                      {renderScore("SEO", partialResults.desktop?.seo)}
                      {renderScore(
                        "Accessibility",
                        partialResults.desktop?.accessibility
                      )}
                      {renderScore(
                        "Best Practices",
                        partialResults.desktop?.bestPractices
                      )}
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="mt-8 px-5 py-2 mx-auto bg-blue-500 text-white rounded-full font-semibold shadow-md hover:bg-blue-700 transition duration-300 cursor-pointer flex items-center justify-center gap-2"
                    onClick={() => {
                      setShowPopup(false);
                      setLoading(false);

                      navigate(
                        `/results-page?url=${encodeURIComponent(submittedUrl)}`
                      );
                    }}
                  >
                    View Full Report <ArrowRightCircle className="w-5 h-5" />
                  </motion.button>
                </>
              )}
            </motion.div>
          </>
        )}
      </section>

      {/* Why MetricMind */}
      <ScrollFadeFunc>
        <section className="text-center bg-white py-16">
          <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950">
            Why MetricMind?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left p-3">
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
        <section className="pt-16 pb-21 text-center px-4 bg-gradient-to-b from-white to-slate-100">
          <h2 className="text-4xl font-extrabold mb-16 text-blue-950 leading-tight">
            Simple, Smart, Powerful
          </h2>

          <div className="max-w-6xl mx-auto flex flex-wrap justify-center items-stretch gap-8 bg-white rounded-2xl shadow-lg p-10">
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
        <section className="bg-white py-16">
          <h2 className="text-3xl font-bold text-center mb-8 text-blue-950">
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
                className="p-6 bg-white shadow-md rounded-md text-center"
              >
                <Icon className="mx-auto text-green-500 w-10 h-10 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </HoverFunc>
            ))}
          </div>
        </section>
      </ScrollFadeFunc>
      {/* Testimonials */}
      <ScrollFadeFunc>
        <section className="bg-slate-50 py-16 border-t border-gray-200">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-950">
            Loved by Early Testers
          </h2>
          <div className="max-w-3xl mx-auto px-4 text-center italic text-lg text-gray-700">
            "MetricMind makes it stupidly easy to track web vitals. The UI is
            clean and the insights are actually useful."
            <br />
            <span className="text-sm not-italic font-seminold text-gray-600">
              -Beta User
            </span>
          </div>
        </section>
      </ScrollFadeFunc>
      {/* Footer */}
      <EaseOutFunc>
        <section className="py-20 bg-blue-950 text-white text-center">
          <h2 className="text-4xl font-bold mb-6">
            Start Analyzing Smarter Today
          </h2>
          <p className="text-xl mb-6">
            Join developers making better decisions with MetricMind.
          </p>
          <button className="bg-white text-blue-950 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
            Get Started Free
          </button>
        </section>
      </EaseOutFunc>
    </main>
  );
};

export default LandingPage;
