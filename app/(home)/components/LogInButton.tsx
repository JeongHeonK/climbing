"use client";

import { useToggle } from "@/app/context/Popup";
import { Button } from "@/components/ui/button";

export default function LogInButton() {
  const toggle = useToggle();

  return (
    <Button type="button" onClick={toggle}>
      로그인
    </Button>
  );
}
