import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

const PopupContext = createContext(false);
const ToggleContext = createContext(() => {});

export default function PopupProvider({ children }: PropsWithChildren) {
  const [popupState, setIsPopupState] = useState(false);

  const toggle = useCallback(() => {
    setIsPopupState((prev) => !prev);
  }, []);

  return (
    <PopupContext.Provider value={popupState}>
      <ToggleContext.Provider value={toggle}>{children}</ToggleContext.Provider>
    </PopupContext.Provider>
  );
}

const usePopupState = () => {
  const isOpen = useContext(PopupContext);

  if (!isOpen)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return isOpen;
};

const useToggle = () => {
  const toggle = useContext(ToggleContext);

  if (!toggle)
    throw new Error("useToggle은 provider 내부에서 사용가능 합니다.");

  return toggle;
};

export { usePopupState, useToggle };
