"use client";

import { MouseEvent, useState } from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePopupState, useToggle } from "../../context/Popup";
import Login from "./Login";
import Signup from "./Signup";

export default function Authentication() {
  const [isMember, SetIsMember] = useState(true);
  const isOpen = usePopupState();
  const toggle = useToggle();
  const preventPropagation = (e: MouseEvent) => e.stopPropagation();

  const handleClick = () => {
    SetIsMember((p) => !p);
  };

  if (isOpen) {
    return (
      <div
        className="w-full absolute top-0 right-0 bottom-0 bg-slate-900/75 z-50"
        onClick={toggle}
      >
        <Card
          className="absolute top-40 flex flex-col max-w-[350px] mx-auto left-0 right-0"
          onClick={preventPropagation}
        >
          {isMember ? (
            <Login
              header={<AuthenticationCardHeader text="Welcome Back" />}
              button={
                <AuthenticationButton
                  isMember={isMember}
                  onClick={handleClick}
                />
              }
            />
          ) : (
            <Signup
              header={<AuthenticationCardHeader text="Welcome Here" />}
              button={
                <AuthenticationButton
                  isMember={isMember}
                  onClick={handleClick}
                />
              }
            />
          )}
        </Card>
      </div>
    );
  }
}

interface AuthenticationButtonProps {
  isMember: boolean;
  onClick: () => void;
}

function AuthenticationButton({
  isMember,
  onClick,
}: AuthenticationButtonProps) {
  return (
    <>
      <Button type="submit" className="mt-3">
        {isMember ? "Welcome Back" : "Welcome Here"}
      </Button>
      <div className="text-center text-sm">
        {isMember ? "Don't have an account? " : "Already Member? "}
        <span onClick={onClick} className="underline underline-offset-4">
          {isMember ? "Sign up" : "Log In"}
        </span>
      </div>
    </>
  );
}

interface AuthenticationCardHeaderProps {
  text: string;
}

function AuthenticationCardHeader({ text }: AuthenticationCardHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-center">{text}</CardTitle>
    </CardHeader>
  );
}
