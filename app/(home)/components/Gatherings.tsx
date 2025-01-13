import { getGathering } from "../actions/getGatherings";
import Gathering from "./Gathering";

export default async function Gatherings({ isLogin }: { isLogin: boolean }) {
  const gatherings = await getGathering();

  return (
    <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
      {gatherings.map((gathering) => {
        return (
          <Gathering
            key={gathering._id}
            id={gathering._id.toString()}
            user={gathering.user}
            title={gathering.title}
            lat={Number(gathering.lat)}
            lng={Number(gathering.lng)}
            date={gathering.date}
            isLogin={isLogin}
          />
        );
      })}
    </div>
  );
}
