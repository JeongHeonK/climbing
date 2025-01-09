"use client";

import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const PopupContext = createContext(false);
const ToggleContext = createContext(() => {});
const AuthenticationState = createContext(false);
const AuthenticationAction = createContext(() => {});

export default function ContextProvider({
  children,
  initialUserState,
}: PropsWithChildren<{ initialUserState: boolean }>) {
  const [popupState, setIsPopupState] = useState(false);
  const [isLogin, setIsLogin] = useState(initialUserState);

  const toggle = useCallback(() => {
    setIsPopupState((prev) => !prev);
  }, []);

  const handleUserState = useCallback(() => {
    setIsLogin((prev) => !prev);
  }, []);

  return (
    <AuthenticationAction.Provider value={handleUserState}>
      <AuthenticationState.Provider value={isLogin}>
        <PopupContext.Provider value={popupState}>
          <ToggleContext.Provider value={toggle}>
            {children}
          </ToggleContext.Provider>
        </PopupContext.Provider>
      </AuthenticationState.Provider>
    </AuthenticationAction.Provider>
  );
}

const usePopupState = () => {
  const isOpen = useContext(PopupContext);

  if (isOpen === undefined)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return isOpen;
};

const useToggle = () => {
  const toggle = useContext(ToggleContext);

  if (toggle === undefined)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return toggle;
};
const useUserState = () => {
  const isLogin = useContext(AuthenticationState);

  if (isLogin === undefined)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return isLogin;
};
const useAuthenticationAction = () => {
  const handleUserState = useContext(AuthenticationAction);

  if (handleUserState === undefined)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return handleUserState;
};

export { usePopupState, useToggle, useUserState, useAuthenticationAction };
