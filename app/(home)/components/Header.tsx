import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogInButton from "./LogInButton";

export default async function Header() {
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return (
    <header className="flex w-full border justify-between items-center">
      <NavigationMenu>
        <NavigationMenuList className="pl-2 py-1">
          <NavigationMenuItem>
            <NavigationMenuLink href="/">
              <Image src="/logo.png" width={50} height={50} alt="logo" />
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Menu</NavigationMenuTrigger>
            <NavigationMenuContent className="w-[120px] p-3 ">
              <Link href="/myPage" className="hover:font-bold transition-all">
                My Climbing
              </Link>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <LogInButton isLogin={isLogin}>
        {isLogin ? "Log In" : "Log Out"}
      </LogInButton>
    </header>
  );
}
