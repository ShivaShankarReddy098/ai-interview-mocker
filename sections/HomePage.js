"use client";
import Image from "next/image";
import imgSrc from "@/public/robot.avif";
import LetterPullup from "@/components/ui/letter-pullup";
import SlightFlip from "@/components/ui/flip-text";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full h-screen ">
          <Image src={imgSrc} className="-z-10 w-full h-screen" />
          <div className="z-10 absolute ">
            <LetterPullup
              words="AI Interview Mocker"
              className="text-white text-2xl mt-20 "
            />
            <SlightFlip
              word="Practice mock interviews with AI"
              className="text-white text-sm lg:text-lg"
            />
            <div className="items-center flex justify-center">
              <Button
                className=" mt-6 bg-blue-700 hover:bg-blue-200"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
