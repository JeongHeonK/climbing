import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import MeetingForm from "./MeetingForm";

export default async function GatheringPageScene({ id }: { id?: string }) {
  let gathering;
  if (id) {
    try {
      gathering = await getGathering(id);
    } catch {
      throw new Error("id가 일치하지 않습니다.");
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
