"use client";

import { MouseEvent } from "react";
import { Card } from "@/components/ui/card";
import { usePopupState, useToggle } from "../context/Popup";
import Login from "./Login";

export default function Authentication() {
  const isOpen = usePopupState();
  const toggle = useToggle();
  const preventPropagation = (e: MouseEvent) => e.stopPropagation();

  if (isOpen) {
    return (
      <div
        className="w-full absolute top-0 right-0 bottom-0 bg-slate-900/75 z-50"
        onClick={toggle}
      >
        <Card
          className="absolute top-40 flex flex-col max-w-[350px] mx-auto left-0 right-0"
          onClick={preventPropagation}
        >
          {/* <Signup /> */}
          <Login />
        </Card>
      </div>
    );
  }
}
