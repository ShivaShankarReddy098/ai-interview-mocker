// import { Boxes } from "@/components/ui/background-boxes";
"use client";

import Image from "next/image";

// import { motion } from "framer-motion";
// import { AuroraBackground } from "@/components/ui/aurora-background";
// import { Button } from "@/components/ui/button";
// import React from "react";
// import Link from "next/link";
import imgSrc from "@/public/robot.avif";
import LetterPullup from "@/components/ui/letter-pullup";
import SlightFlip from "@/components/ui/flip-text";
import { CoolMode } from "@/components/ui/cool-mode";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <>
      <section className="flex flex-col justify-center items-center">
        <Image src={imgSrc} className="-z-10 w-full" />
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
        </div>
      </section>
      {/* <SplinePage /> */}
      {/* <section className="">
        <AuroraBackground>
          {/* <div className="container">
            <h1 className="text-8xl font-bold tracking-tighter text-white ">
              AI SAAS
            </h1>
            <p className="text-white">Elevate your site visibility with AI.</p>
            <Button>Get Started</Button> */}
      {/* </div> */}
      {/* <h1 className="text-white text-8xl">AI Interview Mocker</h1> */}
      {/* <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="relative flex flex-col gap-4 items-center justify-center px-4"
          >
            <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
              Practice Interview through Our
            </div>
            <div className="font-bold text-base md:text-4xl dark:text-neutral-200 py-4">
              AI Interview Mocker
            </div>
            <Link href="/dashboard">
              <Button className="rounded-full font-semibold  w-fit text-white dark:text-black px-4 py-2">
                Start Now
              </Button>
            </Link>
          </motion.div>
        </AuroraBackground> */}
      {/* </section> */}
    </>
  );
}
