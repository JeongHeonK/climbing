export default function HomeScene() {
  return (
    <>
      <header className="flex w-full border justify-between">
        <div>logo</div>
        <div>이름</div>
        <menu>_</menu>
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
