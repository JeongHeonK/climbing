import { ReactNode } from "react";

export type FormError =
  | {
      state: "error";
      message: string;
      input: {
        email?: string;
        password?: string;
      };
    }
  | {
      state: "success";
      message: null;
      input: null;
    }
  | {
      state: null;
      message: null;
      input: null;
    };

export interface PropsWithReactNode {
  header: ReactNode;
  button: ReactNode;
  onReset: () => void;
}
