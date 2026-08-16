import { Container } from "../../../components/common/Container/Container";
import { SectionTitle } from "../../../components/common/SectionTitle/SectionTitle";
import { EventCard } from "../../../components/events/EventCard/EventCard";

import type { Event } from "../../../types";

import "./Events.scss";

const mockEvents: Event[] = [
  {
    id: "1",
    title: "Track Day 2026",
    description:
      "A full day dedicated to performance and automotive culture.",
    date: "2026-08-24",
    location: "Autódromo Balcarce",
    image: "/event-track.jpg",
    type: "Track Day",
    status: "upcoming",
  },
  {
    id: "2",
    title: "Classic Cars Meeting",
    description:
      "A meeting for classic and historic automotive enthusiasts.",
    date: "2026-09-12",
    location: "Tandil",
    image: "/event-classic.jpg",
    type: "Meeting",
    status: "upcoming",
  },
  {
    id: "3",
    title: "Night Racing",
    description:
      "An evening dedicated to performance cars and racing culture.",
    date: "2026-09-26",
    location: "Buenos Aires",
    image: "/event-night.jpg",
    type: "Racing",
    status: "upcoming",
  },
];

export function Events() {
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

            <span className="events-page__counter">
              {mockEvents.length.toString().padStart(2, "0")} EVENTS
            </span>
          </div>

          <div className="events-page__grid">
            {mockEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>

        </Container>
      </section>

    </div>
  );
}