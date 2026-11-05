import Image from "next/image";
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

/** Circular portrait: the leader's photo when supplied, otherwise initials (no stock photos are presented as the directors). */
export function Portrait({ leader, size = 220 }: { leader: Leader; size?: number }) {
  if (leader.photoSquare)
    return (
      <div className="portrait portrait--photo" style={{ width: size, height: size }}>
        <Image src={leader.photoSquare} alt={`Portrait of ${leader.name}`} fill sizes={`${size}px`} />
      </div>
    );
  return (
    <div className="portrait" style={{ width: size, height: size }} role="img" aria-label={`Portrait placeholder for ${leader.name}`}>
      <span>{initials(leader.name)}</span>
    </div>
  );
}

/** Large hero image: full cut-out photo over a brand-coloured disc, or the circular portrait. */
function HeroPortrait({ leader }: { leader: Leader }) {
  if (!leader.photo) return <Portrait leader={leader} size={260} />;
  return (
    <div className="hero-portrait">
      <span className="hero-portrait__disc" aria-hidden="true" />
      <Image src={leader.photo} alt={`${leader.name}, ${leader.short} of ${SITE.name}`} width={760} height={1013} priority />
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
              {!l.photoSquare && (
                <p className="muted" style={{ fontSize: 13, marginTop: 10 }}>
                  Photograph to follow
                </p>
              )}
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="h-lg" style={{ marginBottom: 4 }}>
                {l.name}
              </h2>
              <p className="leader-card__role">{l.role}</p>
              {l.bio.slice(0, 2).map((b) => (
                <p key={b.slice(0, 20)}>{b}</p>
              ))}
              <h3 className="h-sm text-accent">{l.listTitle ?? "Core responsibilities"}</h3>
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
              Oliver founded Axis Agro in the United Kingdom to connect Uganda&rsquo;s agricultural products with British and international buyers. In Uganda, Micah leads sourcing, supplier
              relationships, quality coordination and export preparation. Enquiries move between the two every day, so that what we quote reflects what can genuinely be delivered.
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

/** Renders a paragraph with the leader's highlight phrase in bold. */
function BioPara({ text, highlight }: { text: string; highlight?: string }) {
  if (!highlight || !text.includes(highlight)) return <p>{text}</p>;
  const [a, b] = text.split(highlight);
  return (
    <p>
      {a}
      <strong>{highlight}</strong>
      {b}
    </p>
  );
}

export function LeaderProfile({ leader }: { leader: Leader }) {
  const other = LEADERS.find((l) => l.slug !== leader.slug)!;
  const first = leader.name.split(" ")[0];
  const [intro, ...rest] = leader.bio;
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
            <div className="btn-row">
              <a href={`mailto:${leader.email}`} className="btn">
                Email {first}
              </a>
              <a href="#biography" className="btn btn--outline">
                Read biography
              </a>
            </div>
          </>
        }
        visual={<HeroPortrait leader={leader} />}
      />
      <Band icon={leader.icon} className="band--home">
        &lsquo;{leader.short} &mdash; {SITE.name}&rsquo;
      </Band>

      <section className="section" id="biography">
        <div className="wrap profile-grid">
          <Reveal className="profile-bio">
            <p className="eyebrow-label">Biography</p>
            <h2 className="h-lg">About {first}</h2>
            <p className="lead">{intro}</p>
            {rest.map((b) => (
              <BioPara key={b.slice(0, 24)} text={b} highlight={leader.highlight} />
            ))}
          </Reveal>
          <Reveal delay={0.1}>
            <aside className="facts-panel" aria-label={`${leader.name} at a glance`}>
              <h3>At a glance</h3>
              <dl>
                {leader.facts.map(([k, v]) => (
                  <div key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
              <a href={`mailto:${leader.email}`} className="facts-panel__mail">
                <Icon name="mail" strokeWidth={2} />
                {leader.email}
              </a>
            </aside>
          </Reveal>
        </div>
      </section>

      {leader.quote && (
        <section className="pullquote">
          <div className="wrap">
            <Reveal>
              <figure>
                <span className="pullquote__mark" aria-hidden="true">
                  &ldquo;
                </span>
                <blockquote>
                  <p>{leader.quote}</p>
                </blockquote>
                <figcaption>
                  <strong>{leader.name}</strong>
                  <span>
                    {leader.short}, {SITE.name}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          </div>
        </section>
      )}

      <section className="section section--accent">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">{leader.quote ? "What the company is built on" : "Focus areas"}</h2>
            <div className="cards cards--4">
              {leader.values.map((v) => (
                <div className="card" key={v.title}>
                  <span className="card__icon">
                    <Icon name={v.icon} strokeWidth={2} />
                  </span>
                  <h3>{v.title}</h3>
                  <p>{v.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap split split--top">
          <Reveal>
            <h2 className="h-md text-accent">{leader.listTitle ?? "Areas of responsibility"}</h2>
            <ul className="ticks">
              {leader.responsibilities.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="h-md text-accent">{leader.list2Title ?? "Areas of expertise"}</h2>
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
                <div className="btn-row">
                  <Link href={`/company/directors/${other.slug}`} className="btn btn--sm">
                    Read profile
                  </Link>
                  <Link href="/company/directors" className="btn btn--sm btn--outline">
                    All directors
                  </Link>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
      <CtaBand href={`mailto:${leader.email}`} label={`Email ${first}`}>
        &lsquo;Get in touch with {first}&rsquo;
      </CtaBand>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: leader.name,
          jobTitle: leader.short,
          email: `mailto:${leader.email}`,
          description: leader.summary,
          url: `${SITE.url}/company/directors/${leader.slug}`,
          worksFor: { "@type": "Organization", name: SITE.legalName, url: SITE.url },
        }}
      />
    </div>
  );
}
