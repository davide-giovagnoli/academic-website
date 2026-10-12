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
import { profile, publications } from "./data";

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

    if (!q) {
      return publications;
    }

    return publications.filter((publication) =>
      [
        publication.year,
        publication.title,
        publication.authors,
        publication.venue,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <div className="site-shell">
      <header className="header">
        <div className="container header-inner">
          #profile
            DG
          </a>

          <nav className="desktop-nav">
            {nav.map(([label, id]) => (
              {`#${id}`}
                {label}
              </a>
            ))}
          </nav>

          <button
            className="menu-button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <nav className="mobile-nav">
            {nav.map(([label, id]) => (
              {`#${id}`} => setMenuOpen(false)}
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
              {profile.cv}
                <Download size={17} />
                Download CV
              </a>

              {`mailto:${profile.email}`}
                <Mail size={17} />
                Contact me
              </a>
            </div>
          </div>

          <div className="portrait-frame">
            {profile.photo}
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
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search publications"
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
                  {publication.url}
                    <ExternalLink size={19} />
                  </a>
                )}
              </article>
            ))}
          </div>

          {!filtered.length && (
            <p className="empty">No publications found.</p>
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
                {profile.affiliation}
              </p>

              <div className="social-links">
                {(profile.links || []).map((link) => (
                  {link.url}
                    {link.label}
                  </a>
                ))}
              </div>

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
