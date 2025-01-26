import { useFormStatus } from "react-dom";
import { MouseEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/common/Spinner";
import { deleteGathering } from "../actions/gatheringActions";

export default function EditButtons({ id }: { id: string }) {
  const { pending, handleDelete, isLoading } = useEditButton(id);

  return (
    <span className="flex gap-4">
      <Button className="w-16">{pending ? <Spinner /> : "수정"}</Button>
      <Button className="bg-red-500 w-16" type="button" onClick={handleDelete}>
        {isLoading ? <Spinner /> : "삭제"}
      </Button>
    </span>
  );
}

const useEditButton = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const { pending } = useFormStatus();
  const router = useRouter();

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await deleteGathering(id);
    setIsLoading(false);
    router.push("/");
  };

  return { isLoading, pending, handleDelete };
};
