import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import LogInButton from "./LogInButton";
import CustomLink from "./CustomLink";

export default async function Header() {
  const session = (await cookies()).get("session");
  const isLogin = session !== undefined;

  return (
    <header className="bg-white z-50 fixed top-0 left-0 right-0 flex w-full border justify-between items-center px-2">
      <NavigationMenu>
        <NavigationMenuList className="py-1 gap-2">
          <NavigationMenuItem>
            <Image
              src="/logo.png"
              alt="logo"
              priority
              width={35}
              height={35}
              className="w-auto h-auto"
            />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link
              href="/"
              className="text-sm hover:text-slate-500 transition-colors"
            >
              HOME
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <CustomLink isLogin={isLogin}>MY CLIMBING</CustomLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <LogInButton loginStatus={isLogin} />
    </header>
  );
}
