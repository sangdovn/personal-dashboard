import { ChatMessage } from ".";
import clsx from "clsx";

type Props = {
  key: number;
  message: ChatMessage;
};

export default function ChatMessageItem({ message }: Props) {
  return (
    <div
      key={message.id}
      className={clsx(
        "flex w-full items-center",
        message.sender === "user" && "justify-end",
        message.sender === "bot" && "justify-start",
      )}
    >
      <span
        className={clsx(
          "max-w-3/4 rounded-4xl px-3 py-2 text-black",
          message.sender === "user" && "bg-gray-100",
        )}
      >
        {message.text}
      </span>
    </div>
  );
}
