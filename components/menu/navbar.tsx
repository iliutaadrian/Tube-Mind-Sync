"use client";

import { useUser } from "@clerk/clerk-react";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { MobileMenu } from "./mobile-menu";
import useTranslation from "next-translate/useTranslation";

export const Navbar = () => {
  const { isSignedIn } = useUser();
  const { t } = useTranslation();
  const navigation = [
    { name: "Summary", href: "/summary" },
    { name: "Summary List", href: "/summary-list" },
  ];

  return (
    <nav className="fixed z-20 inset-x-0 top-0 px-10 shadow-neonLight align-middle flex flex-row justify-between items-center w-full h-16 bg-background">
      <Link
        href={"/"}
        className="text-2xl font-bold text-primary min-w-[200px]"
      >
        {t("common:title")}
      </Link>
      <div className="md:hidden text-muted-foreground">
        <MobileMenu navigation={navigation} />
      </div>

      <div className="hidden text-sm md:flex flex-row gap-5 align-middle items-center justify-end w-full">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="text-sm hover:text-primary"
          >
            {item.name}
          </Link>
        ))}
        {!isSignedIn && (
          <Link href={"/sign-in"} className="cursor-pointer">
            Login/Register{" "}
          </Link>
        )}
        <div className="flex flex-row justify-evenly items-center gap-5">
          <UserButton afterSignOutUrl="/" />
        </div>
        <ModeToggle />
      </div>
    </nav>
  );
};
