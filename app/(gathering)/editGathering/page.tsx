import { notFound } from "next/navigation";
import EditGatheringPageScene from "../components/editGatheringScene";

export default async function EditGatheringPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id as string;

  if (!id) notFound();

  return <EditGatheringPageScene id={id} />;
}
