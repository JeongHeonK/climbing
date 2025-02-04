"use client";

import { useCallback, useState } from "react";
import Login from "./Login";
import Signup from "./Signup";
import { usePopupStore } from "@/app/store/store";
import ModalWrapper from "./ModalWrapper";
import AuthenticationCardHeader from "./AuthenticationCardHeader";
import AuthenticationButton from "./AuthenticationButton";

export default function Authentication() {
  const [isMember, SetIsMember] = useState(true);
  const isOpen = usePopupStore((state) => state.popupState);

  const handleClick = useCallback(() => {
    SetIsMember((p) => !p);
  }, []);

  const handleReset = useCallback(() => {
    SetIsMember(true);
  }, []);

  if (isOpen) {
    return (
      <ModalWrapper onReset={handleReset}>
        {isMember ? (
          <Login
            onReset={handleReset}
            header={<AuthenticationCardHeader text="Welcome Back" />}
            button={
              <AuthenticationButton isMember={isMember} onClick={handleClick} />
            }
          />
        ) : (
          <Signup
            onReset={handleReset}
            header={<AuthenticationCardHeader text="Welcome Here" />}
            button={
              <AuthenticationButton isMember={isMember} onClick={handleClick} />
            }
          />
        )}
      </ModalWrapper>
    );
  }
}
