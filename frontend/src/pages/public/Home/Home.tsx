import { Link } from "react-router-dom";

import "./Home.scss";

export function Home() {
  return (
    <div className="home">

      <section className="hero">

        <div className="hero__background" />

        <div className="hero__overlay" />

        <div className="hero__content">

          <span className="hero__eyebrow">
            01 / AUTOMOTIVE COMMUNITY
          </span>

          <h1 className="hero__title">
            The
            <span>Passion</span>
            of the Road.
          </h1>

          <p className="hero__description">
            Events, clubs, machines and people
            connected by the same passion for
            automotive culture.
          </p>

          <div className="hero__actions">
            <Link
              to="/events"
              className="hero__primary-button"
            >
              Explore Events
            </Link>

            <Link
              to="/about"
              className="hero__secondary-button"
            >
              Discover AutoClub
            </Link>
          </div>

        </div>

        <div className="hero__telemetry">
          <span>TRACK</span>
          <strong>AUTOMOTIVE</strong>
          <span>01 — 04</span>
        </div>

        <div className="hero__line" />

      </section>

      <section className="home__intro">

        <div>
          <span className="section-label">
            02 / THE COMMUNITY
          </span>

          <h2>
            More than
            <span>cars.</span>
          </h2>
        </div>

        <p>
          AutoClub connects automotive enthusiasts,
          events and communities in one place.
        </p>

      </section>

    </div>
  );
}