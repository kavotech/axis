import Link from "next/link";
import { LEADERS, SITE, type Leader } from "@/data/site";
import { Icon } from "./Icon";
import { Band, CtaBand, JsonLd, PageTop, Reveal } from "./ui";

const initials = (n: string) =>
  n
    .split(" ")
    .filter((w) => w.length > 2)
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

/** Portrait placeholder — initials only; no stock photos are presented as the directors. */
export function Portrait({ leader, size = 220 }: { leader: Leader; size?: number }) {
  return (
    <div className="portrait" style={{ width: size, height: size }} role="img" aria-label={`Portrait placeholder for ${leader.name}`}>
      <span>{initials(leader.name)}</span>
    </div>
  );
}

export function LeadershipRow() {
  return (
    <div className="leaders">
      {LEADERS.map((l, i) => (
        <Reveal key={l.slug} delay={i * 0.08}>
          <article className="leader-card">
            <Portrait leader={l} size={170} />
            <div>
              <h3>{l.name}</h3>
              <p className="leader-card__role">{l.short}</p>
              <p>{l.summary}</p>
              <div className="btn-row">
                <Link href={`/company/directors/${l.slug}`} className="btn btn--sm">
                  Read profile
                </Link>
                <a href={`mailto:${l.email}`} className="btn btn--sm btn--outline">
                  {l.email}
                </a>
              </div>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function DirectorsPage() {
  return (
    <div className="accent-forest">
      <PageTop
        title="Our directors"
        image="/images/uganda-hills.webp"
        imageAlt="Green hills and farmland in East Africa"
        under="var(--forest)"
        crumbs={[
          { name: "Company", href: "/about" },
          { name: "Our directors", href: "/company/directors" },
        ]}
        left={<p className="lead">Axis Agro is led by a small team that spans the two ends of the supply chain: commercial operations in the United Kingdom and sourcing on the ground in Uganda.</p>}
        right={<p>Buyers deal with people who know both the market and the origin — and who can be reached directly.</p>}
      />

      <Band icon="users" className="band--home">
        &lsquo;Leadership in the UK and in Uganda, working as one team&rsquo;
      </Band>

      {LEADERS.map((l, i) => (
        <section key={l.slug} className={`section${i % 2 ? " section--grey" : ""}`}>
          <div className={`wrap split split--top${i % 2 ? " split--flip" : ""}`}>
            <Reveal className="leader-profile__media">
              <Portrait leader={l} size={300} />
              <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>
                Photograph to follow
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="h-lg" style={{ marginBottom: 4 }}>
                {l.name}
              </h2>
              <p className="leader-card__role">{l.role}</p>
              {l.bio.slice(0, 2).map((b) => (
                <p key={b.slice(0, 20)}>{b}</p>
              ))}
              <h3 className="h-sm text-accent">Core responsibilities</h3>
              <ul className="ticks">
                {l.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
              <div className="btn-row">
                <Link href={`/company/directors/${l.slug}`} className="btn btn--sm">
                  Full profile
                </Link>
                <a href={`mailto:${l.email}`} className="btn btn--sm btn--outline">
                  Email {l.name.split(" ")[0]}
                </a>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      <section className="section section--accent">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Leadership philosophy</h2>
            <div className="cards">
              <div className="card">
                <span className="card__icon">
                  <Icon name="handshake" strokeWidth={2} />
                </span>
                <h3>Accessible</h3>
                <p>Buyers and suppliers can reach the people making decisions directly.</p>
              </div>
              <div className="card">
                <span className="card__icon">
                  <Icon name="shield" strokeWidth={2} />
                </span>
                <h3>Accurate</h3>
                <p>We confirm what can be supplied before it is promised — and say clearly when something is a sourcing enquiry.</p>
              </div>
              <div className="card">
                <span className="card__icon">
                  <Icon name="calendar" strokeWidth={2} />
                </span>
                <h3>Long-term</h3>
                <p>We invest in relationships that support repeat supply for buyers and steady demand for growers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split">
          <Reveal>
            <h2 className="h-lg">The UK–Uganda relationship</h2>
            <p className="lead">Our structure mirrors the trade itself.</p>
            <p>
              In the United Kingdom, Oliver leads buyer relationships, commercial terms and international coordination. In Uganda, Micah leads sourcing, supplier relationships, quality coordination
              and export preparation. Enquiries move between the two every day, so that what we quote reflects what can genuinely be delivered.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <ul className="ticks">
              <li>Buyer specification agreed in the UK</li>
              <li>Feasibility and supplier match confirmed in Uganda</li>
              <li>Preparation, packing and checks at origin</li>
              <li>Documents, freight and delivery coordinated end to end</li>
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="circles" style={{ padding: "60px 0 80px" }}>
        <div className="wrap">
          <h2 className="section-title section-title--center">Related company pages</h2>
          <div className="circles__grid" style={{ marginTop: 30 }}>
            {[
              { href: "/about", icon: "globe" as const, title: "About us", text: "Who we are and what we do." },
              { href: "/company/our-story", icon: "route" as const, title: "Our story", text: "Why Axis Agro was founded." },
              { href: "/company/our-values", icon: "shield" as const, title: "Our values", text: "How we work." },
              { href: "/contact", icon: "mail" as const, title: "Contact", text: "Our contact directory." },
            ].map((c) => (
              <Link key={c.href} href={c.href} className="circle-item">
                <span className="circle-item__img">
                  <Icon name={c.icon} strokeWidth={2} />
                </span>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand href="/contact" label="Contact our team">
        &lsquo;Speak directly to our leadership&rsquo;
      </CtaBand>
      <JsonLd
        data={LEADERS.map((l) => ({
          "@context": "https://schema.org",
          "@type": "Person",
          name: l.name,
          jobTitle: l.short,
          email: `mailto:${l.email}`,
          worksFor: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
          url: `${SITE.url}/company/directors/${l.slug}`,
        }))}
      />
    </div>
  );
}

export function LeaderProfile({ leader }: { leader: Leader }) {
  const other = LEADERS.find((l) => l.slug !== leader.slug)!;
  return (
    <div className="accent-forest">
      <PageTop
        variant="split"
        title={leader.name}
        image="/images/uganda-green.webp"
        imageAlt="Green farmland in Uganda"
        under="var(--forest)"
        crumbs={[
          { name: "Company", href: "/about" },
          { name: "Our directors", href: "/company/directors" },
          { name: leader.name, href: `/company/directors/${leader.slug}` },
        ]}
        left={
          <>
            <p className="leader-card__role">{leader.role}</p>
            <p className="lead">{leader.summary}</p>
            <a href={`mailto:${leader.email}`} className="btn">
              {leader.email}
            </a>
          </>
        }
        visual={<Portrait leader={leader} size={260} />}
      />
      <Band icon={leader.icon} className="band--home">
        &lsquo;{leader.short}&rsquo;
      </Band>
      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-lg">Biography</h2>
            {leader.bio.map((b) => (
              <p key={b.slice(0, 20)}>{b}</p>
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="h-sm text-accent">Areas of responsibility</h3>
            <ul className="ticks">
              {leader.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
            <h3 className="h-sm text-accent" style={{ marginTop: 24 }}>
              Areas of expertise
            </h3>
            <ul className="ticks">
              {leader.expertise.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>
      <section className="section section--grey">
        <div className="wrap">
          <h2 className="section-title section-title--center">Also on the leadership team</h2>
          <div style={{ maxWidth: 760, margin: "30px auto 0" }}>
            <article className="leader-card">
              <Portrait leader={other} size={150} />
              <div>
                <h3>{other.name}</h3>
                <p className="leader-card__role">{other.short}</p>
                <p>{other.summary}</p>
                <Link href={`/company/directors/${other.slug}`} className="btn btn--sm">
                  Read profile
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>
      <CtaBand href={`mailto:${leader.email}`} label={`Email ${leader.name.split(" ")[0]}`}>
        &lsquo;Get in touch with {leader.name.split(" ")[0]}&rsquo;
      </CtaBand>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: leader.name,
          jobTitle: leader.short,
          email: `mailto:${leader.email}`,
          description: leader.summary,
          worksFor: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
        }}
      />
    </div>
  );
}
