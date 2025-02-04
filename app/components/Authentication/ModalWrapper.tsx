import { memo, PropsWithChildren } from "react";
import { stopBubbling } from "@/app/util";
import { Card } from "@/components/ui/card";
import { usePopupStore } from "@/app/store/store";

function ModalWrapper({
  children,
  onReset,
}: PropsWithChildren<{ onReset: () => void }>) {
  const toggle = usePopupStore((state) => state.toggle);

  return (
    <div
      data-cy="modal-bg"
      className="w-full fixed top-0 right-0 bottom-0 bg-slate-900/75 z-50"
      onClick={() => {
        toggle();
        onReset();
      }}
    >
      <Card
        className="absolute top-40 flex flex-col max-w-[350px] mx-auto left-0 right-0"
        onClick={stopBubbling}
      >
        {children}
      </Card>
    </div>
  );
}

export default memo(ModalWrapper);
