import React from "react";
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
  ArrowDown,
} from "lucide-react";
import { easeOut, motion } from "framer-motion";

import {
  ScrollFadeFunc,
  HoverFunc,
  heroVariants,
  fadeUp,
  StepCard,
} from "../Components/Accessories/FramerMotion";
import MainForm from "../Components/Forms/MainForm";
import TestimonialSlider from "../Components/Accessories/TestimonialSlider";

const LandingPage = () => {
  return (
    <main className="bg-white dark:bg-blue-950">
      {/* hero section */}
      <section className="hero_sect h-screen w-full flex justify-center flex-col overflow-x-hidden pt-20">
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

          <motion.p
            variants={fadeUp}
            className="text-base md:text-lg p-2 mt-2 text-slate-200 dark:text-slate-300 flex items-center gap-2"
          >
            Get started for free — enter your URL below
            <ArrowDown className="w-5 h-5 animate-bounce mt-1 text-slate-300 dark:text-slate-400" />
          </motion.p>
          {/* Form */}
          <MainForm />
        </motion.div>
      </section>

      {/* Why MetriQ */}
      <ScrollFadeFunc>
        <section className="text-center bg-white py-16 dark:bg-blue-950">
          <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950 dark:text-gray-100">
            Why MetriQ?
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left p-3 dark:text-gray-300">
            {[
              {
                icon: Activity,
                text: "Fetches detailed performance scores using Google PageSpeed Insights",
              },
              {
                icon: Clock,
                text: "Maintains a historical log of the last 5 reports per site",
              },
              {
                icon: TrendingUp,
                text: "Generates AI-powered summaries that explain what the data means",
              },
              {
                icon: ChartNoAxesCombined,
                text: "Compares your site with competitors using side-by-side charts",
              },
              {
                icon: SquareKanban,
                text: "Exports full audit + AI results as professional PDF reports",
              },
              {
                icon: Zap,
                text: "Clean, responsive UI with OAuth login and persistent theme settings",
              },
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
                title: "All-in-One Dashboard",
                desc: "Track reports, summaries, and comparisons in one place.",
              },
              {
                icon: Clock,
                title: "Saved History",
                desc: "Stores your last 5 performance reports for every URL.",
              },
              {
                icon: TrendingUp,
                title: "AI Insights",
                desc: "Smart summaries break down complex performance data.",
              },
              {
                icon: ChartNoAxesCombined,
                title: "Competitor Comparison",
                desc: "Visualize how your site stacks up side by side.",
              },
              {
                icon: Zap,
                title: "PDF Reports",
                desc: "Download complete reports with metrics and AI analyses.",
              },
              {
                icon: Activity,
                title: "OAuth + Personalization",
                desc: "Login via Google/GitHub. Your data, your theme, always synced.",
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
        <section className="bg-slate-50 pt-20 pb-32 sm:py-26 px-4 border-t border-gray-200 dark:border-none dark:bg-gray-900 min-h-[550px] sm:min-h-[300px]">
          <h2 className="text-3xl font-bold text-center mb-10 text-blue-950 dark:text-gray-100">
            Loved by Early Testers
          </h2>
          <TestimonialSlider />
        </section>
      </ScrollFadeFunc>
    </main>
  );
};

export default LandingPage;
