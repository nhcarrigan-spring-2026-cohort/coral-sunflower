import type React from "react";
import AnnouncementForm from "./AnnouncementForm";

interface AnnouncementSidebarProps {
  onAdd: (title: string, content: string, expiry: string) => void;
  isAdmin: boolean;
}

const AnnouncementSidebar: React.FC<AnnouncementSidebarProps> = ({ onAdd, isAdmin }) => {
  // We only want admins to see the creation tools, so we bail early if they aren't authorized.
  if (!isAdmin) {
    return null;
  }

  return (
    <aside
      style={{
        backgroundColor: "#fdfdfd",
        borderLeft: "1px solid #ddd",
        height: "calc(100vh - 40px)",
        overflowY: "auto",
        padding: "20px",
        position: "sticky",
        top: "20px",
        width: "350px",
      }}
    >
      <h2 style={{ color: "#2c3e50", fontSize: "1.2rem", marginBottom: "20px" }}>Admin Panel</h2>
      <p style={{ color: "#666", fontSize: "0.9rem", marginBottom: "20px" }}>
        Use this form to post new community announcements.
      </p>
      <AnnouncementForm onAdd={onAdd} />
      <div style={{ backgroundColor: "#eef2f7", borderRadius: "6px", marginTop: "20px", padding: "15px" }}>
        <h4 style={{ fontSize: "0.9rem", margin: "0 0 10px 0" }}>Pro Tip</h4>
        <p style={{ color: "#555", fontSize: "0.8rem", margin: 0 }}>
          Expired announcements are automatically hidden from the main dashboard to keep things tidy.
        </p>
      </div>
    </aside>
  );
};

export default AnnouncementSidebar;
