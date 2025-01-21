import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();
  const handleClickHome = () => {
    router.push("/");
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
      </div>
    </div>
  );
}
