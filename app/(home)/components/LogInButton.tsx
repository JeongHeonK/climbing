"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/common/Spinner";
import { logout } from "../actions/logout";
import { usePopupStore } from "@/app/store/store";

export default function LogInButton({ loginStatus }: { loginStatus: boolean }) {
  const toggle = usePopupStore((state) => state.toggle);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (loginStatus) {
      setIsLoading(true);
      await logout();
      setIsLoading(false);
      router.push("/");
    } else {
      toggle();
    }
  };

  return (
    <Button type="button" className="w-20" onClick={handleClick}>
      {isLoading ? <Spinner /> : getButtonText(loginStatus)}
    </Button>
  );
}

const getButtonText = (isLogin: boolean) => {
  return isLogin ? "Log Out" : "Log In";
};
