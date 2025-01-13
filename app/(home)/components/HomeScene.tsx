import { cookies } from "next/headers";
import NewGatheringBtn from "./NewGatheringBtn";
import Gatherings from "./Gatherings";

export default async function HomeScene() {
  const isLogin = (await cookies()).get("session") !== undefined;

  return (
    <main className="w-full bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        <h3 className="ml-7 p-1 font-semibold">Join us</h3>
        <Gatherings isLogin={isLogin} />
      </div>
      <NewGatheringBtn isLogin={isLogin} />
    </main>
  );
}
