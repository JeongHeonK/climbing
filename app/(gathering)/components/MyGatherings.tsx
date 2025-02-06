import Gathering from "@/app/(home)/components/Gathering";
import GatheringsWrapper from "@/app/components/common/GatheringsWrapper";
import { useMyGatheringsStore } from "@/app/store/store";

interface MyGatheringsProps {
  isLogin: boolean;
}

export default function MyGatherings({ isLogin }: MyGatheringsProps) {
  const onDelete = useMyGatheringsStore((state) => state.handleDelete);
  const myGatherings = useMyGatheringsStore((state) => state.myGatherings);

  return (
    <GatheringsWrapper>
      {myGatherings?.map((gathering) => {
        return (
          <Gathering
            key={gathering._id}
            id={gathering._id}
            user={gathering.user}
            title={gathering.title}
            date={gathering.date}
            lat={Number(gathering.lat)}
            lng={Number(gathering.lng)}
            isLogin={isLogin}
            onDelete={onDelete}
          />
        );
      })}
    </GatheringsWrapper>
  );
}
