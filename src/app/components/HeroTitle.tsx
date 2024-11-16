"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap-trial";
import TextPlugin from "gsap-trial/TextPlugin";

gsap.registerPlugin(TextPlugin); // Register the TextPlugin

const HeroTitle = () => {
  const titleRef = useRef<HTMLHeadingElement>(null); // Reference for the <h1>
    const firstPRef = useRef<HTMLParagraphElement>(null); // Reference for the first <p>
  

  useEffect(() => {
    // Animate the <h1> on load
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 100 },
        { opacity: 1, y: 0, duration: 2, ease: "power3.out" }
      );
    }

    // Typing effect for "NOT JUST A DEV"
    if (firstPRef.current) {
      gsap.fromTo(
        firstPRef.current,
        { text: "..." }, // Start with an empty string
        {
          text: "LIFE OF A  DEV", // Full text to type
          duration: 3.5, // Time for the typing animation
          ease: "back.in", // Linear typing
            delay: 0.1, // Start after the <h1> animation
            repeat: -1, // Repeat indefinitely
          repeatDelay: 1,
        }
      );
    }
  }, []);
    
    

  return (
    <div className="text-center flex flex-col">
      <h1 ref={titleRef} className="text-xl font-light text-center mt-10">
        WeLcOmE tO mY bLoG
      </h1>
      <p ref={firstPRef} className="text-4xl py-2"></p>
      <p className="text-2xl"></p>
    </div>
  );
};

export default HeroTitle;
