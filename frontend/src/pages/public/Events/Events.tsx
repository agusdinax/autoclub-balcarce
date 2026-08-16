import { Container } from "../../../components/common/Container/Container";
import { SectionTitle } from "../../../components/common/SectionTitle/SectionTitle";
import { EventCard } from "../../../components/events/EventCard/EventCard";

import type { Event } from "../../../types";

import "./Events.scss";


export function Events() {
  const {
    events,
    loading,
    error,
    refetch,
  } = useEvents();

  return (
    <div className="events-page">

      {/* Hero */}

      <section>
        <Container>

          {/* Loading */}
          {loading && (
            <Loading
              message="Loading events..."
            />
          )}

          {/* Error */}
          {!loading && error && (
            <ErrorState
              title="Events unavailable"
              description={error}
              onRetry={refetch}
            />
          )}

          {/* Empty */}
          {!loading &&
            !error &&
            events.length === 0 && (
              <EmptyState
                title="No events found"
                description="There are currently no events available."
              />
            )}

          {/* Data */}
          {!loading &&
            !error &&
            events.length > 0 && (
              <div className="events-page__grid">
                {events.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                  />
                ))}
              </div>
            )}

        </Container>
      </section>

    </div>
  );
}