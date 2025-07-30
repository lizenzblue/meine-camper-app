import { useState, useCallback } from "react";

interface AsyncState<T> {
  data: T;
  loading: boolean;
  error: string | null;
}

interface UseAsyncDataReturn<T> extends AsyncState<T> {
  setData: (data: T) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  executeAsync: (asyncFn: () => Promise<T>) => Promise<void>;
  reset: () => void;
}

export const useAsyncData = <T>(
  initialData: T,
  initialLoading: boolean = true,
): UseAsyncDataReturn<T> => {
  const [data, setData] = useState<T>(initialData);
  const [loading, setLoading] = useState(initialLoading);
  const [error, setError] = useState<string | null>(null);

  const executeAsync = useCallback(async (asyncFn: () => Promise<T>) => {
    try {
      setLoading(true);
      setError(null);
      const result = await asyncFn();
      setData(result);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    setLoading(initialLoading);
    setError(null);
  }, [initialData, initialLoading]);

  return {
    data,
    loading,
    error,
    setData,
    setLoading,
    setError,
    executeAsync,
    reset,
  };
};
