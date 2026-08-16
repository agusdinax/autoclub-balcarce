import { Link } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";

import type {
  Event,
  EventStatus,
} from "../../../types";

import { Badge } from "../../common/Badge/Badge";

import "./EventCard.scss";

interface EventCardProps {
  event: Event;
}

const statusConfig: Record<
  EventStatus,
  {
    label: string;
    variant:
      | "default"
      | "accent"
      | "success"
      | "warning"
      | "danger";
  }
> = {
  DRAFT: {
    label: "Draft",
    variant: "default",
  },

  PUBLISHED: {
    label: "Upcoming",
    variant: "accent",
  },

  CANCELLED: {
    label: "Cancelled",
    variant: "danger",
  },

  FINISHED: {
    label: "Finished",
    variant: "success",
  },
};

export function EventCard({
  event,
}: EventCardProps) {
  const status = statusConfig[event.status];

  return (
    <article className="event-card">

      <Link
        to={`/events/${event._id}`}
        className="event-card__image-link"
        aria-label={`View ${event.title}`}
      >
        <div className="event-card__image-wrapper">

          <img
            src={
              event.imageUrl ??
              "/placeholder-event.jpg"
            }
            alt={event.title}
            className="event-card__image"
          />

          <div className="event-card__overlay" />

          <div className="event-card__status">
            <Badge variant={status.variant}>
              {status.label}
            </Badge>
          </div>

          <span className="event-card__type">
            {formatEventType(event.type)}
          </span>

        </div>
      </Link>

      <div className="event-card__content">

        <div className="event-card__date">
          <span className="event-card__date-day">
            {formatDay(event.date)}
          </span>

          <span className="event-card__date-month">
            {formatMonth(event.date)}
          </span>
        </div>

        <div className="event-card__info">

          <h3 className="event-card__title">
            {event.title}
          </h3>

          {event.description && (
            <p className="event-card__description">
              {event.description}
            </p>
          )}

          <div className="event-card__location">
            <FaLocationDot />

            <span>
              {event.circuit?.name ??
                "Circuit"}
            </span>
          </div>

        </div>

      </div>

      <Link
        to={`/events/${event._id}`}
        className="event-card__link"
      >
        <span>View Event</span>

        <span aria-hidden="true">
          →
        </span>
      </Link>

    </article>
  );
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
  }).format(new Date(date));
}

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
  })
    .format(new Date(date))
    .toUpperCase();
}

function formatEventType(type: string) {
  return type
    .replaceAll("_", " ")
    .toUpperCase();
}