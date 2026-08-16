import {
  useCallback,
  useEffect,
  useState,
} from "react";

import {
  eventService,
  type EventFilters,
} from "../services/eventService";

import type { Event } from "../types";

interface UseEventsResult {
  events: Event[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useEvents(
  filters?: EventFilters,
): UseEventsResult {
  const [events, setEvents] =
    useState<Event[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState<string | null>(null);

  const loadEvents = useCallback(
    async () => {
      try {
        setLoading(true);
        setError(null);

        const data =
          await eventService.getAll(filters);

        setEvents(data);
      } catch (err) {
        console.error(err);

        setError(
          "Unable to load events.",
        );
      } finally {
        setLoading(false);
      }
    },
    [filters],
  );

  useEffect(() => {
    void loadEvents();
  }, [loadEvents]);

  return {
    events,
    loading,
    error,
    refetch: loadEvents,
  };
}