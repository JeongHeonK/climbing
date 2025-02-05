import { useRouter } from "next/navigation";
import { useState, MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import { deleteGathering } from "../actions/gatheringActions";
import Spinner from "@/app/components/common/Spinner";

export default function DeleteButton({ id }: { id: string }) {
  const { isLoading, handleDelete } = useDeleteButton(id);
  return (
    <Button className="bg-red-500 w-16" type="button" onClick={handleDelete}>
      {isLoading ? <Spinner /> : "삭제"}
    </Button>
  );
}

const useDeleteButton = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    await deleteGathering(id);
    setIsLoading(false);
    router.push("/");
  };

  return { isLoading, handleDelete };
};
