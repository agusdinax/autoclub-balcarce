import { useEvents } from "../../../hooks/useEvents";

import { Container } from "../../../components/common/Container/Container";
import { SectionTitle } from "../../../components/common/SectionTitle/SectionTitle";
import { Loading } from "../../../components/common/Loading/Loading";
import { ErrorState } from "../../../components/common/ErrorState/ErrorState";
import { EmptyState } from "../../../components/common/EmptyState/EmptyState";

import { EventCard } from "../../../components/events/EventCard/EventCard";

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

      <section className="events-page__hero">
        <Container>
          <SectionTitle
            eyebrow="03 / EVENTS"
            title="Find your"
            highlight="next event."
            description="Discover automotive events, track days, meetings and experiences."
          />
        </Container>
      </section>

      <section className="events-page__list">
        <Container>

          <div className="events-page__header">
            <div>
              <span className="events-page__label">
                Upcoming
              </span>

              <h2>
                Next on track
              </h2>
            </div>

            {!loading && !error && (
              <span className="events-page__counter">
                {events.length
                  .toString()
                  .padStart(2, "0")}{" "}
                EVENTS
              </span>
            )}
          </div>

          {loading && (
            <Loading
              message="Loading events..."
            />
          )}

          {!loading && error && (
            <ErrorState
              title="Events unavailable"
              description={error}
              onRetry={refetch}
            />
          )}

          {!loading &&
            !error &&
            events.length === 0 && (
              <EmptyState
                title="No events found"
                description="There are currently no events available."
              />
            )}

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