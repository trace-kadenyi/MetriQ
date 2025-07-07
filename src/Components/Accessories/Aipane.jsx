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

  // render ia error
  if (error) {
    return (
      <p className="text-red-600 dark:text-red-400 text-sm text-center">
        {error}
      </p>
    );
  }

  // render ai comparison
  if (markdown) {
    return (
      <div className="mt-6 p-6 bg-white dark:bg-gradient-to-b dark:from-blue-950 dark:via-gray-950 dark:to-blue-950 border-l-4 border-green-500 rounded-xl shadow space-y-4">
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
