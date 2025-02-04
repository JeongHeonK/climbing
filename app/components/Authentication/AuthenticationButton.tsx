import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import Spinner from "../common/Spinner";

interface AuthenticationButtonProps {
  isMember: boolean;
  onClick: () => void;
}

export default function AuthenticationButton({
  isMember,
  onClick,
}: AuthenticationButtonProps) {
  const { pending } = useFormStatus();

  return (
    <>
      <Button type="submit" className="mt-3" disabled={pending}>
        {pending && pending ? <Spinner /> : getButtonText(isMember)}
      </Button>
      <div className="text-center text-sm">
        {isMember ? "Don't have an account? " : "Already Member? "}
        <span
          onClick={onClick}
          className="underline underline-offset-4 cursor-pointer"
        >
          {isMember ? "Sign up" : "Log In"}
        </span>
      </div>
    </>
  );
}

const getButtonText = (memberState: boolean) => {
  return memberState ? "Log In" : "Sign Up";
};
