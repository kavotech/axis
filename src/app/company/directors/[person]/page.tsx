import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LeaderProfile } from "@/components/LeaderViews";
import { LEADERS } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

type Params = { person: string };

export const dynamicParams = false;
export const generateStaticParams = () => LEADERS.map((l) => ({ person: l.slug }));

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { person } = await params;
  const l = LEADERS.find((x) => x.slug === person);
  if (!l) return {};
  return pageMetadata({ title: `${l.name} — ${l.short}`, description: l.summary, path: `/company/directors/${l.slug}`, image: "/images/uganda-green.webp" });
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { person } = await params;
  const l = LEADERS.find((x) => x.slug === person);
  if (!l) notFound();
  return <LeaderProfile leader={l} />;
}
