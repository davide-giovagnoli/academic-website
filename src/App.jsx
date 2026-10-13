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

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return publications;

    return publications.filter((publication) =>
      [
        publication.year,
        publication.title,
        publication.authors,
        publication.venue,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  const filteredSurveysAndBooks = useMemo(() => {
    const q = query.toLowerCase().trim();

    if (!q) return surveysAndBooks;

    return surveysAndBooks.filter((item) =>
      [
        item.year,
        item.title,
        item.authors,
        item.venue,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="site-shell">
      <header className="header">
        <div className="container header-inner">
          <a className="monogram" href="#profile">
            DG
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
            {filtered.map((publication, index) => (
              <article
                className="publication"
                key={`${publication.title}-${index}`}
              >
                <div className="year">{publication.year}</div>

                <div>
                  <h3>{publication.title}</h3>
                  <p>{publication.authors}</p>
                  <p className="venue">{publication.venue}</p>
                </div>

                {publication.url && (
                  <a
                    className="external"
                    href={publication.url}
                    target="_blank"
               assName="publication"
                key={`${item.title}-${index}`}
              >
                <div className="year">{item.year}</div>

                <div>
                  <h3>{item.title}</h3>
                  <p>{item.authors}</p>
                  <p className="venue">{item.venue}</p>
                </div>

                {item.url && (
                  {item.url}
                    <ExternalLink size={19} />
                  </a>
                )}
              </article>
            ))}
          </div>

          {filteredSurveysAndBooks.length === 0 && (
            <p className="empty">
              No surveys or books found.
            </p>
          )}
        </section>

        <section id="contact" className="contact-section">
          <div className="container contact-grid">
            <div>
              <p className="section-label light">Contact</p>
              <h2>Get in touch.</h2>
            </div>

            <div className="contact-details">
              {`mailto:${profile.email}`}
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
                    {link.url}
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
