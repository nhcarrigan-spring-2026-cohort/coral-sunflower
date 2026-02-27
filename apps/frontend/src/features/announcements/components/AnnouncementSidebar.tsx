import type React from "react";
import AnnouncementForm from "./AnnouncementForm";

interface AnnouncementSidebarProps {
  onAdd: (title: string, content: string, expiry: string) => void;
  isAdmin: boolean;
}

const AnnouncementSidebar: React.FC<AnnouncementSidebarProps> = ({ onAdd, isAdmin }) => {
  // We only want admins to see the creation tools, so we bail early if they aren't authorized.
  if (!isAdmin) {
    return null; // Don't show the sidebar if the user isn't an admin
  }

  return (
    <aside
      style={{
        width: "350px",
        padding: "20px",
        borderLeft: "1px solid #ddd",
        backgroundColor: "#fdfdfd",
        height: "calc(100vh - 40px)",
        position: "sticky",
        top: "20px",
        overflowY: "auto",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", marginBottom: "20px", color: "#2c3e50" }}>Admin Panel</h2>
      <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "20px" }}>
        Use this form to post new community announcements.
      </p>
      <AnnouncementForm onAdd={onAdd} />
      <div style={{ marginTop: "20px", padding: "15px", backgroundColor: "#eef2f7", borderRadius: "6px" }}>
        <h4 style={{ fontSize: "0.9rem", margin: "0 0 10px 0" }}>Pro Tip</h4>
        <p style={{ fontSize: "0.8rem", margin: 0, color: "#555" }}>
          Expired announcements are automatically hidden from the main dashboard to keep things tidy.
        </p>
      </div>
    </aside>
  );
};

export default AnnouncementSidebar;
