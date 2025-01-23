import { useState, MouseEvent, useEffect } from "react";
import { useLocalStorageStore } from "@/app/store/store";

export interface LikeButtonProps {
  id: string;
  date: Date;
  onDelete?: (id: string) => void;
}

export default function LikeButton({ id, date, onDelete }: LikeButtonProps) {
  const myGatherings = useLocalStorageStore((state) => state.mine);
  const [like, setLike] = useState(false);

  const addGathering = useLocalStorageStore((state) => state.addMine);
  const deleteGathering = useLocalStorageStore((state) => state.deleteMine);

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();
    if (!like) {
      addGathering(id, date);
      setLike(true);
    } else {
      deleteGathering(id);
      setLike(false);
      if (onDelete) onDelete(id);
    }
  };

  useEffect(() => {
    if (myGatherings === undefined) return;
    setLike(
      myGatherings?.some((gathering: [string, Date]) => gathering[0] === id),
    );
  }, [myGatherings, id]);

  return (
    <button
      data-cy="like"
      type="button"
      className={`absolute px-2 py-0.5 rounded-md right-0 -top-2 ${like ? "text-white bg-slate-900" : "text-slate-800 bg-white"}`}
      onClick={handleLikeClick}
    >
      +
    </button>
  );
}
