import { memo, useCallback } from "react";
import styled from "styled-components";
import type { StationListItem } from "../types";
import { Loading } from "./Loading";
import { HiLocationMarker } from "react-icons/hi";

const RecommendedTitle = styled.h3`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 16px;
  text-align: left;
`;

const StationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;

  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 24px;
  }
`;

const StyledStationCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  padding: 24px 16px;
  border: 1px solid #e2e8f0;
  border-radius: 16px;
  background-color: #fff;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s,
    border-color 0.2s;
  text-align: center;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    border-color: #4a90e2;
  }

  &:focus {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }
`;

const StationIcon = styled.div`
  color: #4a90e2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StationInfo = styled.div`
  h4 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    color: #2d3748;
  }
`;

interface StationListProps {
  stations: StationListItem[];
  loading?: boolean;
  error?: string | null;
  onStationSelect?: (stationId: string) => void;
}

// Station Card Component
const StationCard = memo<{
  station: StationListItem;
  onSelect: (id: string) => void;
}>(({ station, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(station.id);
  }, [onSelect, station.id]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onSelect(station.id);
      }
    },
    [onSelect, station.id],
  );

  return (
    <StyledStationCard
      role="button"
      tabIndex={0}
      aria-label={`Select ${station.name} station`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      <StationIcon>
        <HiLocationMarker size={24} />
      </StationIcon>
      <StationInfo>
        <h4>{station.name}</h4>
      </StationInfo>
    </StyledStationCard>
  );
});

StationCard.displayName = "StationCard";

export const StationList = memo<StationListProps>(
  ({ stations, loading, error, onStationSelect }) => {
    const handleStationSelect = useCallback(
      (stationId: string) => {
        onStationSelect?.(stationId);
      },
      [onStationSelect],
    );

    if (loading) {
      return (
        <>
          <RecommendedTitle>Recommended Stations</RecommendedTitle>
          <Loading message="Loading stations..." />
        </>
      );
    }

    if (error) {
      return (
        <>
          <RecommendedTitle>Recommended Stations</RecommendedTitle>
          <div style={{ color: "#e53e3e", padding: "16px" }}>
            Error: {error}
          </div>
        </>
      );
    }

    return (
      <>
        <RecommendedTitle>Recommended Stations</RecommendedTitle>
        <StationListContainer>
          {stations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              onSelect={handleStationSelect}
            />
          ))}
        </StationListContainer>
      </>
    );
  },
);

StationList.displayName = "StationList";
