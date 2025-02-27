"use client";

import { useRef } from "react";
import useGetVideoSummary from "../lib/hooks/useGetVideoSummary";

function extractYouTubeID(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:.*v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  return match ? match[1] : null;
}

export default function YoutubeSummary() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    mutate: getSummary,
    data: summary,
    isPending: isSummarizing,
  } = useGetVideoSummary();

  const handleSend = () => {
    const url = inputRef.current?.value;
    if (!url) return;

    const videoId = extractYouTubeID(url);
    if (!videoId) return;

    getSummary({
      videoId,
      systemContent:
        "You are a YouTube video summarizer. Given a transcript, summarize it in 5-10 bullet points. Each bullet should be 10-20 words, capturing key insights, main ideas, and important details clearly and concisely.",
    });
  };

  return (
    <>
      <div className="flex items-center space-x-2">
        <input
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          ref={inputRef}
          type="url"
          placeholder="Enter YouTube video URL"
        />
        <button
          className="px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          onClick={handleSend}
        >
          Send
        </button>
      </div>
      {isSummarizing && <p>Summarizing...</p>}
      <p className="mt-8">{summary?.choices[0].message.content}</p>
    </>
  );
}
