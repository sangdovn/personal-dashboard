"use client";
import { useState, useEffect } from "react";

type TypingEffectProps = {
  text: string;
  speed?: number;
  onFinish?: () => void;
};

export default function TypingEffect({
  text,
  speed = 50,
  onFinish,
}: TypingEffectProps) {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayText("");
    const interval = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text[i]);
        i++;
      } else {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onFinish]);

  return <span>{displayText}</span>;
}
