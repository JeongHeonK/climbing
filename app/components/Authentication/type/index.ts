import { ReactNode } from "react";

export type FormError =
  | {
      state: "error";
      message: string;
    }
  | {
      state: "success";
      message: null;
    }
  | {
      state: null;
      message: null;
    };

export interface PropsWithReactNode {
  header: ReactNode;
  button: ReactNode;
}
