import React, { useRef } from "react";
import {
  Zap,
  Activity,
  Clock,
  TrendingUp,
  SquareKanban,
  MoveRight,
  MoveDown,
  ChartNoAxesCombined,
  ChevronsLeftRightEllipsis,
  TrendingUpDown,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  ScrollFadeFunc,
  EaseOutFunc,
  HoverFunc,
} from "../Components/FramerMotion";

const LandingPage = () => {
  // handlesubmit func
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      {/* hero section */}
      <section className="hero_sect h-screen w-full flex justify-center flex-col">
        <div className="text-white p-4 lg:p-22">
          <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold p-2 leading-12 md:leading-20">
            Monitor, Compare & <br /> Understand Your <br />
            Website's Performance
          </h1>
          <p className="text-xl md:text-2xl p-2 leading-10 md:w-3/4 xl:w-1/2">
            Get real-time and historical Core Web Vials in one beautiful
            dashboard.
          </p>
          <form className="md:w-3/4" onSubmit={(e) => handleSubmit(e)}>
            <input
              type="text"
              placeholder="Enter site URL"
              autoFocus
              className="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 my-2 mr-4 hover:border-white hover:ring-2 w-3/4 md:w-1/2"
            />
            <button className="px-4 py-2 bg-blue-500 rounded-lg cursor-pointer hover:bg-white hover:text-blue-500 hover:font-semibold my-2">
              Analyze Now
            </button>
          </form>
        </div>
      </section>
      {/* Why MetricMind */}
      <ScrollFadeFunc>
        <section className="my-20 text-center">
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
                transition={{ delay: i * 0.1 }}
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
        <section className="my-20 text-center">
          <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950">
            Simple, Smart, Powerful
          </h2>
          <div className="max-w-4xl mx-auto p-4 flex flex-wrap sm:flex-nowrap justify-center items-center gap-6 text-center">
            <HoverFunc className="flex flex-col justify-center items-center w-60">
              <ChevronsLeftRightEllipsis className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 text-blue-950 border border-green-500 rounded p-2" />
              <p className="mt-2 text-sm sm:text-base">
                Enter your website URL
              </p>
            </HoverFunc>
            <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90" />
            <HoverFunc className="flex flex-col justify-center items-center w-60">
              <ChartNoAxesCombined className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 text-blue-950 border border-green-500 rounded p-2" />
              <p className="mt-2 text-sm sm:text-base">
                We fetch & display your core web vitals
              </p>
            </HoverFunc>
            <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90" />
            <HoverFunc className="flex flex-col justify-center items-center w-60">
              <TrendingUpDown className="w-16 h-16 sm:w-24 sm:h-24 md:w-40 md:h-40 text-blue-950 border border-green-500 rounded p-2" />
              <p className="mt-2 text-sm sm:text-base">
                Return anytime to compare past results
              </p>
            </HoverFunc>
            <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90 block sm:hidden" />
          </div>
        </section>
      </ScrollFadeFunc>
      {/* What you get */}
      <ScrollFadeFunc>
        <section className="bg-gray-50 py-16">
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
        <section className="bg-white py-16">
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
