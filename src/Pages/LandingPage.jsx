import React from "react";
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

const LandingPage = () => {
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
      {/* Body sects */}
      <section className="my-20 text-center">
        <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950">
          Why MetricMind?
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto text-left p-3">
          <li className="flex items-start gap-3">
            <Activity className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong>Fetches</strong> Per Web Vitals from PageSpeed insights
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Clock className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong>Tracks performance over time</strong>
            </span>
          </li>
          <li className="flex items-start gap-3">
            <TrendingUp className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong>Smart insights</strong>, not just raw numbers
            </span>
          </li>
          <li className="flex items-start gap-3">
            <Zap className="text-green-500 w-5 h-5 mt-1" />
            <span>
              <strong>Fast, clean UI</strong> for devs and non-devs alike
            </span>
          </li>
        </ul>
      </section>
      <section className="my-20 text-center">
        <h2 className="text-4xl font-bold my-10 mx-1 leading-snug text-blue-950">
          Simple, Smart, Powerful
        </h2>
        <div className="max-w-4xl mx-auto p-4 flex flex-wrap sm:flex-nowrap justify-center items-center gap-6 text-center">
          <div className="flex flex-col justify-center items-center w-60">
            <ChevronsLeftRightEllipsis className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-blue-950 border border-green-500 rounded p-2" />
            <p className="mt-2 text-sm sm:text-base">Enter your website URL</p>
          </div>
          <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90" />
          <div className="flex flex-col justify-center items-center w-60">
            <ChartNoAxesCombined className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-blue-950 border border-green-500 rounded p-2" />
            <p className="mt-2 text-sm sm:text-base">
              We fetch & display your core web vitals
            </p>
          </div>
          <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90" />
          <div className="flex flex-col justify-center items-center w-60">
            <TrendingUpDown className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 text-blue-950 border border-green-500 rounded p-2" />
            <p className="mt-2 text-sm sm:text-base">
              Return anytime to compare past results
            </p>
          </div>
          <MoveRight className="w-6 h-6 sm:rotate-0 rotate-90 block sm:hidden" />
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
