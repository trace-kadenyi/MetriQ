import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useSearchParams } from "react-router-dom";

import errorGif from "../assets/error.gif";

const PreviousReports = () => {
  const [prevReports, setPrevReports] = useState([]);
  const [errorOccurred, setErrorOccurred] = useState(false);
  const [searchParams] = useSearchParams();
  const url = searchParams.get("url");
  const navigate = useNavigate();

  useEffect(() => {
    // fetch reports from API
    const fetchPrevReports = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/url/report?url=${encodeURIComponent(url)}`
        );
        if (res.data.success) {
          setPrevReports(res.data.report);
        } else {
          toast.error(`No reports found for ${url}`);
          setErrorOccurred(true);
        }
      } catch (err) {
        console.error("Error fetching reports: ", err);

        setErrorOccurred(true);
      }
    };

    if (url) fetchPrevReports();
  }, [url]);

  return (
    <main className="p-6">
      {/* handle error display */}
      {errorOccurred ? (
        <section className="p-6 h-screen bg-gray-100 flex justify-center items-center">
          {errorOccurred && (
            <div className="text-center bg-white p-8 rounded-lg shadow-md max-w-md">
              <img
                src={errorGif}
                alt="No data found"
                className="w-32 h-32 mx-auto"
              />
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                No reports found for this URL
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                We couldn’t find any past reports for:
                <span className="block mt-1 text-gray-500 italic break-words">
                  {url}
                </span>
              </p>
              <button
                onClick={() => navigate("/")}
                className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Back to Home
              </button>
            </div>
          )}
        </section>
      ) : (
        // handle main content
        <section>
          <h2>Previous reports</h2>
        </section>
      )}
    </main>
  );
};

export default PreviousReports;
