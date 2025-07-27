import { useState, useEffect } from "react";
import type { StationListItem } from "../types";
import { stationsService } from "../services/stationsService";

interface UseStationsReturn {
  stations: StationListItem[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStations = (): UseStationsReturn => {
  const [stations, setStations] = useState<StationListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async () => {
    try {
      setLoading(true);
      setError(null);
      const stationsList = await stationsService.getStationsList();
      setStations(stationsList);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unknown error occurred",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    loading,
    error,
    refetch: fetchStations,
  };
};
