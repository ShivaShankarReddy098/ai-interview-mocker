"use client";
import Image from "next/image";
import imgSrc from "@/public/robot.avif";
import LetterPullup from "@/components/ui/letter-pullup";
import SlightFlip from "@/components/ui/flip-text";
import { CoolMode } from "@/components/ui/cool-mode";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <Image src={imgSrc} className="-z-10 w-full h-screen" />
          <div className="z-10 absolute">
            <LetterPullup
              words="AI Interview Mocker"
              className="text-white text-2xl"
            />
            <SlightFlip
              word="Practice mock interviews with AI"
              className="text-white text-sm"
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
        {/* <Image src={imgSrc} className="-z-10 w-full"/>
        <div className="z-10 absolute flex  flex-col">
          <LetterPullup words="AI Interview Mocker" className="text-white" />
          <SlightFlip
            word="Elevate your site visibility with AI"
            className="text-white"
          />
          <CoolMode>
            <div className="flex items-center justify-center">
              <Button
                className="p-6  mt-6"
                onClick={() => (window.location.href = "/dashboard")}
              >
                Get Started
              </Button>
            </div>
          </CoolMode>
          {/* <div className="z-10  relative left-20">
            <p className="text-white ">Scroll down</p>
          </div> */}
        {/* </div> */}
      </section>
    </>
  );
}
