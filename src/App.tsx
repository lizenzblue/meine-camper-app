import { useState, useMemo, useEffect } from "react";
import {
  GlobalStyle,
  Header,
  SearchSection,
  StationList,
  ContentWrapper,
  ErrorBoundary,
  Button,
} from "./components";
import { useStations, useDebounce } from "./hooks";
import { APP_CONFIG } from "./constants";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(
    searchQuery,
    APP_CONFIG.SEARCH_DEBOUNCE_MS,
  );
  const { stations, loading, error, refetch } = useStations();

  // Set document title from environment variable
  useEffect(() => {
    document.title = APP_CONFIG.TITLE;
  }, []);

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

  return (
    <ErrorBoundary>
      <GlobalStyle />
      <ContentWrapper>
        <Header />
        <SearchSection
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <StationList
          stations={filteredStations}
          loading={loading}
          error={error}
        />
        {error && (
          <Button onClick={refetch} showIcon style={{ marginTop: "16px" }}>
            Retry
          </Button>
        )}
      </ContentWrapper>
    </ErrorBoundary>
  );
}
