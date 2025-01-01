import { ChangeEvent, ReactNode, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent } from "@/components/ui/card";

interface SignupProps {
  header: ReactNode;
  button: ReactNode;
}

export default function Signup({ header, button }: SignupProps) {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    passwordCheck: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {header}
      <CardContent>
        <form className="grid gap-3">
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
            type="passwordCheck"
            id="passwordCheck"
            name="passwordCheck"
            placeholder="Enter Your Password Again"
            className="text-sm"
          />
          {button}
        </form>
      </CardContent>
    </>
  );
}
