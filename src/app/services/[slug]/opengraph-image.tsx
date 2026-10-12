import { getService, services } from "@/data/services";
import { ogSize, renderOgImage } from "@/lib/og";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Deep Root Code service";

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export default async function ServiceOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getService(slug);
  return renderOgImage({
    eyebrow: "Service",
    title: service?.title ?? "Services",
    subtitle: service?.capabilities.slice(0, 4).join(" · ") ?? "",
  });
}
