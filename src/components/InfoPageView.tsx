import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, groupLabel } from "@/data/categories";
import type { InfoPage, Section } from "@/data/pages";
import { ALL_PRODUCTS, productBySlug } from "@/data/products";
import { INCOTERMS } from "@/data/quote-options";
import { CONTACT_DIRECTORY } from "@/data/site";
import { Icon } from "./Icon";
import { Band, CtaBand, CutoutGrid, Faq, PageTop, Reveal } from "./ui";

const GENERAL_FAQ = [
  { q: "What does 'Core range' mean?", a: "Products from our established range. Availability still depends on season and partner capacity, so volumes and timing are confirmed for each enquiry." },
  { q: "What does 'Sourcing enquiry' mean?", a: "Products we can try to source on request. They are not held as regular stock, and we confirm feasibility before quoting." },
  { q: "Is there a minimum order?", a: "It depends on the product and freight mode. Air freight can start from small trial volumes; sea freight is usually by container or consolidated lot." },
  { q: "Which Incoterms do you quote?", a: "We can quote on most Incoterms 2020 rules — commonly FOB or FCA at origin, or CFR, CIF, CPT or CIP to destination. The final rule is agreed in the contract." },
  { q: "How do you take payment?", a: "Payment method and terms are agreed per contract — for example bank transfer, letters of credit or documentary collection." },
  { q: "Can you provide samples?", a: "For many products, yes. Samples are arranged for serious enquiries, particularly for coffee, cocoa and commodities." },
  { q: "Do you hold certifications?", a: "Axis Agro does not claim third-party certifications on this website. Producer or processor certificates are provided only where they genuinely exist for the lot supplied." },
  { q: "How quickly will you respond?", a: "We aim to respond to enquiries in writing within a few working days." },
];

const SEASONS: [string, string][] = [
  ["Avocados", "Seasonal with harvest windows varying by region and altitude — confirm per enquiry"],
  ["Pineapples", "Available through much of the year with seasonal peaks"],
  ["Mangoes", "Seasonal; main windows follow the rainy seasons — confirm per enquiry"],
  ["Bananas, matooke & plantain", "Year-round, with volume and quality varying by season"],
  ["Passion fruit", "Much of the year with seasonal peaks"],
  ["Fresh vegetables & herbs", "Largely year-round depending on grower and irrigation"],
  ["Robusta coffee", "Main harvests vary by region (e.g. central and south-western Uganda harvest at different times of year)"],
  ["Arabica coffee (Mt Elgon)", "Main harvest broadly in the second half of the year — confirm per season"],
  ["Cocoa", "Main and mid-crop harvests; volumes vary year to year"],
  ["Sesame, sunflower, groundnuts", "Seasonal harvests in northern and eastern Uganda — confirm per enquiry"],
  ["Grains & pulses", "Two seasons in many areas; stored stocks traded through the year"],
  ["Vanilla", "Seasonal harvest followed by months of curing before sale"],
];

