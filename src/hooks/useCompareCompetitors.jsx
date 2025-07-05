import { useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

export default function useCompareCompetitors(userSiteUrl = "") {
  /* ---------- helpers ---------- */
  const validateUrlFormat = (value) => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  };
  const normalize = (u) =>
    u
      .replace(/^https?:\/\//i, "")
      .replace(/\/$/, "")
      .toLowerCase();
  const userNorm = normalize(userSiteUrl);

  /* ---------- state ---------- */
  const emptyRow = { url: "", label: "", isValidFormat: false };
  const [competitors, setCompetitors] = useState([emptyRow]);
  const [duplicateFlags, setDuplicateFlags] = useState([false]);
  const [loading, setLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [comparison, setComparison] = useState(null);

  /* ---------- input handlers ---------- */
  const handleCompetitorChange = (index, field, value) => {
    if (loading) return;
    const trimmed = value.trim();

    const nextC = [...competitors];
    const nextDup = [...duplicateFlags];

    nextC[index][field] = trimmed;
    if (field === "url") {
      const validFmt = validateUrlFormat(trimmed);
      const dup = normalize(trimmed) === userNorm;
      nextC[index].isValidFormat = validFmt;
      nextDup[index] = dup;
    }

    setCompetitors(nextC);
    setDuplicateFlags(nextDup);
  };

  // add competitors
  const addCompetitor = () => {
    if (loading) return;
    setCompetitors((prev) => {
      if (prev.length >= 3) {
        toast("You can compare up to 3 competitors only.");
        return prev;
      }
      setDuplicateFlags((d) => [...d, false]);
      return [...prev, { url: "", label: "", isValidFormat: false }];
    });
  };

  // remove competitor
  const removeCompetitor = (index) => {
    if (loading) return;
    setCompetitors((prev) => prev.filter((_, i) => i !== index));
    setDuplicateFlags((prev) => prev.filter((_, i) => i !== index));
  };

  /* ---------- reachability helper ---------- */
  const checkReachable = async (raw) => {
    const full = /^https?:/i.test(raw) ? raw : `https://${raw}`;
    try {
      const res = await api.post("/api/url/check", { url: full });

      // Your /check route returns 200 with {success:false} for 404-ish cases
      return res.data?.success ? "ok" : "bad";
    } catch (err) {
      const code = err.response?.status; // undefined for DNS/timeout
      // 5xx from /check gets special treatment
      return code === 500 ? "server" : "bad";
    }
  };
  /* ---------- submit ---------- */
  const handleCompare = async () => {
    setHasSubmitted(true);
    if (loading) return;

    const filled = competitors
      .map((c, i) => ({ ...c, dup: duplicateFlags[i] }))
      .filter((c) => c.url.trim());

    if (filled.length === 0) {
      toast.error("Please enter at least one competitor URL.");
      return;
    }
    if (filled.some((c) => c.dup)) {
      toast.error(
        "A competitor URL matches your own site. Please enter a different URL."
      );
      return;
    }
    if (filled.some((c) => !c.isValidFormat)) {
      toast.error("One or more competitor URLs are invalid.");
      return;
    }

    /* ---- 200‑status reachability checks ---- */
    setLoading(true);
    try {
      /* --- SINGLE reachability probe --- */
      const statuses = await Promise.all(
        filled.map((c) => checkReachable(c.url.trim()))
      );

      /* ------ case 1: bad addresses (4xx / network) ------ */
      if (statuses.some((s) => s === "bad")) {
        toast.error(
          "One or more competitor URLs could not be reached. Please check the addresses and try again."
        );
        setLoading(false);
        return; // ⛔️ abort – let user edit
      }

      /* ------ case 2: server 5xx – soft notice ------ */
      if (statuses.some((s) => s === "server")) {
        toast(
          "Some sites could not be analysed – they’ll show ‘Data not available’."
        );
        // continue to /api/compare
      }

      /* ---- run comparison ---- */
      const { data } = await api.post("/api/compare", {
        userSiteUrl,
        competitors: filled.map(({ url, label }) => ({
          url: url.trim(),
          label,
        })),
      });

      if (data.success) {
        setComparison(data.comparison);
        if (data.partial) toast("Some competitors had no data.");
        setCompetitors([emptyRow]);
        setDuplicateFlags([false]);
        setHasSubmitted(false);
      } else {
        toast.error(data.message || "Comparison failed.");
      }
    } catch (err) {
      console.error("[handleCompare] unexpected", err);
      toast.error("Server error while comparing.");
    } finally {
      setLoading(false);
    }
  };

  return {
    competitors,
    duplicateFlags,
    handleCompetitorChange,
    addCompetitor,
    removeCompetitor,
    handleCompare,
    loading,
    hasSubmitted,
    comparison,
  };
}
