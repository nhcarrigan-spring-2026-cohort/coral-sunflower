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
        backgroundColor: "#fff",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "20px",
        padding: "20px",
      }}
    >
      <h3>Create New Announcement</h3>

      {/* Display error message if it exists */}
      {error && (
        <div
          style={{
            backgroundColor: "#ffebee",
            border: "1px solid #ef9a9a",
            borderRadius: "4px",
            color: "#c62828",
            marginBottom: "10px",
            padding: "10px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="announcement-title" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Title
          </label>
          <input
            id="announcement-title"
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            style={{
              border: "1px solid #ccc",
              borderRadius: "4px",
              boxSizing: "border-box",
              padding: "8px",
              width: "100%",
            }}
            type="text"
            value={title}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label htmlFor="announcement-content" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Content (Rich Text)
          </label>
          <div id="announcement-content">
            <RichTextEditor onChange={setContent} placeholder="Write your announcement here..." value={content} />
          </div>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>
            Expiration Date (Optional)
            <input
              onChange={(e) => setExpiry(e.target.value)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                boxSizing: "border-box",
                display: "block",
                marginTop: "5px",
                padding: "8px",
                width: "100%",
              }}
              type="date"
              value={expiry}
            />
          </label>
        </div>

        <button style={{ cursor: "pointer", padding: "10px 20px" }} type="submit">
          Post Announcement
        </button>
      </form>
    </div>
  );
};

export default AnnouncementForm;
