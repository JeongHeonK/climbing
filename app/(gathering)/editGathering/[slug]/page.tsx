import { notFound } from "next/navigation";
import NewGatheringPageScene from "../../components/editGatheringScene";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  if ((await params) === undefined || (await params).slug === undefined) {
    notFound();
  }
  const { slug } = await params;

  return <NewGatheringPageScene id={slug} />;
}
