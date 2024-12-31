"use client";

import { useToggle } from "@/app/context/Popup";

export default function TestButton() {
  const toggle = useToggle();

  return (
    <button
      type="button"
      onClick={toggle}
      className="bg-black py-2 px-3 text-white text-m"
    >
      로그인 버튼
    </button>
  );
}
