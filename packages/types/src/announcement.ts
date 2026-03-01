export interface Announcement {
  id: string;
  title: string;
  content: string; // Using string for date to make it easy to pass via JSON
  expirationDate: string | null;
}
