import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/src/resources/index.js";

/**
 * Error class for OpenAI service errors
 */
export class OpenAIServiceError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "OpenAIServiceError";
  }
}

/**
 * Parameters for OpenAI chat completion
 */
export interface OpenAICompletionParams {
  messages: ChatCompletionMessageParam[];
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}

// Initialize OpenAI client once
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  timeout: 30000, // 30 seconds default timeout
});

/**
 * Get a streaming response from OpenAI's chat completion API
 * @param params - Parameters for the chat completion
 * @returns A stream of chat completion chunks
 */
export async function getChatCompletion({
  messages,
  model = "gpt-3.5-turbo",
  temperature = 0.7,
  maxTokens,
  timeout = 60000, // 1 minute timeout by default
}: OpenAICompletionParams): Promise<AsyncIterable<OpenAI.ChatCompletionChunk>> {
  // Validate inputs
  if (!messages || messages.length === 0) {
    throw new OpenAIServiceError(
      "Messages array is required and cannot be empty.",
    );
  }

  // Validate OpenAI API key
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new OpenAIServiceError(
      "Missing OpenAI API key. Please check your environment variables.",
    );
  }

  try {
    // Create AbortController for timeout management
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    // Get response stream from OpenAI
    const stream = await openai.chat.completions.create(
      {
        model,
        messages,
        temperature,
        max_tokens: maxTokens,
        stream: true,
      },
      {
        signal: controller.signal,
        timeout: timeout,
      },
    );

    // Clear timeout when we get a response
    clearTimeout(timeoutId);

    return stream;
  } catch (error) {
    // Handle specific error types
    if (error instanceof OpenAI.APIError) {
      console.error("OpenAI API Error:", {
        status: error.status,
        message: error.message,
        type: error.type,
      });

      if (error.status === 429) {
        throw new OpenAIServiceError(
          "Rate limit exceeded. Please try again later.",
        );
      } else if (error.status === 401) {
        throw new OpenAIServiceError(
          "Authentication error. Please check your API key.",
        );
      } else if (error.status === 500) {
        throw new OpenAIServiceError(
          "OpenAI server error. Please try again later.",
        );
      }
    } else if (error instanceof Error && error.name === "AbortError") {
      throw new OpenAIServiceError("Request timed out. Please try again.");
    }

    // Re-throw the original error or a generic one
    throw error instanceof Error
      ? new OpenAIServiceError(error.message)
      : new OpenAIServiceError("Failed to get response from OpenAI.");
  }
}
