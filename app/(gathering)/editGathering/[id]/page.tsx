import { notFound } from "next/navigation";
import GatheringPageScene from "../../components/GatheringPageScene";

export default async function EditGatheringPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (id === undefined) notFound();

  return <GatheringPageScene id={id} />;
}
