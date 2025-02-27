"use client";

import { useMutation } from "@tanstack/react-query";
import { getVideoSummaryAction } from "../actions/youtube";

const useGetVideoSummary = () => {
  return useMutation({
    mutationFn: getVideoSummaryAction,
    onError: (error) => {
      console.error(error || "Error while summarizing transcript");
    },
  });
};

export default useGetVideoSummary;
