import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import MeetingForm from "../components/MeetingForm";

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
