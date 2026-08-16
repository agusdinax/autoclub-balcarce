export type EventStatus =
  | "upcoming"
  | "completed"
  | "cancelled";

export interface Event {
  id: string;
  title: string;
  description?: string;
  date: string;
  location: string;
  image: string;
  type: string;
  status: EventStatus;
}