import { notFound } from "next/navigation";
import NewGatheringPageScene from "../components/editGatheringScene";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const id = (await searchParams).id as string;

  if (!id) notFound();

  return <NewGatheringPageScene id={id} />;
}
