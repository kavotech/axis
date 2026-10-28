import { notFound } from "next/navigation";
import { InfoPageView } from "@/components/InfoPageView";
import { infoPageByPath } from "@/data/pages";
import { infoMetadata, infoParams, infoPath } from "@/lib/info-route";

type Params = { slug?: string[] };
const PREFIX = "/logistics";

export const dynamicParams = false;
export const generateStaticParams = () => infoParams(PREFIX);
export const generateMetadata = async ({ params }: { params: Promise<Params> }) => infoMetadata(infoPath(PREFIX, (await params).slug));

export default async function Page({ params }: { params: Promise<Params> }) {
  const page = infoPageByPath(infoPath(PREFIX, (await params).slug));
  if (!page) notFound();
  return <InfoPageView page={page} />;
}
