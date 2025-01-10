import Spinner from "@/app/components/common/Spinner";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="mt-3 w-24">
      {pending ? <Spinner /> : "모임 만들기"}
    </Button>
  );
}
