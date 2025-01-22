import { notFound } from "next/navigation";
import GatheringPageScene from "../../components/GatheringPageScene";

export default async function EditGatheringPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  if ((await params) === undefined || (await params).id === undefined)
    notFound();

  const { id } = await params;

  return <GatheringPageScene id={id} />;
}
