import { notFound } from "next/navigation";
import { birthdays } from "@/lib/birthdays";
import BirthdayVaultPage from "@/components/BirthdayVaultPage";

type BirthdayRouteProps = {
  params: Promise<{ slug: string }>;
};

export default async function BirthdaySlugPage({ params }: BirthdayRouteProps) {
  const { slug } = await params;
  const page = birthdays[slug];

  if (!page) {
    notFound();
  }

  return <BirthdayVaultPage slug={slug} page={page} />;
}
