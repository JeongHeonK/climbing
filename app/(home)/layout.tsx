import { PropsWithChildren, ReactNode } from "react";

export default function HomeLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
