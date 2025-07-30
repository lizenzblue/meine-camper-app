import { useEffect, useCallback } from "react";
import type { StationListItem } from "../types";
import { stationsService } from "../services/stationsService";
import { useAsyncData } from "./useAsyncData";

interface UseStationsReturn {
  stations: StationListItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStations = (): UseStationsReturn => {
  const {
    data: stations,
    loading,
    error,
    executeAsync,
  } = useAsyncData<StationListItem[]>([]);

  const fetchStations = useCallback(
    () => executeAsync(() => stationsService.getStationsList()),
    [executeAsync],
  );

  useEffect(() => {
    fetchStations();
  }, [fetchStations]);

  return {
    stations,
    loading,
    error,
    refetch: fetchStations,
  };
};
