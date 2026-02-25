import type React from "react";
import { useState } from "react";
import RichTextEditor from "./RichTextEditor";

// We'll define a local type for the form state to keep it simple
interface AnnouncementFormProps {
  onAdd: (title: string, content: string, expiry: string) => void;
}

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ onAdd }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // This will now hold HTML
  const [expiry, setExpiry] = useState("");
  const [error, setError] = useState(""); // New state for error messages

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    // Basic validation
    // Note: For rich text, we check if it's not just whitespace or empty tags
    const isContentEmpty = !content.replace(/<[^>]*>/g, "").trim();

    if (!title || isContentEmpty) {
      setError("Please fill in both title and content");
      return;
    }

    // Date validation
    if (expiry) {
      const expiryDate = new Date(expiry);
      const today = new Date();
      // Reset time to start of day for comparison
      today.setHours(0, 0, 0, 0);

      if (expiryDate < today) {
        setError("The expiration date cannot be in the past. Please choose today or a future date.");
        return;
      }
    }

    onAdd(title, content, expiry);

    // Reset form after submit
    setTitle("");
    setContent("");
    setExpiry("");
  };

  return (
    <div
      style={{
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
        backgroundColor: "#fff",
      }}
    >
      <h3>Create New Announcement</h3>

      {/* Display error message if it exists */}
      {error && (
        <div
          style={{
            padding: "10px",
            backgroundColor: "#ffebee",
            color: "#c62828",
            borderRadius: "4px",
            marginBottom: "10px",
            border: "1px solid #ef9a9a",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="announcement-title" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Title
          </label>
          <input
            id="announcement-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              width: "100%",
              padding: "8px",
              boxSizing: "border-box",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
            placeholder="Enter announcement title"
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="announcement-content" style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Content (Rich Text)
          </label>
          <div id="announcement-content">
            <RichTextEditor value={content} onChange={setContent} placeholder="Write your announcement here..." />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}>
            Expiration Date (Optional)
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                boxSizing: "border-box",
                display: "block",
                marginTop: "5px",
                border: "1px solid #ccc",
                borderRadius: "4px",
              }}
            />
          </label>
        </div>

        <button type="submit" style={{ padding: "10px 20px", cursor: "pointer" }}>
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
