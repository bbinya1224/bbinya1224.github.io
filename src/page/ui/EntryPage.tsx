"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";
import { useRouter } from "next/navigation";

gsap.registerPlugin(TextPlugin);

const EntryPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const buttonTextRef = useRef<HTMLElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  useGSAP(
    () => {
      if (!textRef.current || !buttonRef.current) return;

      textRef.current.textContent = "";
      buttonRef.current.style.width = "48px";
      buttonTextRef.current!.textContent = "";

      const tl = gsap.timeline();

      tl.to(textRef.current, {
        duration: 4,
        text: "We have Fun,<br />We have Joy, <br />We have Today!",
        ease: "none",
      });

      tl.fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(2)" },
        "+=0.3",
      )
        .to(buttonRef.current, {
          width: 160,
          duration: 0.8,
          ease: "power2.out",
        })
        .to(buttonTextRef.current, {
          text: "Click ME!",
          duration: 0.8,
          ease: "none",
        })
        .to(buttonRef.current, {
          boxShadow: "0 0 20px 6px rgba(251, 191, 36, 0.8)",
          repeat: -1,
          yoyo: true,
          duration: 1.2,
          ease: "sine.inOut",
        });
    },
    { scope: containerRef },
  );

  const handleButtonClick = () => {
    if (isClicked) return;
    setIsClicked(true);

    const tl = gsap.timeline({
      onComplete: () => {
        router.push("/main");
      },
    });

    tl.to(buttonRef.current, {
      scale: 1.2,
      duration: 0.15,
      ease: "power2.out",
    }).to(buttonRef.current, {
      scale: 1,
      duration: 0.15,
      ease: "power2.in",
    });

    tl.to(
      circleRef.current,
      {
        scale: 100,
        duration: 1.2,
        ease: "power2.inOut",
      },
      "-=0.1",
    )
      .to(
        circleRef.current,
        {
          backgroundColor: "#fef3c7",
          duration: 0.3,
        },
        "<",
      )
      .to(
        circleRef.current,
        {
          backgroundColor: "#fffbeb",
          duration: 0.3,
        },
        "+=0.01",
      )
      .to(
        circleRef.current,
        {
          backgroundColor: "#ffffff",
          duration: 0.3,
        },
        "<",
      );

    tl.to(
      textRef.current,
      {
        opacity: 0,
        y: -50,
        duration: 0.6,
        ease: "power2.in",
      },
      "-=1",
    );
  };

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#171717] p-4"
    >
      <div
        ref={circleRef}
        className="pointer-events-none fixed top-1/2 left-1/2 z-50 h-12 w-12 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-amber-400"
      />

      <article className="absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2 text-center">
        <p
          ref={textRef}
          className="Bitcount text-3xl whitespace-pre-line text-amber-300 md:text-5xl lg:text-6xl"
        />
        <div className="relative mt-10">
          <div
            ref={buttonRef}
            className="mx-auto flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-amber-300"
            onClick={handleButtonClick}
          >
            <span
              ref={buttonTextRef}
              className="Bitcount mt-1 ml-1 text-xl font-bold text-black lg:text-2xl"
            />
          </div>
        </div>
      </article>
    </section>
  );
};

export default EntryPage;
