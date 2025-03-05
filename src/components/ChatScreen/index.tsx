"use client";

import { useState } from "react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";

export interface ChatMessage {
  id: number;
  text: string;
  sender: string;
}

const initialState = [
  { id: 1, text: "Hello! I hope you're having a great day.", sender: "user" },
  {
    id: 2,
    text: "Hi! Thank you. How can I assist you today?",
    sender: "bot",
  },
  {
    id: 3,
    text: "I'm wondering what the weather is like in New York City right now.",
    sender: "user",
  },
  {
    id: 4,
    text: "Currently, in New York City, it's sunny with a temperature of 75°F. Would you like more details?",
    sender: "bot",
  },
  {
    id: 5,
    text: "That sounds nice! Also, can you tell me a funny joke?",
    sender: "user",
  },
  {
    id: 6,
    text: "Of course! Why did the chicken cross the road? To prove to the possum that it could be done!",
    sender: "bot",
  },
  {
    id: 7,
    text: "Haha, that's a good one! Do you have another joke?",
    sender: "user",
  },
  {
    id: 8,
    text: "Sure! Why don’t skeletons fight each other? Because they don’t have the guts!",
    sender: "bot",
  },
  {
    id: 9,
    text: "Haha, I love it! Now, can you help me with some math?",
    sender: "user",
  },
  {
    id: 10,
    text: "Of course! What kind of math problem do you need help with?",
    sender: "bot",
  },
  {
    id: 11,
    text: "I need to solve 245 times 6. Can you calculate that for me?",
    sender: "user",
  },
  {
    id: 12,
    text: "Sure! 245 multiplied by 6 equals 1,470. Let me know if you need more calculations!",
    sender: "bot",
  },
  {
    id: 13,
    text: "Wow, that was fast! You're really smart!",
    sender: "user",
  },
  {
    id: 14,
    text: "Thank you! I'm here to help with anything you need.",
    sender: "bot",
  },
  {
    id: 15,
    text: "Can you tell me who won the last FIFA World Cup?",
    sender: "user",
  },
  {
    id: 16,
    text: "Yes! The last FIFA World Cup was won by Argentina. They defeated France in a thrilling final!",
    sender: "bot",
  },
  {
    id: 17,
    text: "That must have been an exciting match! Do you know the score?",
    sender: "user",
  },
  {
    id: 18,
    text: "Yes! The match ended in a 3-3 draw, and Argentina won on penalties 4-2.",
    sender: "bot",
  },
  {
    id: 19,
    text: "That sounds amazing! Thank you for the info.",
    sender: "user",
  },
  {
    id: 20,
    text: "You're very welcome! Let me know if I can assist you with anything else.",
    sender: "bot",
  },
];

export default function ChatScreen() {
  const [messages, setMessages] = useState(initialState);

  return (
    <div className="flex h-full w-full flex-col border-2">
      {/* Top Part */}
      <div className="relative">
        <div className="min-h-16"></div>
      </div>

      {/* Middle Part */}
      <div className="custom-scrollbar relative min-h-0 w-full grow overflow-x-hidden overflow-y-auto">
        <div className="mx-auto max-w-3xl px-2 pt-8 pb-16">
          <ChatMessages messages={messages} />
        </div>
      </div>

      {/* Bottom Part */}
      <div className="relative w-full">
        <div className="mx-auto max-w-3xl">
          <ChatInput onSend={() => {}} />
        </div>
      </div>
    </div>
  );
}
