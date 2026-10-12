import { useMemo, useState } from "react";
import { Download, ExternalLink, GraduationCap, Mail, MapPin, Menu, Search, X } from "lucide-react";
import { profile, publications, researchInterests } from "./data";

const nav = [["Profile", "profile"], ["Research", "research"], ["Publications", "publications"], ["Contact", "contact"]];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return publications;
    return publications.filter((p) => [p.year, p.title, p.authors, p.venue, ...p.tags].join(" ").toLowerCase().includes(q));
  }, [query]);

  return <div className="site-shell">
    <header className="header">
      <div className="container header-inner">
        <a className="monogram" href="#profile">DG</a>
        <nav className="desktop-nav">{nav.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav>
        <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X/> : <Menu/>}</button>
      </div>
      {menuOpen && <nav className="mobile-nav">{nav.map(([label,id]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
    </header>

    <main>
      <section id="profile" className="container hero">
        <div>
          <p className="eyebrow"><GraduationCap size={17}/> {profile.role}</p>
          <h1>{profile.name.split(" ")[0]}<br/>{profile.name.split(" ").slice(1).join(" ")}</h1>
          <p className="lead">{profile.bio}</p>
          <div className="actions">
            <a className="button primary" href={profile.cv} target="_blank" rel="noreferrer"><Download size={17}/> Download CV</a>
            <a className="button secondary" href={`mailto:${profile.email}`}><Mail size={17}/> Contact me</a>
          </div>
        </div>
        <div className="portrait-frame"><img src={profile.photo} alt={`Portrait of ${profile.name}`} /></div>
      </section>

      <section id="research" className="research-section">
        <div className="container research-grid">
          <div><p className="section-label">Research</p><h2>Research interests</h2></div>
          <div className="interest-grid">{researchInterests.map((item,i) => <article className="interest-card" key={item}><span>0{i+1}</span><h3>{item}</h3></article>)}</div>
        </div>
      </section>

      <section id="publications" className="container publications-section">
        <div className="section-head"><div><p className="section-label">Research output</p><h2>Publications</h2></div><label className="search"><Search size={17}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search publications" /></label></div>
        <div className="publication-list">{filtered.map((p,i) => <article className="publication" key={`${p.title}-${i}`}><div className="year">{p.year}</div><div><h3>{p.title}</h3><p>{p.authors}</p><p className="venue">{p.venue}</p><div className="tags">{p.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div>{p.url && <a className="external" href={p.url} target="_blank" rel="noreferrer" aria-label="Open publication"><ExternalLink size={19}/></a>}</article>)}</div>
        {!filtered.length && <p className="empty">No publications found.</p>}
      </section>

      <section id="contact" className="contact-section"><div className="container contact-grid"><div><p className="section-label light">Contact</p><h2>Let’s talk mathematics.</h2></div><div className="contact-details"><a href={`mailto:${profile.email}`}><Mail size={17}/> {profile.email}</a><p><MapPin size={17}/> {profile.affiliation}</p><div className="social-links">{profile.links.map(link=><a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}</div><small>© {new Date().getFullYear()} {profile.name}</small></div></div></section>
    </main>
  </div>;
}
