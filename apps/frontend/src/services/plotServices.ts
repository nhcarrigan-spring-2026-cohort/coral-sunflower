export type Responsibility = {
  id: string;
  description: string;
  initialCompleted: boolean;
};

export type PlotData = {
  userId: string;
  plotId: string;
  size: string;
  leaseStartDate: string;
  leaseEndDate: string;
  leaseStatus: "Active" | "Warning" | "Overdue";
  responsibilities: Responsibility[];
};

//  simulate an async API call with a Promise
export const fetchMyPlotData = async (): Promise<PlotData> => {
  // simulating network delay
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        leaseEndDate: "2026-10-31",
        leaseStartDate: "2025-03-01",
        leaseStatus: "Active",
        plotId: "B-14",
        responsibilities: [
          {
            description: "Mow shared path (Section B) by Sunday",
            id: "101",
            initialCompleted: false,
          },
          {
            description: "Clean communal tool shed on Wednesday",
            id: "102",
            initialCompleted: true, // Let's make one completed for testing
          },
          {
            description: "Ensure water spigot B is turned off daily",
            id: "103",
            initialCompleted: false,
          },
        ],
        size: "10x10 In-Ground",
        userId: "t12457",
      });
    }, 500); // 500 ms delay
  });
};
