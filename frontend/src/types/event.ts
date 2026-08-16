export type EventType =
  | "RACE"
  | "TEST_DAY"
  | "SPECIAL_EVENT";

export type EventStatus =
  | "DRAFT"
  | "PUBLISHED"
  | "CANCELLED"
  | "FINISHED";

export interface EventReference {
  _id: string;
  name?: string;
  title?: string;
  slug?: string;
}

export interface Event {
  _id: string;
  title: string;
  slug: string;
  type: EventType;
  status: EventStatus;
  date: string;
  description: string;
  circuit: EventReference;
  layout: EventReference;
  categories: EventReference[];
  imageUrl: string | null;
  registrationUrl: string | null;
  createdAt: string;
  updatedAt: string;
}