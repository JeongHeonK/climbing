import Gathering from "./Gathering";

export default async function HomeScene() {
  return (
    <main className="w-full">
      <div className="border px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 py-2 px-12 md:px-3">
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-11-30 03:00")}
          location="더 클라이밍 양재"
        />
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-12-07 03:00")}
          location="더 클라이밍 양재"
        />
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-12-14 03:00")}
          location="더 클라이밍 양재"
        />
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-12-21 03:00")}
          location="더 클라이밍 양재"
        />
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-12-28 03:00")}
          location="더 클라이밍 양재"
        />
        <Gathering
          title="양재 클라이밍"
          date={new Date("2024-01-04 03:00")}
          location="더 클라이밍 양재"
        />
      </div>
    </main>
  );
}
