"use client";

import { MouseEvent, useCallback, useState } from "react";
import { useFormStatus } from "react-dom";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { usePopupState, useToggle } from "../../context/Popup";
import Login from "./Login";
import Signup from "./Signup";
import Spinner from "../common/Spinner";

export default function Authentication() {
  const [isMember, SetIsMember] = useState(true);
  const isOpen = usePopupState();
  const toggle = useToggle();
  const preventPropagation = (e: MouseEvent) => e.stopPropagation();

  const handleClick = useCallback(() => {
    SetIsMember((p) => !p);
  }, []);

  const handleClose = useCallback(() => {
    SetIsMember(true);
  }, []);

  if (isOpen) {
    return (
      <div
        className="w-full absolute top-0 right-0 bottom-0 bg-slate-900/75 z-50"
        onClick={() => {
          toggle();
          handleClose();
        }}
      >
        <Card
          className="absolute top-40 flex flex-col max-w-[350px] mx-auto left-0 right-0"
          onClick={preventPropagation}
        >
          {isMember ? (
            <Login
              onClose={handleClose}
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
              onClose={handleClose}
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

const getButtonText = (memberState: boolean) => {
  return memberState ? "Log In" : "Sign Up";
};

function AuthenticationButton({
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
