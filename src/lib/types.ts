import { ReactNode } from "react";

/**
 * Props for components that accept children and optional className
 */
export type ChildProps = {
  children?: ReactNode;
  className?: string;
};

/**
 * Role types for chat messages
 */
export type MessageRole = "user" | "assistant" | "system";

/**
 * Structure for chat messages
 */
export type ChatMessage = {
  /** Unique identifier for the message */
  id: number;
  /** Role of the message sender */
  role: MessageRole;
  /** Content of the message */
  content: string;
  /** Optional timestamp for the message */
  timestamp?: Date;
};

/**
 * YouTube video information
 */
export type VideoInfo = {
  /** Video ID */
  id: string;
  /** Video title */
  title: string;
  /** Video URL */
  url: string;
  /** Video thumbnail URL */
  thumbnail?: string;
};
