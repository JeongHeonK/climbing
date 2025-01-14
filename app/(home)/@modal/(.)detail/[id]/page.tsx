// import { getGathering } from "@/app/(home)/actions/getGatherings";
import ModalWrapper from "@/app/(home)/components/ModalWrapper";

interface DetailModalProps {
  params: Promise<{ id: string }>;
}

export default async function DetailModalPage({ params }: DetailModalProps) {
  const { id } = await params;
  console.log(id);
  // const gather = await getGathering(id);
  // console.log(gather);

  return (
    <ModalWrapper>
      <div>hi</div>
    </ModalWrapper>
  );
}
