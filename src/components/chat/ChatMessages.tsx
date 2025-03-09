import ChatMessageItem from "@/components/chat/ChatMessageItem";
import { ChatMessage } from "@/lib/types";

type Props = {
  messages: ChatMessage[];
};

export default function ChatMessages({ messages }: Props) {
  return (
    <div className="flex w-full flex-col space-y-6">
      {messages.map((msg: ChatMessage) => (
        <ChatMessageItem key={msg.id} message={msg} />
      ))}
    </div>
  );
}
