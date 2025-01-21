import { notFound } from "next/navigation";
import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import MeetingForm from "./MeetingForm";

export default async function GatheringPageScene({ id }: { id?: string }) {
  let gathering;
  if (id) {
    try {
      gathering = await getGathering(id);
    } catch {
      throw notFound();
    }
  }
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
