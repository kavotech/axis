import { DirectorsPage } from "@/components/LeaderViews";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Directors — Leadership of Axis Agro International",
  description: "Meet the leadership of Axis Agro International: Oliver Amanya Alinaitwe (Founder & Head of UK Operations) and Micah Bamutura (Strategic Agricultural Sourcing & Uganda Operations).",
  path: "/company/directors",
  image: "/images/uganda-hills.webp",
});

export default function Page() {
  return <DirectorsPage />;
}
