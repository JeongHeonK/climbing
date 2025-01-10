import Gathering from "./Gathering";
import NewGatheringBtn from "./NewGatheringBtn";

export default async function HomeScene() {
  return (
    <main className="w-full bg-slate-50">
      <div className="max-w-[1100px] mx-auto">
        <h3 className="ml-7 p-1 font-semibold">Join us</h3>
        <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-11-30 03:00")}
            id="map"
          />
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-12-07 03:00")}
            id="map2"
          />
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-12-14 03:00")}
            id="map3"
          />
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-12-21 03:00")}
            id="map4"
          />
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-12-28 03:00")}
            id="map5"
          />
          <Gathering
            title="양재 클라이밍"
            date={new Date("2024-01-04 03:00")}
            id="map6"
          />
        </div>
      </div>
      <NewGatheringBtn />
    </main>
  );
}
