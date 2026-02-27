import type { Announcement } from "@repo/types/announcement";
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AnnouncementList, AnnouncementSidebar } from "./features/announcements";
import { PlotTable } from "./features/plots";

function App() {
  // Temporary state to show how the components work together
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState(true); // Mock admin state
  const [showPlots, setShowPlots] = useState(false); // Toggle between announcements and plots

  const handleAddAnnouncement = (title: string, content: string, expiry: string) => {
    // In a real app, this would be a fetch() call to POST /api/announcements
    console.log("Sending to API: POST /api/announcements", { title, content, expiry });

    const newAnnouncement: Announcement = {
      id: Math.random().toString(36).substring(2, 11),
      title,
      content,
      expirationDate: expiry || null,
    };
    setAnnouncements([newAnnouncement, ...announcements]);
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Inter, system-ui, sans-serif" }}>
      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
        <header
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}
        >
          <h1 style={{ margin: 0, color: "#1a202c" }}>Community Garden</h1>
          <button
            type="button"
            onClick={() => setIsAdmin(!isAdmin)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "none",
              backgroundColor: isAdmin ? "#4a5568" : "#3182ce",
              color: "white",
              cursor: "pointer",
            }}
          >
            Switch to {isAdmin ? "User View" : "Admin View"}
          </button>

          {isAdmin && (
            <button
              type="button"
              onClick={() => setShowPlots(!showPlots)}
              style={{
                padding: "8px 16px",
                borderRadius: "20px",
                border: "1px solid #3182ce",
                backgroundColor: "transparent",
                color: "#3182ce",
                cursor: "pointer",
                marginLeft: "10px",
              }}
            >
              {showPlots ? "View Announcements" : "Manage Plots"}
            </button>
          )}
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <div style={{ animation: "fadeIn 0.5s ease-in" }}>
                <div style={{ marginBottom: "30px" }}>
                  <h2 style={{ fontSize: "1.5rem", marginBottom: "10px" }}>Dashboard</h2>
                  <p style={{ color: "#718096" }}>Welcome back to the garden portal. Here are the latest updates.</p>
                </div>
                <hr style={{ border: "none", borderBottom: "1px solid #e2e8f0", margin: "30px 0" }} />

                {isAdmin && showPlots ? <PlotTable /> : <AnnouncementList announcements={announcements} />}
              </div>
            }
          />
        </Routes>
      </div>

      {/* Admin Sidebar - Only visible if isAdmin is true */}
      <AnnouncementSidebar onAdd={handleAddAnnouncement} isAdmin={isAdmin} />
    </div>
  );
}

export default App;
