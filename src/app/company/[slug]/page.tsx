import { notFound } from "next/navigation";
import { InfoPageView } from "@/components/InfoPageView";
import { INFO_PAGES, infoPageByPath } from "@/data/pages";
import { infoMetadata } from "@/lib/info-route";

type Params = { slug: string };
const PREFIX = "/company";

export const dynamicParams = false;
export const generateStaticParams = () => INFO_PAGES.filter((p) => p.path.startsWith(PREFIX + "/") && p.path.split("/").length === 3).map((p) => ({ slug: p.path.split("/")[2] }));
export const generateMetadata = async ({ params }: { params: Promise<Params> }) => infoMetadata(`${PREFIX}/${(await params).slug}`);

export default async function Page({ params }: { params: Promise<Params> }) {
  const page = infoPageByPath(`${PREFIX}/${(await params).slug}`);
  if (!page) notFound();
  return <InfoPageView page={page} />;
}
