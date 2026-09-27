import React, { useEffect, useRef } from "react";
import Lightfall from "./Lightfall";
import "./Landing.css";

type LandingProps = {
  onLaunch: () => void;
};

function Landing({ onLaunch }: LandingProps) {
  const mouseGlowRef = useRef<HTMLDivElement>(null);
  const mousePosition = useRef({ x: 50, y: 50 });
  const targetPosition = useRef({ x: 50, y: 50 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      targetPosition.current.x = (event.clientX / window.innerWidth) * 100;
      targetPosition.current.y = (event.clientY / window.innerHeight) * 100;
    };

    const animate = () => {
      const current = mousePosition.current;
      const target = targetPosition.current;
      current.x += (target.x - current.x) * 0.045;
      current.y += (target.y - current.y) * 0.045;

      if (mouseGlowRef.current) {
        mouseGlowRef.current.style.setProperty("--mouse-x", `${current.x}%`);
        mouseGlowRef.current.style.setProperty("--mouse-y", `${current.y}%`);
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  return (
    <main className="app">
      <div className="lightfall-background">
        <Lightfall
          dpr={1}
          colors={["#00F6FF", "#8A2BE2", "#FFFFFF"]}
          backgroundColor="#010308"
          speed={0.28}
          streakCount={2}
          streakWidth={1}
          streakLength={1}
          glow={1.3}
          density={0.56}
          twinkle={0.25}
          zoom={3}
          backgroundGlow={0.22}
          opacity={0.82}
          mouseInteraction={true}
          mouseStrength={0.35}
          mouseRadius={0.75}
          mouseDampening={0.12}
        />
      </div>

      <div ref={mouseGlowRef} className="mouse-glow" />
      <div className="background-overlay" />

      <section className="hero">
        <div className="eyebrow">DYNAMIC SECURITY INTELLIGENCE SYSTEM</div>
        <h1>DRISHTI</h1>
        <p>
          Dynamic Real-Time Intelligence for Security via Heterogeneous Topology
          Inference
        </p>

        <button className="launch-button" type="button" onClick={onLaunch}>
          <span>LAUNCH THE SYSTEM</span>
          <span className="arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </section>
    </main>
  );
}

export default Landing;
