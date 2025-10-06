import { NextResponse } from "next/server";
import { buildSitemapXml } from "../../lib/sitemap";

export async function GET() {
  const xml = buildSitemapXml();
  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
