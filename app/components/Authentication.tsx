"use client";

import { usePopupState, useToggle } from "../context/Popup";

export default function Authentication() {
  const isOpen = usePopupState();
  const toggle = useToggle();

  if (isOpen) {
    return (
      <div
        className="w-full absolute top-0 right-0 bottom-0 bg-slate-900/75"
        onClick={toggle}
      >
        <p className="text-white text-lg" onClick={(e) => e.stopPropagation()}>
          배경
        </p>
      </div>
    );
  }
}
