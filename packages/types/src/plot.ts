export interface Plot {
  id: string;
  number: string; // Like "Plot 01" or something
  description: string;
  assignedUserId: string | null; // null means it's free real estate
}
