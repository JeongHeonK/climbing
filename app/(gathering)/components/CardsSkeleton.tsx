import { Skeleton } from "@/components/ui/skeleton";

export default function CardsSkeleton({ count }: { count: number }) {
  const countArray = generateArray(count);

  return (
    <div className="max-w-[1100px] mx-auto">
      <div className="px-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-y-6 py-2 px-12 md:px-3 mx-auto">
        {countArray.map((num) => (
          <Skeleton key={num} className="h-[250px] w-[200px] mx-auto" />
        ))}
      </div>
    </div>
  );
}

const generateArray = (count: number) => {
  const countArray = Array.from({ length: count }, (_, idx) => idx + 1);

  return countArray;
};
