"use client";

import { PropsWithChildren } from "react";
import { useToggle } from "@/app/context/ContextProvider";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";

export default function LogInButton({
  isLogin,
  children,
}: PropsWithChildren<{ isLogin: boolean }>) {
  const toggle = useToggle();

  return (
    <Button type="button" onClick={isLogin ? logout : toggle}>
      {children}
    </Button>
  );
}
