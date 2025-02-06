import { PropsWithChildren } from "react";

export default function GatheringsWrapper({ children }: PropsWithChildren) {
  return (
    <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
      {children}
    </div>
  );
}
