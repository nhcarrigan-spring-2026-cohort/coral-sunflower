import type { Plot } from "@repo/types/plot";
import type { User } from "@repo/types/user";
import type React from "react";
import { useState } from "react";

// Just some mock users so we have something to search for
const MOCK_USERS: User[] = [
  { email: "user1@example.com", id: "u1", name: "User1" },
  { email: "user2@example.com", id: "u2", name: "User2" },
  { email: "user3@example.com", id: "u3", name: "User3" },
];

const PlotTable: React.FC = () => {
  // Let's start with some dummy plots
  const [plots, setPlots] = useState<Plot[]>([
    { assignedUserId: "u1", description: "Good soil, lots of sun.", id: "1", number: "Plot 01" },
    { assignedUserId: null, description: "Near the water tap. Very convenient.", id: "2", number: "Plot 02" },
    { assignedUserId: null, description: "Smallest one, but cute.", id: "3", number: "Plot 03" },
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
      <table style={{ border: "1px solid #ddd", borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Plot #</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Assigned To</th>
            <th style={{ border: "1px solid #ddd", padding: "12px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {plots.map((plot) => (
            <tr key={plot.id}>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>{plot.number}</td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                {getUserName(plot.assignedUserId)}
                {plot.assignedUserId && (
                  <button
                    onClick={() => handleUnassign(plot.id)}
                    style={{ background: "none", border: "none", color: "red", cursor: "pointer", marginLeft: "10px" }}
                    type="button"
                  >
                    (X)
                  </button>
                )}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "12px" }}>
                <button
                  onClick={() => setViewingPlot(plot)}
                  style={{ cursor: "pointer", marginRight: "10px", padding: "5px 10px" }}
                  type="button"
                >
                  Info
                </button>
                <button
                  onClick={() => setAssigningToPlot(plot.id)}
                  style={{ cursor: "pointer", padding: "5px 10px" }}
                  type="button"
                >
                  Assign User
                </button>

                {assigningToPlot === plot.id && (
                  <div
                    style={{
                      backgroundColor: "white",
                      border: "1px solid #ccc",
                      boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
                      padding: "10px",
                      position: "absolute",
                      zIndex: 100,
                    }}
                  >
                    <input
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search user..."
                      style={{ marginBottom: "5px", padding: "5px" }}
                      type="text"
                      value={searchTerm}
                    />
                    <div style={{ maxHeight: "150px", overflowY: "auto" }}>
                      {MOCK_USERS.filter((u) => u.name.toLowerCase().includes(searchTerm.toLowerCase())).map((user) => (
                        <button
                          key={user.id}
                          onClick={() => handleAssign(plot.id, user.id)}
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            borderBottom: "1px solid #eee",
                            cursor: "pointer",
                            display: "block",
                            padding: "8px",
                            textAlign: "left",
                            width: "100%",
                          }}
                          type="button"
                        >
                          {user.name}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={() => setAssigningToPlot(null)}
                      style={{ marginTop: "5px", width: "100%" }}
                      type="button"
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
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            height: "100%",
            justifyContent: "center",
            left: 0,
            position: "fixed",
            top: 0,
            width: "100%",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              maxWidth: "400px",
              padding: "30px",
              width: "90%",
            }}
          >
            <h3>{viewingPlot.number} Details</h3>
            <p style={{ lineHeight: "1.6", margin: "20px 0" }}>{viewingPlot.description}</p>
            <button
              onClick={() => setViewingPlot(null)}
              style={{ cursor: "pointer", padding: "10px 20px", width: "100%" }}
              type="button"
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
