import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";
import { login } from "./actions/login";
import { FormError, PropsWithReactNode } from "./type";
import { usePopupStore } from "@/app/store/store";

export default function Login({ header, button, onReset }: PropsWithReactNode) {
  const [formState, formAction] = useActionState(login, initialFormError);
  const toggle = usePopupStore((state) => state.toggle);
  const router = useRouter();

  useEffect(() => {
    if (formState.state === "success") {
      toggle();
      onReset();
      router.push("/");
    }
  }, [toggle, onReset, formState.state, router]);

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
