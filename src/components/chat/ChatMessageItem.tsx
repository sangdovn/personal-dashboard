import { ChatMessage } from "@/lib/types";
import clsx from "clsx";
import Markdown from "react-markdown";
import { memo } from "react";

type ChatMessageItemProps = {
  message: ChatMessage;
};

function ChatMessageItem({ message }: ChatMessageItemProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={clsx(
        "mb-4 flex w-full items-start",
        isUser ? "justify-end" : "justify-start",
      )}
      aria-label={`${isUser ? "Your" : "Assistant"} message`}
    >
      <div
        className={clsx(
          "rounded-lg px-4 py-3 break-words whitespace-pre-wrap",
          isUser
            ? "max-w-[75%] bg-gray-100 text-gray-900"
            : "w-full max-w-full text-gray-900",
        )}
      >
        <div className="w-full">
          <Markdown>{message.content}</Markdown>
        </div>
      </div>
    </div>
  );
}

export default memo(ChatMessageItem);
