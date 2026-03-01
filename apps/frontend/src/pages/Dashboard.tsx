import type { Announcement } from "@repo/types/announcement";
import { useState } from "react";
import AnnouncementList from "@/components/announcements/AnnouncementList";
import AnnouncementSidebar from "@/components/announcements/AnnouncementSidebar";
import { Button } from "@/components/ui/button";
import { PlotTable } from "../features/plots";

export const Dashboard = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showPlots, setShowPlots] = useState(false);

  const handleAddAnnouncement = (title: string, content: string, expiry: string) => {
    console.log("Sending to API: POST /api/announcements", {
      content,
      expiry,
      title,
    });

    const newAnnouncement: Announcement = {
      content,
      expirationDate: expiry || null,
      id: Math.random().toString(36).substring(2, 11),
      title,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
  };

  return (
    <div
      style={{
        display: "flex",
        fontFamily: "Inter, system-ui, sans-serif",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          flex: 1,
          margin: "0 auto",
          maxWidth: "900px",
          padding: "40px",
        }}
      >
        <header
          style={{
            alignItems: "center",
            display: "flex",
            gap: "12px",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <h1 style={{ color: "#1a202c", margin: 0 }}>Community Garden</h1>
          <Button onClick={() => setIsAdmin(!isAdmin)} variant="secondary">
            Switch to {isAdmin ? "User View" : "Admin View"}
          </Button>

          {isAdmin && (
            <Button onClick={() => setShowPlots(!showPlots)} variant="outline">
              {showPlots ? "View Announcements" : "Manage Plots"}
            </Button>
          )}
        </header>

        <div style={{ animation: "fadeIn 0.5s ease-in" }}>
          <div style={{ marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Dashboard</h2>
            <p style={{ color: "#718096" }}>Welcome back to the garden portal. Here are the latest updates.</p>
          </div>
          <hr
            style={{
              border: "none",
              borderBottom: "1px solid #e2e8f0",
              margin: "30px 0",
            }}
          />

          {isAdmin && showPlots ? <PlotTable /> : <AnnouncementList announcements={announcements} />}
        </div>
      </div>

      <AnnouncementSidebar isAdmin={isAdmin} onAdd={handleAddAnnouncement} />
    </div>
  );
};
