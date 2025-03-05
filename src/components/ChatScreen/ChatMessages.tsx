import { ChatMessage } from ".";
import ChatMessageItem from "./MessageItem";

type Props = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {messages.map((msg: ChatMessage) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
