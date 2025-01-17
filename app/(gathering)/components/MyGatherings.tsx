import Gathering from "@/app/(home)/components/Gathering";
import { IGathering } from "@/app/(home)/types/type";

interface MyGatheringsProps {
  myGatherings: IGathering[];
  isLogin: boolean;
  onDelete: (id: string) => void;
}

export default function MyGatherings({
  myGatherings,
  isLogin,
  onDelete,
}: MyGatheringsProps) {
  return (
    <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
      {myGatherings.map((gathering) => {
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
