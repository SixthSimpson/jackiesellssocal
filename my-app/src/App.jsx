import { useState } from 'react'
import './App.css'
import logo from '/logo.svg'

const AGENT = {
  name: 'Jacquiline Horn',
  brokerage: 'Power Brokers',
  email: 'listedbyjackie@gmail.com',
  phone: '310-880-0846',
  phoneHref: 'tel:+13108800846',
  dre: '01492854',
  area: 'Los Angeles',
}

const SERVICES = [
  {
    title: 'Selling Your Home',
    body:
      'Strategic pricing, professional staging guidance, and marketing that puts your property in front of the right buyers across Los Angeles.',
    icon: 'tag',
  },
  {
    title: 'Finding Your Home',
    body:
      'From the first showing to the closing table, I help you navigate one of LA’s most competitive markets with confidence and clarity.',
    icon: 'key',
  },
  {
    title: 'Market Expertise',
    body:
      'A lifetime in these neighborhoods and a decade of deals — trends, timing, and the negotiation experience to get you the best possible outcome.',
    icon: 'chart',
  },
]

const STATS = [
  { value: '10+', label: 'Years of experience' },
  { value: 'LA', label: 'Local market specialist' },
  { value: '1:1', label: 'Personal service, every client' },
]

function Icon({ name }) {
  const paths = {
    tag: (
      <>
        <path d="M3 7a2 2 0 0 1 2-2h6l8 8-6 6-8-8V7z" />
        <circle cx="8" cy="10" r="1.4" />
      </>
    ),
    key: (
      <>
        <circle cx="8" cy="8" r="4" />
        <path d="M11 11l8 8M16 16l2-2M18 18l2-2" />
      </>
    ),
    chart: (
      <>
        <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
      </>
    ),
  }
  return (
    <svg viewBox="0 0 24 24" className="svc-icon" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

function App() {
  const [sent, setSent] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <header className="site-header">
        <a className="brand" href="#top" onClick={closeMenu}>
          <img src={logo} alt={`${AGENT.name} logo`} className="brand-logo" />
          <span className="brand-text">
            <strong>{AGENT.name}</strong>
            <small>{AGENT.brokerage}</small>
          </span>
        </a>

        <button
          type="button"
          className="nav-toggle"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span className={`burger ${menuOpen ? 'is-open' : ''}`} aria-hidden="true" />
        </button>

        <nav className={`nav ${menuOpen ? 'is-open' : ''}`}>
          <a href="#about" onClick={closeMenu}>
            About
          </a>
          <a href="#services" onClick={closeMenu}>
            Services
          </a>
          <a href="#contact" onClick={closeMenu}>
            Contact
          </a>
          <a href={AGENT.phoneHref} className="nav-cta" onClick={closeMenu}>
            {AGENT.phone}
          </a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-inner">
            <p className="eyebrow">Los Angeles Real Estate</p>
            <h1>
              Finding your place
              <br />
              under the LA sky.
            </h1>
            <p className="hero-sub">
              Hi, I’m {AGENT.name} — a {AGENT.brokerage} agent helping families
              buy and sell across Los Angeles for over 10 years.
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">
                Work with me
              </a>
              <a href={AGENT.phoneHref} className="btn btn-ghost">
                Call {AGENT.phone}
              </a>
            </div>
          </div>
          <div className="hero-art" aria-hidden="true">
            <img src={logo} alt="" className="hero-logo" />
          </div>
        </section>

        <section className="stats">
          {STATS.map((s) => (
            <div className="stat" key={s.label}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="about">
          <div className="about-text">
            <p className="eyebrow">About Jackie</p>
            <h2>A decade in the business, a lifetime in these neighborhoods.</h2>
            <p>
              For ten years I’ve helped clients across Los Angeles find the
              right home and sell for the best price. But my connection to this
              market goes back much further than my career. I grew up here, and
              that gives me an understanding of these neighborhoods you can’t
              get from a listing sheet alone. I know how they’ve changed, what
              makes each one different, and what it actually feels like to live
              in them.
            </p>
            <p>
              Real estate is personal to me, both professionally and in my own
              life — my own investments are rooted in this market too. Buying a
              home is never just a transaction. It’s one of the biggest
              decisions you’ll make, and I treat every client’s search with the
              care, honesty, and attention that decision deserves.
            </p>
            <p>
              As an agent with {AGENT.brokerage}, I combine deep local roots
              with a hands-on, one-on-one approach. Whether you’re a first-time
              buyer or a longtime owner ready for the next chapter, I’m here to
              guide you every step of the way.
            </p>
            <p className="dre">DRE# {AGENT.dre}</p>
          </div>
          <div className="about-card">
            <img src={logo} alt={`${AGENT.name} emblem`} />
            <p>
              “My goal is simple: make your move feel easy, informed, and
              genuinely yours.”
            </p>
            <span>— {AGENT.name}</span>
          </div>
        </section>

        <section id="services" className="services">
          <p className="eyebrow center">How I can help</p>
          <h2 className="center">Services</h2>
          <div className="svc-grid">
            {SERVICES.map((s) => (
              <article className="svc-card" key={s.title}>
                <Icon name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div className="contact-info">
            <p className="eyebrow">Let’s talk</p>
            <h2>Ready to make your move?</h2>
            <p>
              Reach out for a no-pressure conversation about buying or selling in
              Los Angeles. I’d love to hear about your goals.
            </p>
            <ul className="contact-list">
              <li>
                <span>Phone</span>
                <a href={AGENT.phoneHref}>{AGENT.phone}</a>
              </li>
              <li>
                <span>Email</span>
                <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
              </li>
              <li>
                <span>Brokerage</span>
                <p>{AGENT.brokerage}</p>
              </li>
              <li>
                <span>License</span>
                <p>DRE# {AGENT.dre}</p>
              </li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {sent ? (
              <div className="form-success">
                <h3>Thank you!</h3>
                <p>
                  Your message is ready to send. I’ll be in touch soon — or call
                  me anytime at {AGENT.phone}.
                </p>
              </div>
            ) : (
              <>
                <label>
                  Name
                  <input type="text" name="name" required />
                </label>
                <label>
                  Email
                  <input type="email" name="email" required />
                </label>
                <label>
                  Phone
                  <input type="tel" name="phone" />
                </label>
                <label>
                  How can I help?
                  <textarea name="message" rows="4" required />
                </label>
                <button type="submit" className="btn btn-primary">
                  Send message
                </button>
              </>
            )}
          </form>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-brand">
          <img src={logo} alt="" />
          <div>
            <strong>{AGENT.name}</strong>
            <small>{AGENT.brokerage} · {AGENT.area}</small>
          </div>
        </div>
        <div className="footer-meta">
          <a href={`mailto:${AGENT.email}`}>{AGENT.email}</a>
          <a href={AGENT.phoneHref}>{AGENT.phone}</a>
          <span>DRE# {AGENT.dre}</span>
        </div>
        <p className="copyright">
          © {new Date().getFullYear()} {AGENT.name}. All rights reserved.
        </p>
      </footer>
    </>
  )
}

export default App
