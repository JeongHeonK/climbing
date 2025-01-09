"use client";

import { useCallback } from "react";
import {
  useAuthenticationAction,
  useToggle,
  useUserState,
} from "@/app/context/ContextProvider";
import { Button } from "@/components/ui/button";
import { logout } from "../actions/logout";

export default function LogInButton() {
  const userState = useUserState();
  const logoutUser = useAuthenticationAction();
  const toggle = useToggle();

  const handleLogout = useCallback(() => {
    logout();
    logoutUser();
  }, [logoutUser]);

  return (
    <Button type="button" onClick={userState ? handleLogout : toggle}>
      {userState ? "Log Out" : "Log In"}
    </Button>
  );
}
