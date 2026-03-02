export interface Announcement {
  id: number;
  title: string;
  content: string; // Using string for date to make it easy to pass via JSON
  expiry: string | null;
}
