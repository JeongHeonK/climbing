"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  const handleClickHome = () => {
    router.push("/");
  };

  useEffect(() => {
    console.log("error: ", error);
  }, [error]);

  const handleClickReset = () => {
    reset();
  };

  return (
    <div className="flex-col flex pt-36 gap-5 items-center w-full">
      <h2 className="text-3xl">Something went wrong! :(</h2>
      <div className="flex gap-3">
        <Button
          onClick={handleClickHome}
          type="button"
          className="bg-slate-300 text-black hover:bg-slate-400"
        >
          go home
        </Button>
        <Button onClick={handleClickReset} type="button">
          Try again
        </Button>
      </div>
    </div>
  );
}
