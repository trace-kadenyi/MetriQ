export const WarningBox = () => {
  return (
    <div className="relative overflow-hidden rounded-xl border border-dashed border-orange-300 bg-orange-50 p-6 text-center shadow-inner mb-10">
      {/* optional background graphic */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
        style={{ backgroundImage: `url('/chart-bg.png')` }}
      />

      {/* overlay content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-3">
        <span className="text-4xl">📉</span>
        <h5 className="text-lg sm:text-xl font-semibold text-orange-700">
          Not enough data to show comparison charts
        </h5>
        <p className="text-sm text-orange-600 max-w-md">
          You need at least <strong>2 reports</strong> for this URL to generate
          meaningful performance trends. Try running another analysis!
        </p>
      </div>
    </div>
  );
};
