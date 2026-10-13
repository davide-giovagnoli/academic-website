import { useMemo, useState } from "react";
import {
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  MapPin,
  Menu,
  Search,
  X,
} from "lucide-react";
import { profile, publications, surveysAndBooks } from "./data";

const nav = [
  ["Profile", "profile"],
  ["Publications", "publications"],
  ["Contact", "contact"],
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const matchesQuery = (item) =>
    [item.year, item.title, item.authors, item.venue]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase().trim());

  const filtered = useMemo(
    () => (query.trim() ? publications.filter(matchesQuery) : publications),
    [query]
  );

  const filteredSurveysAndBooks = useMemo(
    () =>
      query.trim()
        ? surveysAndBooks.filter(matchesQuery)
        : surveysAndBooks,
    [query]
  );

  const renderEntry = (item, index) => (
    <article className="publication" key={`${item.title}-${index}`}>
      <div className="year">{item.year}</div>

      <div>
        <h3>{item.title}</h3>
        <p>{item.authors}</p>
        <p className="venue">{item.venue}</p>
      </div>

      {item.url && (
        <a
          className="external"
          href={item.url}
          target="_blank"
          rel="noreferrer"
          aria-label={`Open ${item.title}`}
        >
          <ExternalLink size={19} />
        </a>
      )}
    </article>
  );

  return (
    <div className="site-shell">
      <header className="header">
        <div className="container header-inner">
          <a className="monogram" href="#profile">
          </a>

          <nav className="desktop-nav">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`}>
                {label}
              </a>
            ))}
          </nav>

          <button
            className="menu-button"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {nav.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="profile" className="container hero">
          <div>
            <p className="eyebrow">
              <GraduationCap size={17} />
              {profile.role}
            </p>

            <h1>
              {profile.name.split(" ")[0]}
              <br />
              {profile.name.split(" ").slice(1).join(" ")}
            </h1>

            <p className="lead">{profile.bio}</p>

            <div className="actions">
              <a
                className="button primary"
                href={profile.cv}
                target="_blank"
                rel="noreferrer"
              >
                <Download size={17} />
                CV
              </a>

              <a
                className="button secondary"
                href={`mailto:${profile.email}`}
              >
                <Mail size={17} />
                Contact me
              </a>
            </div>
          </div>

          <div className="portrait-frame">
            <img
              src={profile.photo}
              alt={`Portrait of ${profile.name}`}
            />
          </div>
        </section>

        <section
          id="publications"
          className="container publications-section"
        >
          <div className="section-head">
            <div>
              <p className="section-label">Research output</p>
              <h2>Publications</h2>
            </div>

            <label className="search">
              <Search size={17} />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search research output"
                aria-label="Search research output"
              />
            </label>
          </div>

          <div className="publication-list">
            {filtered.map(renderEntry)}
          </div>

          {filtered.length === 0 && (
            <p className="empty">No publications found.</p>
          )}

          <div className="subsection-head">
            <p className="section-label">Expository work</p>
            <h2>Surveys and Books</h2>
          </div>

          <div className="publication-list">
            {filteredSurveysAndBooks.map(renderEntry)}
          </div>

          {filteredSurveysAndBooks.length === 0 && (
            <p className="empty">No surveys or books found.</p>
          )}
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <p className="section-label light">Contact</p>
            </div>

            <div className="contact-details">
              <a href={`mailto:${profile.email}`}>
                <Mail size={17} />
                {profile.email}
              </a>

              <p>
                <MapPin size={17} />
                <span>{profile.affiliation}</span>
              </p>

              {profile.links?.length > 0 && (
                <div className="social-links">
                  {profile.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              )}

              <small>
                © {new Date().getFullYear()} {profile.name}
              </small>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

