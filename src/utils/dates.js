// When a database record was created: the stored createdAt timestamp if present,
// otherwise read from the Mongo ObjectId (its first 8 hex chars are the creation time)
export const createdDate = (doc = {}) => {
  if (doc.createdAt) return new Date(doc.createdAt);
  const seconds = parseInt(String(doc._id || "").slice(0, 8), 16);
  return Number.isFinite(seconds) ? new Date(seconds * 1000) : null;
};

export const formatDate = (date) =>
  date ? date.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }) : "—";

export const formatDateTime = (date) =>
  date
    ? date.toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit" })
    : "—";
