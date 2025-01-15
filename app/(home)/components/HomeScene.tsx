import { cookies } from "next/headers";
import NewGatheringBtn from "./NewGatheringBtn";
import Gatherings from "./Gatherings";
import { getGatherings } from "../actions/getGatherings";
import DefaultGathering from "./DefaultGathering";

export default async function HomeScene() {
  const isLogin = (await cookies()).get("session") !== undefined;
  const { gatherings: initialGatherings } = await getGatherings();

  return (
    <main className="w-full bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        <h3 className="ml-7 p-1 font-semibold">Join us</h3>
        {initialGatherings ? (
          <Gatherings isLogin={isLogin} initialGatherings={initialGatherings} />
        ) : (
          <DefaultGathering />
        )}
      </div>
      <NewGatheringBtn isLogin={isLogin} />
    </main>
  );
}
