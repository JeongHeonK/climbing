import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import MeetingForm from "./MeetingForm";

export default async function NewGatheringPageScene({ id }: { id: string }) {
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
