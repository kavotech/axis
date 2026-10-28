"use client";

import Image from "next/image";
import { useId, useState } from "react";

export type TabItem = { title: string; image: string; imageAlt: string; text: string };

/** Horizontal tabs, each panel an image beside text. */
export function Tabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(0);
  const id = useId();
  const it = items[active];
  return (
    <div>
      <div className="tabs__list" role="tablist">
        {items.map((t, i) => (
          <button key={t.title} type="button" role="tab" id={`${id}-t${i}`} aria-controls={`${id}-p`} aria-selected={i === active} className="tabs__btn" onClick={() => setActive(i)}>
            {t.title}
          </button>
        ))}
      </div>
      <div className="tabs__panel split" role="tabpanel" id={`${id}-p`} aria-labelledby={`${id}-t${active}`} key={active}>
        <div className="split__img">
          <Image src={it.image} alt={it.imageAlt} width={900} height={675} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
        <div>
          <h3 className="h-lg">{it.title}</h3>
          <p>{it.text}</p>
        </div>
      </div>
    </div>
  );
}
