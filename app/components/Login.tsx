import { ChangeEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Login() {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserInput((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-center">Welcome Back</CardTitle>
      </CardHeader>
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
          <Button type="submit" className="mt-3">
            Login
          </Button>
        </form>
      </CardContent>
    </>
  );
}
