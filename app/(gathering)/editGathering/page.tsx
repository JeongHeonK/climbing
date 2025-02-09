import type { Metadata } from "next";
import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import MeetingForm from "../components/MeetingForm";

export const metadata: Metadata = {
  title: "수정페이지",
  description: "수정페이지 입니다.",
};

export default async function EditGatheringPage({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const id = (await searchParams).id;
  const gathering = await getGathering(id);

  return (
    <MeetingForm
      _id={gathering?._id.toString()}
      title={gathering?.title}
      description={gathering?.description}
      lat={gathering?.lat}
      lng={gathering?.lng}
      date={gathering?.date}
    />
  );
}
