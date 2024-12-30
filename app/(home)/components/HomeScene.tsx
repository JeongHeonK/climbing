import Authentication from "@/app/components/Authentication";
import TestButton from "./TestButton";

export default function HomeScene() {
  return (
    <>
      <Authentication />
      <header className="flex w-full border justify-between">
        <div>logo</div>
        <div>이름</div>
        <div>
          메뉴
          <TestButton />
        </div>
      </header>
      <main className="w-full border">
        <section>모임생성하기</section>
        <section>태그들</section>
        <section>정렬순서</section>
        <section className="border">모임</section>
      </main>
    </>
  );
}
