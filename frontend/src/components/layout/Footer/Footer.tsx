import { Link } from "react-router-dom";
import "./Footer.scss";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">

        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark">A</span>
            <span>AUTOCLUB</span>
          </Link>

          <p>
            Automotive culture, events and community.
          </p>
        </div>

        <div className="footer__navigation">
          <span className="footer__label">
            Navigation
          </span>

          <Link to="/">Home</Link>
          <Link to="/events">Events</Link>
          <Link to="/gallery">Gallery</Link>
          <Link to="/clubs">Clubs</Link>
          <Link to="/about">About</Link>
        </div>

        <div className="footer__social">
          <span className="footer__label">
            Follow us
          </span>

          <a href="#" aria-label="Instagram">
            Instagram
          </a>

          <a href="#" aria-label="Facebook">
            Facebook
          </a>
        </div>

      </div>

      <div className="footer__bottom">
        <div className="footer__container">
          <span>
            © {new Date().getFullYear()} AutoClub
          </span>

          <span>
            Built for automotive enthusiasts.
          </span>
        </div>
      </div>
    </footer>
  );
}