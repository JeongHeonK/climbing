import { ChangeEvent, useActionState, useEffect, useState } from "react";
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
  const [userInput, handleInput] = useInput(initialData);
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
            onChange={handleInput}
            value={userInput.email}
            type="text"
            id="email"
            name="email"
            placeholder="Enter Your Email"
            className="text-sm"
          />
          <Label htmlFor="password">Password</Label>
          <Input
            onChange={handleInput}
            value={userInput.password}
            type="password"
            id="password"
            name="password"
            placeholder="Enter Your Password"
            className="text-sm"
          />
          <Label htmlFor="passwordCheck">Password Check</Label>
          <Input
            onChange={handleInput}
            value={userInput.passwordCheck}
            type="password"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="Enter Your Password Again"
            className="text-sm"
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

const initialData = {
  email: "",
  password: "",
  passwordCheck: "",
};

const initialFormError: FormError = {
  state: null,
  message: null,
};

type Initial = typeof initialData;

const useInput = (data: Initial) => {
  const [userInput, setUserInput] = useState(data);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  return [userInput, handleInput] as const;
};
