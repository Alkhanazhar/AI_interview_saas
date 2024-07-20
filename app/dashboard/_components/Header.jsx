"use client";
import Image from "next/image";
import React from "react";
import Logo from "./logo";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import Link from "next/link";
const Header = () => {
  const path = usePathname();
  return (
    <div className={`bg-secondary p-4 lg:px-36 md:px-20 flex items-center justify-between `}>
      <Logo />
      <h2 className="md:hidden flex text-primary font-medium text-xl">
      <Link href={"/"}>

          Ai-interview-buddy
      </Link>
      </h2>
      <ul className="gap-6 hidden md:flex">
        <Link href={"/dashboard"}
          className={`cursor-pointer hover:font-bold hover:text-primary ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          dashboard
        </Link>
        <li
          className={`cursor-pointer hover:font-bold hover:text-primary ${
            path == "/dashboard/interview" && "text-primary font-bold"
          }`}
        >
          interview
        </li>
        <li
          className={`cursor-pointer hover:font-bold hover:text-primary ${
            path == "/dashboard/questions" && "text-primary font-bold"
          }`}
        >
          questions
        </li>
        <li
          className={`cursor-pointer hover:font-bold hover:text-primary ${
            path == "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          how
        </li>
      </ul>
      <UserButton />
    </div>
  );
};

export default Header;
