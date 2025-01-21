"use client";

import { PropsWithChildren, MouseEvent } from "react";
import { useToggle } from "@/app/context/PopupContext";
import { NavigationMenuLink } from "@/components/ui/navigation-menu";
import { useToast } from "@/hooks/use-toast";

export default function CustomLink({
  children,
  isLogin,
}: PropsWithChildren<{ isLogin: boolean }>) {
  const { toast } = useToast();
  const toggle = useToggle();

  const handleClick = (e: MouseEvent) => {
    if (!isLogin) {
      e.preventDefault();
      toggle();
      toast({ description: "로그인 후 이용해주세요" });
    }
  };
  return (
    <NavigationMenuLink
      href="/myClimbing"
      className="text-sm  hover:text-slate-500 transition-color"
      onClick={handleClick}
    >
      {children}
    </NavigationMenuLink>
  );
}
