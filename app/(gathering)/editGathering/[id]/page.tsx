import { notFound } from "next/navigation";
import NewGatheringPageScene from "../../components/editGatheringScene";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if ((await params) === undefined || (await params).id === undefined) {
    notFound();
  }
  const { id } = await params;

  return <NewGatheringPageScene id={id} />;
}
