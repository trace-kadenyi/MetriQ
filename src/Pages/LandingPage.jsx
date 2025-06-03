import React from "react";

const LandingPage = () => {
  return (
    <main>
      <section className="hero_sect h-screen w-full flex justify-center flex-col">
        <div className="text-white p-4 lg:p-22">
          <h1 className="text-5xl lg:text-7xl font-bold p-2 leading-16 lg:leading-20">
            Monitor, Compare & <br /> Understand Your <br />
            Website's Performance
          </h1>
          <p className="text-2xl p-2 leading-10 md:w-3/4 xl:w-1/2">
            Get real-time and historical Core Web Vials in one beautiful
            dashboard.
          </p>
        </div>
      </section>
    </main>
  );
};

export default LandingPage;
