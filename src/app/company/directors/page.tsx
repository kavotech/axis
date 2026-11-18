import { DirectorsPage } from "@/components/LeaderViews";
import { LEADERS } from "@/data/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Our Directors — Leadership of Axis Agro International",
  description: `Meet the leadership of Axis Agro International: ${LEADERS.map((l) => `${l.name} (${l.short})`).join(" and ")}.`,
  path: "/company/directors",
  image: "/images/uganda-hills.webp",
});

export default function Page() {
  return <DirectorsPage />;
}
