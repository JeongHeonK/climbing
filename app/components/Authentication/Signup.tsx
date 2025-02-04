import { useActionState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { signup } from "./actions/signup";
import { FormError, PropsWithReactNode } from "./type";
import { usePopupStore } from "@/app/store/store";

export default function Signup({
  header,
  button,
  onReset,
}: PropsWithReactNode) {
  const [formState, formAction] = useActionState(signup, initialFormError);
  const toggle = usePopupStore((state) => state.toggle);

  useEffect(() => {
    if (formState.state === "success") {
      toggle();
      onReset();
    }
  }, [toggle, onReset, formState.state]);

  return (
    <>
      {header}
      <CardContent>
        <form className="grid gap-3" action={formAction}>
          <Label htmlFor="email">Email</Label>
          <Input
            type="text"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="text-sm"
            defaultValue={formState.input?.email || ""}
          />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="text-sm"
            defaultValue={formState.input?.password || ""}
          />
          <Label htmlFor="passwordCheck">Password Check</Label>
          <Input
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="Enter Your Password Again"
            className="text-sm"
            defaultValue={formState.input?.passwordCheck || ""}
          />
          <p className="text-sm text-red-600 -mt-1 -mb-4">
            {formState?.message || " "}
          </p>
          {button}
        </form>
      </CardContent>
    </>
  );
}

const initialFormError: FormError = {
  state: null,
  message: null,
  input: null,
};
