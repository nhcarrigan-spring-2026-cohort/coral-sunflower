import type { Announcement } from "@repo/types/announcement";
import { supabase } from "@supabase/client.ts";
import { useContext, useEffect, useState } from "react";
import AnnouncementList from "@/components/announcements/AnnouncementList";
import AnnouncementSidebar from "@/components/announcements/AnnouncementSidebar";
import PlotTable from "@/components/plots/PlotTable.tsx";
import { Button } from "@/components/ui/button";
import { UserContext } from "@/context/userContext.tsx";

const fetchAnnouncements = () => supabase.from("announcement").select("id, title, content, expiry");

export const Dashboard = () => {
  const { isLoading, user } = useContext(UserContext);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isAdmin, setIsAdmin] = useState(true);
  const [showPlots, setShowPlots] = useState(false);

  useEffect(() => {
    if (isLoading) {
      return;
    }

    const fetchData = async () => {
      const { data, error } = await fetchAnnouncements();

      if (!data || error) {
        console.log({ error });
        return;
      }

      setAnnouncements(data);
    };

    fetchData();
  }, [isLoading]);

  const handleAddAnnouncement = async (title: string, content: string, expiry: string) => {
    if (!user) {
      return;
    }

    const { data, error } = await supabase
      .from("announcement")
      .upsert({
        author_uid: user.id,
        content,
        expiry: new Date(expiry).toISOString(),
        title,
      })
      .select("id, title, content, expiry");

    if (error) {
      console.log({ error });
      return;
    }

    setAnnouncements([...announcements, ...data]);
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
