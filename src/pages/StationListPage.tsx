import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Header, SearchSection, StationList, Button } from "../components";
import { useStations, useDebounce } from "../hooks";
import { APP_CONFIG } from "../constants";

export function StationListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const debouncedSearchQuery = useDebounce(
    searchQuery,
    APP_CONFIG.SEARCH_DEBOUNCE_MS,
  );

  const { stations, loading, error, refetch } = useStations();

  // Memoize filtered stations to avoid unnecessary re-computations
  const filteredStations = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return stations;
    }

    return stations.filter((station) =>
      station.name
        .toLowerCase()
        .includes(debouncedSearchQuery.toLowerCase().trim()),
    );
  }, [stations, debouncedSearchQuery]);

  const handleStationSelect = (stationId: string) => {
    navigate(`/station/${stationId}`);
  };

  return (
    <>
      <Header />
      <SearchSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <StationList
        stations={filteredStations}
        loading={loading}
        error={error}
        onStationSelect={handleStationSelect}
      />
      {error && (
        <Button onClick={refetch} showIcon style={{ marginTop: "16px" }}>
          Retry
        </Button>
      )}
    </>
  );
}
