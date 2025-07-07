import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      components={{
        h2({ children }) {
          return (
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mt-10 mb-5 underline underline-offset-4">
              {children}
            </h2>
          );
        },
        h3({ children }) {
          return (
            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-300 mt-8 mb-4 underline underline-offset-4">
              {children}
            </h3>
          );
        },
        h4({ children }) {
          return (
            <h3 className="font-semibold text-gray-800 dark:text-gray-300 mt-8 mb-4">
              {children}
            </h3>
          );
        },
        p({ children }) {
          return (
            <p className="my-4 text-black dark:text-gray-300 leading-relaxed">
              {children}
            </p>
          );
        },
        ul({ children }) {
          return (
            <ul className="my-4 list-disc pl-6 text-black dark:text-gray-300">
              {children}
            </ul>
          );
        },
        ol({ children }) {
          return (
            <ol className="my-4 list-decimal pl-6 text-black dark:text-gray-300">
              {children}
            </ol>
          );
        },
        li({ children }) {
          return <li className="mb-2">{children}</li>;
        },
        strong({ children }) {
          return (
            <strong className="font-semibold text-gray-800 dark:text-gray-300">
              {children}
            </strong>
          );
        },
        em({ children }) {
          return (
            <em className="font-semibold text-gray-800 dark:text-gray-300 italic">
              {children}
            </em>
          );
        },
        code({ inline, children }) {
          return inline ? (
            <code className="bg-gray-100 rounded px-1 text-red-500 text-sm">
              {children}
            </code>
          ) : (
            <pre className="bg-gray-800 text-white dark:text-gray-300 p-4 rounded overflow-x-auto text-sm my-6">
              <code>{children}</code>
            </pre>
          );
        },
        // 💡 Table Support
        table({ children }) {
          return (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border border-gray-300 dark:border-gray-600 text-sm text-left">
                {children}
              </table>
            </div>
          );
        },
        thead({ children }) {
          return (
            <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
              {children}
            </thead>
          );
        },
        tbody({ children }) {
          return <tbody>{children}</tbody>;
        },
        tr({ children }) {
          return (
            <tr className="border-b border-gray-200 dark:border-gray-700">
              {children}
            </tr>
          );
        },
        th({ children }) {
          return (
            <th className="px-4 py-2 font-medium border border-gray-300 dark:border-gray-600">
              {children}
            </th>
          );
        },
        td({ children }) {
          return (
            <td className="px-4 py-2 border border-gray-200 dark:border-gray-700">
              {children}
            </td>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
