"use client";

import { ChatInput, ChatMessages } from "@/components";
import { ChatMessage } from "@/lib/types";
import { useState, useEffect, useRef } from "react";
import { getVideoSummaryAction } from "@/lib/server/actions/youtube";
import { isValidYouTubeUrl } from "@/lib/utils/youtube";
import { toast } from "sonner";
import { YoutubeIcon } from "lucide-react";

// Constants
const initialState: ChatMessage[] = [
  {
    id: Date.now(),
    role: "assistant",
    content:
      "Hi! Paste a YouTube URL and I'll summarize the video content for you.",
  },
];

export default function YouTubeSummarizerPage() {
  const [messages, setMessages] = useState<ChatMessage[]>(initialState);
  const [isSummarizing, setSummarizing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Validate YouTube URL using the service function
  const handleSummarize = async (url: string) => {
    // Validate URL
    if (!isValidYouTubeUrl(url)) {
      // Add error message from assistant for invalid URL
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          role: "user",
          content: url,
        },
        {
          id: Date.now(),
          role: "assistant",
          content: `⚠️ That doesn't look like a valid YouTube URL. Please enter a URL in one of these formats:
- https://www.youtube.com/watch?v=VIDEO_ID
- https://youtu.be/VIDEO_ID
- https://youtube.com/shorts/VIDEO_ID`,
        },
      ]);

      toast.error("Please enter a valid YouTube URL");
      return;
    }

    // Prevent multiple submissions
    if (isSummarizing) {
      toast.info("Already processing a video. Please wait...");
      return;
    }

    // Init state
    setSummarizing(true);

    // Add user message
    const userMessageId = Date.now();
    setMessages((prev) => [
      ...prev,
      {
        id: userMessageId,
        role: "user",
        content: url,
      },
    ]);

    // Add temporary assistant message
    const tempAssistantId = 0;
    setMessages((prev) => [
      ...prev,
      {
        id: tempAssistantId,
        role: "assistant",
        content: "Fetching video transcript...",
      },
    ]);

    try {
      // Get response from server action
      const response = await getVideoSummaryAction({ videoUrl: url });

      // Check if there's an error
      if ("error" in response) {
        // Handle error from server
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempAssistantId
              ? {
                  ...msg,
                  id: Date.now(),
                  content: `Error: ${response.error}`,
                }
              : msg,
          ),
        );

        toast.error(response.error);
        setSummarizing(false);
        return;
      }

      // If we get here, we have a stream
      const stream = response.stream;

      // Update temporary message to show we're now summarizing
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempAssistantId
            ? { ...msg, content: "Generating summary..." }
            : msg,
        ),
      );

      // Process stream chunks
      let fullContent = "";
      try {
        for await (const chunk of stream) {
          const content = chunk.choices[0]?.delta?.content || "";
          fullContent += content;

          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === tempAssistantId
                ? { ...msg, content: fullContent }
                : msg,
            ),
          );
        }
      } catch (streamError) {
        console.error("Error processing stream:", streamError);
        if (fullContent) {
          // If we have partial content, keep it and add an error note
          fullContent += "\n\n⚠️ The summary was cut off due to an error.";
        } else {
          fullContent = "Error: Failed to generate summary. Please try again.";
        }

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === tempAssistantId ? { ...msg, content: fullContent } : msg,
          ),
        );

        toast.error("Error while generating summary");
      }

      // Update temporary message with final ID
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempAssistantId ? { ...msg, id: Date.now() } : msg,
        ),
      );

      if (fullContent && !fullContent.includes("Error:")) {
        toast.success("Summary generated successfully!");
      }
    } catch (error) {
      // This catch will only be triggered for unexpected errors
      console.error("Unexpected error:", error);

      // Show a generic error message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempAssistantId
            ? {
                ...msg,
                id: Date.now(),
                content: "Error: Something went wrong. Please try again later.",
              }
            : msg,
        ),
      );

      toast.error("An unexpected error occurred");
    } finally {
      setSummarizing(false);
    }
  };

  return (
    <div className="relative flex h-full grow flex-col">
      {/* Header - Added pl-10 to prevent overlap with CustomTrigger */}
      <div className="sticky top-0 z-10 flex items-center justify-center bg-white/90 p-2 backdrop-blur-md">
        <div className="flex max-w-3xl items-center gap-2">
          <YoutubeIcon className="size-9 text-red-600" />
          <h1 className="text-xl font-semibold">YouTube Video Summarizer</h1>
        </div>
      </div>

      {/* Messages area */}
      <div className="custom-scrollbar relative min-h-0 w-full grow overflow-x-hidden overflow-y-auto">
        <div className="mx-auto w-full max-w-3xl px-4 py-6">
          <ChatMessages messages={messages} />
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input area */}
      <div className="sticky bottom-0 border-gray-200 bg-white/90 p-4 backdrop-blur-md">
        <div className="mx-auto max-w-3xl">
          <ChatInput
            onSubmit={handleSummarize}
            isLoading={isSummarizing}
            loadingText="Summarizing..."
            placeholder="Paste a YouTube URL..."
          />
        </div>
      </div>
    </div>
  );
}
