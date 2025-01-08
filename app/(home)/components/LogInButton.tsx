"use client";

import { PropsWithChildren } from "react";
import { useToggle } from "@/app/context/Popup";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";

interface Props {
  isLogin: boolean;
}

export default function LogInButton({
  isLogin,
  children,
}: PropsWithChildren<Props>) {
  const toggle = useToggle();

  return (
    <Button type="button" onClick={isLogin ? logout : toggle}>
      {children}
    </Button>
  );
}
