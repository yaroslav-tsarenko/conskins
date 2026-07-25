import type { Metadata } from "next";
import { brand } from "@/lib/brand";
import { FavoritesClient } from "@/components/skins/FavoritesClient";

export const metadata: Metadata = {
  title: `Favorites — ${brand.displayName}`,
  description: "Skins you saved for later.",
};

export default async function FavoritesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <FavoritesClient locale={locale} />;
}
