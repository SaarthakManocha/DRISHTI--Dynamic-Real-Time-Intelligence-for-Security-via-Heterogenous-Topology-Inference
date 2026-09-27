import React, { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
}

export default function AnimatedNumber({
  value,
  duration = 900,
  decimals = 0,
  suffix = "",
  prefix = "",
}: AnimatedNumberProps) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out curve for a clean, controlled count-up.
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = value * easedProgress;
      setDisplayValue(currentValue);

      if (progress < 1) {
        animationFrame = window.requestAnimationFrame(animate);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrame = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return (
    <span className="animated-number">
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  );
}