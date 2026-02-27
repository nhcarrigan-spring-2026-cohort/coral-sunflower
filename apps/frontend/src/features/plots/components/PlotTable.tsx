import type { Plot, User } from "@repo/types/announcement";
import type React from "react";
import { useState } from "react";

// Just some mock users so we have something to search for
const MOCK_USERS: User[] = [
  { id: "u1", name: "User1", email: "user1@example.com" },
  { id: "u2", name: "User2", email: "user2@example.com" },
  { id: "u3", name: "User3", email: "user3@example.com" },
];

const PlotTable: React.FC = () => {
  // Let's start with some dummy plots
  const [plots, setPlots] = useState<Plot[]>([
    { id: "1", number: "Plot 01", description: "Good soil, lots of sun.", assignedUserId: "u1" },
    { id: "2", number: "Plot 02", description: "Near the water tap. Very convenient.", assignedUserId: null },
    { id: "3", number: "Plot 03", description: "Smallest one, but cute.", assignedUserId: null },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [assigningToPlot, setAssigningToPlot] = useState<string | null>(null);
  const [viewingPlot, setViewingPlot] = useState<Plot | null>(null);

  // Helper to find name from ID
  const getUserName = (userId: string | null) => {
    if (!userId) return "None";
    const user = MOCK_USERS.find((u) => u.id === userId);
    return user ? user.name : "Unknown";
  };

  const handleUnassign = (plotId: string) => {
    // Just clearing the user ID
    setPlots(plots.map((p) => (p.id === plotId ? { ...p, assignedUserId: null } : p)));
  };

  const handleAssign = (plotId: string, userId: string) => {
    setPlots(plots.map((p) => (p.id === plotId ? { ...p, assignedUserId: userId } : p)));
    setAssigningToPlot(null);
    setSearchTerm("");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ marginBottom: "20px" }}>Garden Plot Management</h2>
      <table style={{ width: "100%", borderCollapse: "collapse", border: "1px solid #ddd" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Plot #</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Assigned To</th>
            <th style={{ padding: "12px", border: "1px solid #ddd" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plots.map((plot) => (
            <tr key={plot.id}>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>{plot.number}</td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                {getUserName(plot.assignedUserId)}
                {plot.assignedUserId && (
                  <button
                    type="button"
                    onClick={() => handleUnassign(plot.id)}
                    style={{ marginLeft: "10px", color: "red", border: "none", background: "none", cursor: "pointer" }}
                  >
                    (X)
                  </button>
                )}
              </td>
              <td style={{ padding: "12px", border: "1px solid #ddd" }}>
                <button
                  type="button"
                  style={{ marginRight: "10px", padding: "5px 10px", cursor: "pointer" }}
                  onClick={() => setViewingPlot(plot)}
                >
                  Info
                </button>
                <button
                  type="button"
                  style={{ padding: "5px 10px", cursor: "pointer" }}
                  onClick={() => setAssigningToPlot(plot.id)}
                >
                  Assign User
                </button>

                {assigningToPlot === plot.id && (
                  <div
                    style={{
                      position: "absolute",
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      padding: "10px",
                      zIndex: 100,
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Search user..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      style={{ padding: "5px", marginBottom: "5px" }}
                    />
                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {MOCK_USERS.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                        <button
                          type="button"
                          key={user.id}
                          style={{
                            display: "block",
                            width: "100%",
                            padding: "8px",
                            textAlign: "left",
                            cursor: "pointer",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            backgroundColor: "white",
                          }}
                          onClick={() => handleAssign(plot.id, user.id)}
                        >
                          {user.name}
                        </button>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => setAssigningToPlot(null)}
                      style={{ marginTop: "5px", width: "100%" }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Basic Modal for Plot Info */}
      {viewingPlot && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "8px",
              maxWidth: "400px",
              width: "90%",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{viewingPlot.number} Details</h3>
            <p style={{ margin: "20px 0", lineHeight: "1.6" }}>{viewingPlot.description}</p>
            <button
              type="button"
              onClick={() => setViewingPlot(null)}
              style={{ padding: "10px 20px", cursor: "pointer", width: "100%" }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlotTable;
