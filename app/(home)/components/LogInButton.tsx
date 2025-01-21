"use client";

import { useState } from "react";
import { useToggle } from "@/app/context/PopupContext";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/common/Spinner";
import { useRouter } from "next/navigation";
import { logout } from "../actions/logout";

export default function LogInButton({ loginStatus }: { loginStatus: boolean }) {
  const toggle = useToggle();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(loginStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLogin) {
      setIsLoading(true);
      await logout();
      setIsLogin(false);
      setIsLoading(false);
      router.push("/");
    } else {
      toggle();
    }
  };

  return (
    <Button type="button" className="w-20" onClick={handleClick}>
      {isLoading ? <Spinner /> : getButtonText(isLogin)}
    </Button>
  );
}

const getButtonText = (isLogin: boolean) => {
  return isLogin ? "Log Out" : "Log In";
};
