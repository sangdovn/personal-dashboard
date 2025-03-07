import { useState, useEffect } from "react";

type TypingEffectProps = {
  text: string;
  speed?: number;
};

export default function TypingEffect({ text, speed = 50 }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState<string>("");

  useEffect(() => {
    if (!text) return; // Avoid running on empty text

    setDisplayedText(""); // Reset displayed text before typing
    let i = 0;

    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1)); // Correct substring
      i++;

      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <span>{displayedText}</span>;
}
