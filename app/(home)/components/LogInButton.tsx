"use client";

import { useToggle } from "@/app/context/Popup";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";

interface Props {
  isLogin: boolean;
}

export default function LogInButton({ isLogin }: Props) {
  const toggle = useToggle();

  return (
    <Button type="button" onClick={isLogin ? logout : toggle}>
      {isLogin ? "로그아웃" : "로그인"}
    </Button>
  );
}
