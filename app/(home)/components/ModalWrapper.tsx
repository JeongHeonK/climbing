"use client";

import { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";

export default function ModalWrapper({ children }: PropsWithChildren) {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <div className="bg-slate-900/50 fixed z-40 inset-0" onClick={handleClick}>
      {children}
    </div>
  );
}
