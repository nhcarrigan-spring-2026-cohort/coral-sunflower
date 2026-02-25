import type { Announcement } from "@repo/types/announcement";
import type React from "react";

interface AnnouncementListProps {
  announcements: Announcement[];
}

const AnnouncementList: React.FC<AnnouncementListProps> = ({ announcements }) => {
  // Filter out expired announcements
  const activeAnnouncements = announcements.filter((item) => {
    if (!item.expirationDate) return true;
    const expiryDate = new Date(item.expirationDate);
    const today = new Date();
    // Reset time to start of day for clean comparison
    today.setHours(0, 0, 0, 0);
    return expiryDate >= today;
  });

  if (activeAnnouncements.length === 0) {
    return <p>No announcements yet. Check back later!</p>;
  }

  return (
    <div>
      <h3>Community Announcements</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {activeAnnouncements.map((item) => (
          <div
            key={item.id}
            style={{
              padding: "15px",
              border: "1px solid #eee",
              borderRadius: "6px",
              backgroundColor: "#fafafa",
              color: "#333",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h4 style={{ margin: "0 0 10px 0" }}>{item.title}</h4>
              {item.expirationDate && (
                <span style={{ fontSize: "0.8em", color: "#888" }}>
                  Expires: {new Date(item.expirationDate).toLocaleDateString()}
                </span>
              )}
            </div>
            {/* biome-ignore lint: rendering rich text from admin editor */}
            <div style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: item.content }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnnouncementList;
