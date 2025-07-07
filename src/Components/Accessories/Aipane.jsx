import MarkdownRenderer from "./MarkdownRenderer";
import { motion } from "framer-motion";
const AiPane = ({ loading, error, markdown }) => {
  // render loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        {/* lightweight spinner */}
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-green-500 border-t-transparent" />
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Generating AI insights…
        </p>
      </div>
    );
  }

  // render ai error
  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-3 px-6 py-6 bg-red-50 dark:bg-red-900/10 border-l-4 border-red-500 rounded-xl shadow-sm">
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
          If you’ve exceeded your daily limit, please check back tomorrow or
          upgrade your plan.
        </p>
      </div>
    );
  }

  // render ai comparison
  if (markdown) {
    return (
      <div className="mt-6 p-6 bg-gray-50 dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-950 dark:to-blue-950 border-l-4 border-green-500 rounded-xl shadow space-y-4">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="prose prose-sm sm:prose lg:prose-lg prose-orange prose-li:marker:text-orange-400 text-gray-800 dark:text-gray-200 max-w-none"
        >
          <MarkdownRenderer content={markdown} />
        </motion.article>
      </div>
    );
  }
  // default message
  return (
    <p className="text-gray-500 dark:text-gray-400 italic text-center">
      ⚡ AI‑powered insights are on the way. Watch this space!
    </p>
  );
};

export default AiPane;
