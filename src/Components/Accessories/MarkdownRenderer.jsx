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
      }}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
