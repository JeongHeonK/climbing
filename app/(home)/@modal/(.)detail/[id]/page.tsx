import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getGathering } from "@/app/(home)/actions/homeGatheringAction";
import GatheringDetail from "@/app/(home)/components/GatheringDetail";
import ModalWrapper from "@/app/(home)/components/ModalWrapper";
import { Auth } from "@/app/api/auth";

interface DetailModalProps {
  params: Promise<{ id: string }>;
}

export default async function DetailModalPage({ params }: DetailModalProps) {
  const { id } = await params;
  const gather = await getGathering(id);
  const session = (await cookies()).get("session")?.value;
  const currentUser = session
    ? await Auth.getUsername(JSON.stringify(session))
    : null;

  const isAuthor = currentUser === gather?.user;

  if (!gather) {
    redirect("/");
  }

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
        isAuthor={isAuthor}
      />
    </ModalWrapper>
  );
}
