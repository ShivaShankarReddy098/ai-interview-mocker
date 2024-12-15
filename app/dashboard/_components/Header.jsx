"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import navImg from "@/public/logo.svg";
import { Menu, X } from "lucide-react";

export default function Header() {
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <header className="bg-secondary shadow-md fixed w-full z-50 top-0">
      {/* Header Container */}
      <div className="flex items-center justify-between p-4 lg:p-3">
        {/* Logo */}
        <Link href={"/"}>
          <Image
            src={navImg}
            width={120}
            height={60}
            alt="logo"
            className="w-[100px] h-auto"
          />
        </Link>

        {/* Menu Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-blue-700 transition duration-300"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Navigation Links */}
        <ul
          className={`absolute md:static top-16 left-0 w-full md:w-auto md:flex bg-secondary md:bg-transparent shadow-md md:shadow-none md:flex-row flex-col gap-6 md:gap-8 p-6 md:p-0 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <li
            className={`hover:text-blue-700 transition-all cursor-pointer ${
              path === "/dashboard" && "text-primary font-bold"
            }`}
          >
            <Link href={"/dashboard"} onClick={() => setIsOpen(false)}>
              Dashboard
            </Link>
          </li>
          <li
            className={`hover:text-blue-700 transition-all cursor-pointer ${
              path === "/dashboard/about" && "text-primary font-bold"
            }`}
          >
            <Link href={"/dashboard/about"} onClick={() => setIsOpen(false)}>
              About Us
            </Link>
          </li>
          <li
            className={`hover:text-blue-700 transition-all cursor-pointer ${
              path === "/dashboard/contact" && "text-primary font-bold"
            }`}
          >
            <Link href={"/dashboard/contact"} onClick={() => setIsOpen(false)}>
              Contact Us
            </Link>
          </li>
          <li
            className={`hover:text-blue-700 transition-all cursor-pointer ${
              path === "/dashboard/how" && "text-primary font-bold"
            }`}
          >
            <Link href={"/dashboard/how"} onClick={() => setIsOpen(false)}>
              How it Works?
            </Link>
          </li>
        </ul>

        {/* User Button */}
        <div className="hidden md:block">
          <UserButton />
        </div>
      </div>
    </header>
  );
}
