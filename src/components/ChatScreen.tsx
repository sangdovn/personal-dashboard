"use client";
import { useState, useRef, useEffect } from "react";
import TypingEffect from "@/components/TypingEffect";

type Message = {
  role: "user" | "ai";
  content: string;
};

type ChatProps = {
  input: string;
  message: string;
};

export default function ChatScreen({ input, message }: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  //   const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    // Simulated AI response (replace with real API call)
    setTimeout(() => {
      const aiMessage: Message = {
        role: "ai",
        content: "This is a simulated AI response. Replace with your API.",
      };
      setMessages((prev) => [...prev, aiMessage]);
    }, 1000);
  }

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <h1 className="text-xl font-bold text-center mb-4">ChatGPT Clone</h1>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-800 rounded-lg">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`p-3 rounded-lg max-w-xs ${
                msg.role === "user"
                  ? "bg-blue-500 text-white self-end"
                  : "bg-gray-700 text-white self-start"
              }`}
            >
              {msg.role === "ai" ? (
                <TypingEffect text={msg.content} />
              ) : (
                msg.content
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Field */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white outline-none"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-blue-500 p-2 px-4 rounded-r-lg"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
