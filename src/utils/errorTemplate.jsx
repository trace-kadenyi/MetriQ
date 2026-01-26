const ErrorTemplate = ({ error }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 px-6 py-6 bg-gray-200 dark:bg-gray-950 border-l-4 border-red-500 rounded-xl shadow-sm">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-8 w-8 text-red-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.054 0 1.632-1.14 1.05-2.05L13.05 4.95c-.582-.91-1.518-.91-2.1 0L4.03 16.95C3.448 17.86 4.026 19 5.08 19z"
        />
      </svg>
      <p className="text-center text-red-600 dark:text-red-400 font-semibold">
        {error}
      </p>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
        You've reached the daily limit for AI analysis. Please try again
        tomorrow.
      </p>
    </div>
  );
};

export default ErrorTemplate;
