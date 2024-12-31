import Authentication from "@/app/components/Authentication";
import Header from "./Header";
import CustomBadge from "./CustomBadge";
import Gathering from "./Gathering";

export default function HomeScene() {
  return (
    <>
      <Authentication />
      <Header />
      <main className="w-full">
        <section className="flex gap-3 py-3 px-1">
          <CustomBadge>모임생성하기</CustomBadge>
          <CustomBadge>태그들</CustomBadge>
          <CustomBadge>정렬순서</CustomBadge>
        </section>
        <section className="border flex flex-wrap gap-3 p-3">
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
        </section>
      </main>
    </>
  );
}
