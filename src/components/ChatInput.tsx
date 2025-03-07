"use client";

import { useState, useRef, KeyboardEvent, FormEvent, useEffect } from "react";
import {
  AtSign,
  Mic,
  Notebook,
  Paperclip,
  Pen,
  Search,
  Send,
} from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

type ChatInputProps = {
  onSubmit: (message: string) => void;
  isLoading?: boolean;
  loadingText?: string;
  placeholder?: string;
};

export default function ChatInput({
  onSubmit,
  isLoading = false,
  loadingText = "Processing...",
  placeholder = "Enter a YouTube URL (e.g., https://youtube.com/watch?v=...)...",
}: ChatInputProps) {
  const [text, setText] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-focus the textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isLoading) {
      e.preventDefault(); // Prevent new line
      handleSubmit(); // Submit on Enter
    }
  };

  const handleInput = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Expand to fit content
      setText(textareaRef.current.value);
    }
  };

  const handleSubmit = (e?: FormEvent) => {
    e?.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText || isLoading) return;

    try {
      onSubmit(trimmedText);
      setText(""); // Clear state

      if (textareaRef.current) {
        textareaRef.current.value = ""; // Clear displayed text
        textareaRef.current.style.height = "auto"; // Reset height
      }
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
      console.error("Error submitting message:", error);
    }
  };

  let buttonText = "Send";
  if (isLoading && loadingText) {
    buttonText = loadingText;
  } else if (isLoading) {
    buttonText = "Sending...";
  }

  return (
    <form className="flex flex-col rounded-xl bg-gray-200">
      <textarea
        ref={textareaRef}
        className="custom-scrollbar max-h-32 min-h-0 w-full resize-none overflow-y-auto px-3 py-2 transition-all focus:outline-none"
        placeholder={placeholder}
        rows={1}
        onKeyDown={handleKeyDown}
        onChange={handleInput}
        value={text}
        disabled={isLoading}
        aria-label="Message input"
      />
      <div className="flex flex-row items-center justify-between p-1">
        <div className="flex flex-row items-center">
          <Button variant="ghost">
            <Search />
          </Button>
          <Button variant="ghost">
            <AtSign />
          </Button>
          <Button variant="ghost">
            <Notebook />
          </Button>
          <Button variant="ghost">
            <Pen />
          </Button>
          <Button variant="ghost">
            <Paperclip />
          </Button>
          <Button variant="ghost">
            <Mic />
          </Button>
        </div>
        <Button variant="primary" disabled={!text.trim() || isLoading}>
          <span className="border-r pr-3">{buttonText}</span>
          <Send />
        </Button>
      </div>
    </form>
  );
}