function SectionView({ s }: { s: Section }) {
  switch (s.t) {
    case "split":
      return (
        <section className={`section${s.grey ? " section--grey" : ""}`}>
          <div className={`wrap split${s.image || s.quote ? "" : " split--top"}`}>
            <Reveal>
              <h2 className="h-lg">{s.title}</h2>
              {s.lead ? <p className="lead">{s.lead}</p> : null}
              {s.paras?.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {s.ticks ? (
                <ul className="ticks">
                  {s.ticks.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </Reveal>
            <Reveal delay={0.1} className={s.reverse ? "order-first" : ""}>
              {s.quote ? (
                <p className="split__quote">&lsquo;{s.quote}&rsquo;</p>
              ) : s.image ? (
                <div className="split__img">
                  <Image src={s.image} alt={s.imageAlt ?? ""} width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
                </div>
              ) : null}
            </Reveal>
          </div>
        </section>
      );
    case "band":
      return (
        <Band icon={s.icon} className={`band--${s.variant ?? "leaf"}`} sub={s.sub}>
          &lsquo;{s.text}&rsquo;
        </Band>
      );
    case "boxes":
    case "steps":
      return (
        <section className="section">
          <div className="wrap">
            <h2 className="h-lg">{s.title}</h2>
            {s.lead ? <p className="lead">{s.lead}</p> : null}
            <div className="icon-boxes" style={{ marginTop: 36 }}>
              {s.items.map((it, i) => (
                <Reveal key={it.title} delay={(i % 3) * 0.06}>
                  <div className="icon-box">
                    <span className="icon-box__icon" style={{ background: "var(--grey-2)" }}>
                      <Icon name={it.icon} strokeWidth={2} />
                    </span>
                    <h3>{s.t === "steps" && !/^\d/.test(it.title) ? `${String(i + 1).padStart(2, "0")}. ${it.title}` : it.title}</h3>
                    <p>{it.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );
    case "cards":
      return (
        <section className="section section--accent">
          <div className="wrap">
            <div className="cards-box page-box--marker">
              <h2 className="section-title">{s.title}</h2>
              {s.lead ? <p className="lead">{s.lead}</p> : null}
              <div className="cards">
                {s.items.map((c) => (
                  <div className="card" key={c.title}>
                    <span className="card__icon">
                      <Icon name={c.icon} strokeWidth={2} />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                    {c.href ? (
                      <a href={c.href} className="btn btn--sm" {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                        {c.cta ?? "Read more"}
                      </a>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      );
    case "table":
      return (
        <section className="section section--grey">
          <div className="wrap">
            <div className="cards-box page-box--marker">
              <h2 className="section-title">{s.title}</h2>
              {s.lead ? <p className="muted">{s.lead}</p> : null}
              <dl className="spec">
                {s.rows.map(([k, v]) => (
                  <div className="spec__row" key={k}>
                    <dt>{k}</dt>
                    <dd>{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>
      );
    case "faq":
      return <Faq items={s.items} title={s.title} />;
    case "links":
      return (
        <section className="circles" style={{ padding: "90px 0 80px" }}>
          <div className="wrap">
            <h2 className="section-title section-title--center">{s.title}</h2>
            <div className="circles__grid" style={{ marginTop: 40 }}>
              {s.items.map((c, i) => (
                <Reveal key={c.href + c.title} delay={i * 0.06}>
                  <Link href={c.href} className="circle-item">
                    <span className="circle-item__img">
                      <Icon name={c.icon} strokeWidth={2} />
                    </span>
                    <h3>{c.title}</h3>
                    <p>{c.text}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      );
    case "products": {
      const items = s.slugs.map(productBySlug).filter((p): p is NonNullable<typeof p> => !!p);
      return (
        <section className="product-range" style={{ padding: "90px 0 70px" }}>
          <div className="wrap">
            <h2 className="section-title section-title--center">{s.title}</h2>
            <CutoutGrid products={items} />
          </div>
        </section>
      );
    }
    case "cta":
      return <CtaBand href={s.href} label={s.label}>&lsquo;{s.text}&rsquo;</CtaBand>;
    case "special":
      return <Special kind={s.kind} />;
  }
}

function Special({ kind }: { kind: "incoterms" | "specifications" | "seasonality" | "faq-all" | "directory" }) {
  if (kind === "faq-all") {
    return (
      <>
        <Faq items={GENERAL_FAQ} title="Ordering & supply" />
        {CATEGORIES.map((c) => (
          <Faq key={c.slug} items={c.faqs} title={c.name} />
        ))}
      </>
    );
  }
  if (kind === "incoterms") {
    return (
      <section className="section section--grey">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Incoterms® 2020 rules</h2>
            <dl className="spec">
              {INCOTERMS.map((t) => (
                <div className="spec__row" key={t.code}>
                  <dt>
                    {t.code} — {t.name}
                  </dt>
                  <dd>{t.help}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    );
  }
  if (kind === "seasonality") {
    return (
      <section className="section section--grey">
        <div className="wrap">
          <div className="cards-box page-box--marker">
            <h2 className="section-title">Indicative availability</h2>
            <p className="muted">Indicative only. Harvest timing varies by region, altitude and year — we confirm realistic windows for each enquiry.</p>
            <dl className="spec">
              {SEASONS.map(([k, v]) => (
                <div className="spec__row" key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    );
  }
  if (kind === "directory") {
    return (
      <section className="section">
        <div className="wrap cards">
          {CONTACT_DIRECTORY.map((d) => (
            <div className="card" key={d.email}>
              <span className="card__icon">
                <Icon name={d.icon} strokeWidth={2} />
              </span>
              <h3>{d.title}</h3>
              <p style={{ textAlign: "center" }}>{d.text}</p>
              <a href={`mailto:${d.email}`} className="btn btn--sm">
                {d.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    );
  }
  // specifications
  return (
    <>
      {CATEGORIES.map((c) => {
        const items = ALL_PRODUCTS.filter((p) => p.group === c.slug);
        return (
          <section className="section" key={c.slug} style={{ paddingBottom: 20 }}>
            <div className="wrap">
              <h2 className="section-title">{c.name}</h2>
              <dl className="spec">
                {items.map((p) => (
                  <div className="spec__row" key={p.slug}>
                    <dt>
                      <Link href={`/products/${p.slug}`}>{p.name}</Link>
                    </dt>
                    <dd>
                      {p.grades.join(" · ")}
                      <br />
                      <span className="muted">
                        {p.packaging.slice(0, 2).join(" · ")} — {p.status === "core" ? "Core range" : "Sourcing enquiry"} · {groupLabel(p.group)}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </section>
        );
      })}
    </>
  );
}

export function InfoPageView({ page }: { page: InfoPage }) {
  const crumbs = [...(page.parent ? [page.parent] : []), { name: page.title, href: page.path }];
  return (
    <div className={page.accent}>
      <PageTop title={page.title} image={page.image} imageAlt={page.imageAlt} under={page.under} crumbs={crumbs} left={<p className="lead">{page.left}</p>} right={<p>{page.right}</p>} />
      {page.sections.map((s, i) => (
        <SectionView key={i} s={s} />
      ))}
    </div>
  );
}

export { Special };
