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
  const [competitors, setCompetitors] = useState([
    { url: "", label: "", isValidFormat: false },
  ]);
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
      return res.data?.success;
    } catch (err) {
      console.log(
        "[checkReachable][ERROR]",
        full,
        err.response?.status,
        err.response?.data
      );
      return false;
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
      toast.error("A competitor URL matches your own site.");
      return;
    }
    if (filled.some((c) => !c.isValidFormat)) {
      toast.error("One or more competitor URLs are invalid.");
      return;
    }

    /* ---- 200‑status reachability checks ---- */
    setLoading(true);
    try {
      const reachable = await Promise.all(
        filled.map((c) => checkReachable(c.url.trim()))
      );

      if (reachable.some((ok) => !ok)) {
        toast.error("One or more competitor URLs could not be reached.");
        setLoading(false);
        return;
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
      } else {
        toast.error(data.message || "Comparison failed.");
      }
    } catch {
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
