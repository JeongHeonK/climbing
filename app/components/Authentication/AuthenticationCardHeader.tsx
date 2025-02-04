import { CardHeader, CardTitle } from "@/components/ui/card";

interface AuthenticationCardHeaderProps {
  text: string;
}

export default function AuthenticationCardHeader({
  text,
}: AuthenticationCardHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-center">{text}</CardTitle>
    </CardHeader>
  );
}
