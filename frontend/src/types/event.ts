export enum EventType {
  RACE = "RACE",
  TEST_DAY = "TEST_DAY",
  SPECIAL_EVENT = "SPECIAL_EVENT",
}

export enum EventStatus {
  DRAFT = "DRAFT",
  PUBLISHED = "PUBLISHED",
  CANCELLED = "CANCELLED",
  FINISHED = "FINISHED",
}

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