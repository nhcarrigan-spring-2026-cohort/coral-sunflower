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
        userId: "t12457",
        plotId: "B-14",
        size: "10x10 In-Ground",
        leaseStartDate: "2025-03-01",
        leaseEndDate: "2026-10-31",
        leaseStatus: "Active",
        responsibilities: [
          {
            id: "101",
            description: "Mow shared path (Section B) by Sunday",
            initialCompleted: false,
          },
          {
            id: "102",
            description: "Clean communal tool shed on Wednesday",
            initialCompleted: true, // Let's make one completed for testing
          },
          {
            id: "103",
            description: "Ensure water spigot B is turned off daily",
            initialCompleted: false,
          },
        ],
      });
    }, 500); // 500 ms delay
  });
};
