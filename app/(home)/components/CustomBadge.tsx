"use client";

import { Badge } from "@/components/ui/badge";
import { PropsWithChildren, useState } from "react";

export default function CustomBadge({ children }: PropsWithChildren) {
  const [isActive, handleClick] = useActive();
  return (
    <Badge
      variant={isActive ? "default" : "outline"}
      className="cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </Badge>
  );
}

const useActive = () => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((prev) => !prev);
  };

  return [isActive, handleClick] as const;
};
