import { useFormStatus } from "react-dom";
import { MouseEvent } from "react";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/common/Spinner";
import { deleteGathering } from "../actions/gatheringActions";

export default function EditButtons({ id }: { id: string }) {
  const { pending } = useFormStatus();

  const handleDelete = async (e: MouseEvent) => {
    e.preventDefault();
    await deleteGathering(id);
  };

  return (
    <span className="flex gap-4">
      <Button>{pending ? <Spinner /> : "수정"}</Button>
      <Button className="bg-red-500" type="button" onClick={handleDelete}>
        삭제
      </Button>
    </span>
  );
}
