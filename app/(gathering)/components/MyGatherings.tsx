import Gathering from "@/app/(home)/components/Gathering";
import { useMyGatheringsStore } from "@/app/store/store";

interface MyGatheringsProps {
  isLogin: boolean;
}

export default function MyGatherings({ isLogin }: MyGatheringsProps) {
  const onDelete = useMyGatheringsStore((state) => state.handleDelete);
  const myGatherings = useMyGatheringsStore((state) => state.myGatherings);

  return (
    <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
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
    </div>
  );
}
