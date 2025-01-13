import { cookies } from "next/headers";
import Gathering from "./Gathering";
import NewGatheringBtn from "./NewGatheringBtn";
import { getGathering } from "../actions/getGatherings";

export default async function HomeScene() {
  const isLogin = (await cookies()).get("session") !== undefined;
  const gatherings = await getGathering();

  return (
    <main className="w-full bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        <h3 className="ml-7 p-1 font-semibold">Join us</h3>
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
                date={new Date(gathering.date)}
                isLogin={isLogin}
              />
            );
          })}
        </div>
      </div>
      <NewGatheringBtn isLogin={isLogin} />
    </main>
  );
}
