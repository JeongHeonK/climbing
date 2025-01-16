import { useEffect, useState, MouseEvent } from "react";

export interface LikeButtonProps {
  id: string;
  date: Date;
}

export default function LikeButton({ id, date }: LikeButtonProps) {
  const [like, setLike] = useState(false);

  const handleLikeClick = (e: MouseEvent) => {
    e.stopPropagation();

    if (typeof window === "undefined") return;

    if (!like) {
      const myGatherings = window.localStorage.getItem("mine");
      const gathering = {
        id,
        date,
      };

      if (!myGatherings) {
        const gatheringArray = [];
        gatheringArray.push(gathering);
        window.localStorage.setItem("mine", JSON.stringify(gatheringArray));
      } else {
        const gatheringArray: LikeButtonProps[] = JSON.parse(myGatherings);
        gatheringArray.push(gathering);
        gatheringArray.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );

        window.localStorage.setItem("mine", JSON.stringify(gatheringArray));
      }

      setLike(true);
    } else {
      const myGatherings = window.localStorage.getItem("mine");
      if (!myGatherings) return;

      let gatheringArray = JSON.parse(myGatherings);

      gatheringArray = gatheringArray.filter(
        (gathering: LikeButtonProps) => gathering.id !== id,
      );

      window.localStorage.setItem("mine", JSON.stringify(gatheringArray));
      setLike(false);
    }
  };

  useEffect(() => {
    const result = window.localStorage.getItem("mine");
    if (!result) return;
    const gatheringArray: LikeButtonProps[] = JSON.parse(result);
    if (gatheringArray.some((gathering) => gathering.id === id)) {
      setLike(true);
    }
  }, [id]);

  return (
    <button
      type="button"
      className={`absolute px-2 py-0.5 rounded-md right-0 -top-2 ${like ? "text-white bg-slate-900" : "text-slate-800 bg-white"}`}
      onClick={handleLikeClick}
    >
      +
    </button>
  );
}
