import { getGathering } from "@/app/(home)/actions/getGatherings";
import GatheringDetail from "@/app/(home)/components/GatheringDetail";
import ModalWrapper from "@/app/(home)/components/ModalWrapper";

interface DetailModalProps {
  params: Promise<{ id: string }>;
}

export default async function DetailModalPage({ params }: DetailModalProps) {
  const { id } = await params;
  const gather = await getGathering(id);

  if (!gather) return null;

  return (
    <ModalWrapper>
      <GatheringDetail
        _id={gather?._id.toString()}
        user={gather?.user}
        title={gather?.title}
        description={gather?.description}
        lat={Number(gather?.lat)}
        lng={Number(gather?.lng)}
        date={gather?.date}
      />
    </ModalWrapper>
  );
}
