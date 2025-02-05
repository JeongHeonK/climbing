import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Spinner from "@/app/components/common/Spinner";

export default function EditButton() {
  const { pending } = useFormStatus();

  return <Button className="w-16">{pending ? <Spinner /> : "수정"}</Button>;
}
