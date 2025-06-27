import clsx from "clsx";

const getToggleBtnClass = (active) =>
  clsx(
    "px-4 py-2 rounded-md font-medium transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-1",
    active
      ? "bg-green-600 text-white hover:cursor-not-allowed"
      : "bg-gray-200 text-gray-700 hover:shadow-md hover:bg-orange-400 hover:text-white cursor-pointer"
  );

const DeviceToggle = ({ view, setView }) => {
  return (
    <div className="flex gap-2 p-1 rounded-lg bg-gray-100 shadow-inner">
      <button
        aria-label="View mobile report"
        aria-pressed={view === "mobile"}
        className={getToggleBtnClass(view === "mobile")}
        onClick={() => setView("mobile")}
      >
        Mobile
      </button>
      <button
        aria-label="View desktop report"
        aria-pressed={view === "desktop"}
        className={getToggleBtnClass(view === "desktop")}
        onClick={() => setView("desktop")}
      >
        Desktop
      </button>
    </div>
  );
};

export default DeviceToggle;
