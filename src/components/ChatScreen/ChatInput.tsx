import { ArrowBigUp } from "lucide-react";
import { KeyboardEvent, useState } from "react";
import { ChatMessage } from ".";

type Props = {
  onSend: (message: ChatMessage) => void;
};

export default function ChatInput({ onSend }: Props) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    onSend({ id: Date.now(), sender: "user", text: input });
    setInput("");
  };

  return (
    <div className="flex items-center gap-3 rounded-4xl border border-gray-200 bg-gray-50 px-3 py-2 shadow-2xl">
      <textarea
        value={input}
        className="grow resize-none focus:outline-none"
        placeholder="Type a message..."
        rows={1}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="flex items-center justify-center">
        <button
          className="flex items-center justify-center rounded-full bg-blue-500 p-2 text-white disabled:bg-gray-300"
          onClick={handleSend}
          disabled={!input.trim()}
        >
          <ArrowBigUp size={24} />
        </button>
      </div>
    </div>
  );
}
