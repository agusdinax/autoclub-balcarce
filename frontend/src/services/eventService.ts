import { apiGet } from "./api";

import type { Event } from "../types";

export interface EventFilters {
  type?: string;
  status?: string;
  circuit?: string;
  from?: string;
  to?: string;
}

export const eventService = {
  async getAll(
    filters?: EventFilters,
  ): Promise<Event[]> {
    const params = new URLSearchParams();

    if (filters?.type) {
      params.set("type", filters.type);
    }

    if (filters?.status) {
      params.set("status", filters.status);
    }

    if (filters?.circuit) {
      params.set("circuit", filters.circuit);
    }

    if (filters?.from) {
      params.set("from", filters.from);
    }

    if (filters?.to) {
      params.set("to", filters.to);
    }

    const query = params.toString();

    const endpoint = query
      ? `/events?${query}`
      : "/events";

    return apiGet<Event[]>(endpoint);
  },

  async getById(id: string): Promise<Event> {
    return apiGet<Event>(
      `/events/${id}`,
    );
  },
};