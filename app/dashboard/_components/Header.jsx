"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Header() {
  const path = usePathname();
  return (
    <div className="flex p-4 items-center justify-between bg-secondary shadow-md fixed w-full z-50 top-0">
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={160} height={100} alt="logo" />
      </Link>
      <ul className="hidden md:flex gap-6">
        <li
          className={`hover:text-yellow-300 transition-all cursor-pointer ${
            path == "/dashboard" && "text-primary font-bold"
          }`}
        >
          <Link href={"/dashboard"}>Dashboard</Link>
        </li>
        <li
          className={`hover:text-yellow-300 transition-all cursor-pointer ${
            path == "/dashboard/about" && "text-primary font-bold"
          }`}
        >
          About Us
        </li>
        <li
          className={`hover:text-yellow-300 transition-all cursor-pointer ${
            path == "/dashboard/Conatct" && "text-primary font-bold"
          }`}
        >
          Contact Us
        </li>
        <li
          className={`hover:text-yellow-300 transition-all cursor-pointer ${
            path == "/dashboard/how" && "text-primary font-bold"
          }`}
        >
          How it Works?
        </li>
      </ul>
      <UserButton />
    </div>
  );
}
