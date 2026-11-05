import { SITE } from "@/data/site";
import { JsonLd } from "./ui";

const LABEL = `${SITE.name} promotional video`;

/**
 * Promotional video. Phones get the vertical cut so the burned-in captions stay
 * readable; preload="none" means neither file downloads until someone presses play,
 * and the version hidden by CSS never loads.
 */
export function PromoVideo() {
  return (
    <section className="section promo-video" aria-labelledby="promo-video-title">
      <div className="wrap">
        <h2 id="promo-video-title" className="section-title section-title--center">
          See how we connect Uganda to the UK
        </h2>
        <p className="promo-video__lead">From Ugandan farms to buyers in the UK and international markets &mdash; a short introduction to {SITE.shortName}.</p>
        <div className="promo-video__frame promo-video__frame--wide">
          <video controls playsInline preload="none" poster="/video/poster-landscape.webp" aria-label={LABEL}>
            <source src="/video/axis-agro-promo-720p.mp4" type="video/mp4" />
            <a href="/video/axis-agro-promo-720p.mp4">Download the video</a>
          </video>
        </div>
        <div className="promo-video__frame promo-video__frame--tall">
          <video controls playsInline preload="none" poster="/video/poster-vertical.webp" aria-label={LABEL}>
            <source src="/video/axis-agro-promo-vertical.mp4" type="video/mp4" />
            <a href="/video/axis-agro-promo-vertical.mp4">Download the video</a>
          </video>
        </div>
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "VideoObject",
          name: LABEL,
          description: SITE.description,
          thumbnailUrl: `${SITE.url}/video/poster-landscape.webp`,
          contentUrl: `${SITE.url}/video/axis-agro-promo-720p.mp4`,
          uploadDate: "2026-11-05",
          duration: "PT1M30S",
        }}
      />
    </section>
  );
}
