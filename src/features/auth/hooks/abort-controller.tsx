import { useEffect, useMemo } from "react";

export const useAbortController = () => {
  const controller = useMemo(() => {
    return new AbortController();
  }, []);
  const config = {
    signal: controller.signal,
  };
  useEffect(() => {
    return () => {
      controller.abort();
    };
  }, [controller]);
  return config;
};
