import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cookies } from "next/headers";
import Image from "next/image";
import LogInButton from "./LogInButton";

export default async function Header() {
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return (
    <header className="bg-white z-50 fixed top-0 left-0 right-0 flex w-full border justify-between items-center px-2">
      <NavigationMenu>
        <NavigationMenuList className="py-1 gap-2">
          <NavigationMenuItem>
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/"
              className="text-sm hover:text-slate-500 transition-colors"
            >
              HOME
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/myClimbing"
              className="text-sm  hover:text-slate-500 transition-color"
            >
              MY CLIMBING
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <LogInButton isLogin={isLogin}>
        {isLogin ? "Log Out" : "Log In"}
      </LogInButton>
    </header>
  );
}
