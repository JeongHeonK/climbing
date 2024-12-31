import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface GatheringProps {
  title: string;
  date: Date;
  location: string;
  image?: string;
}

export default function Gathering({
  title,
  date,
  location,
  image,
}: GatheringProps) {
  const newDate = new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  }).format(date);

  return (
    <Card className="hover:-translate-y-2 transition-all">
      <CardHeader className="mb-0 pb-2">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{newDate}</CardDescription>
      </CardHeader>
      <CardContent className="align-middle">
        {image || <div className="size-32 mx-auto bg-slate-600 rounded-md" />}
        <p className="mt-2">{location}</p>
      </CardContent>
    </Card>
  );
}
