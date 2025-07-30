import { memo, useCallback } from "react";
import styled from "styled-components";
import type { StationListItem } from "../types";
import { useGlobalBookings } from "../contexts";
import { Loading } from "./Loading";
import { HiLocationMarker } from "react-icons/hi";
import { ErrorMessage, ClickableCard } from "./UI";
import { theme } from "../styles/theme";

const RecommendedTitle = styled.h3`
  width: 100%;
  font-size: ${theme.typography.fontSizes.base};
  font-weight: ${theme.typography.fontWeights.semibold};
  color: ${theme.colors.text.muted};
  margin-bottom: ${theme.spacing.lg};
  text-align: left;
`;

const StationListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.lg};
  width: 100%;

  @media (min-width: ${theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: ${theme.spacing["2xl"]};
  }
`;

const StyledStationCard = styled(ClickableCard)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${theme.spacing.md};
  text-align: center;
`;

const StationIcon = styled.div`
  color: ${theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StationInfo = styled.div`
  h4 {
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
    margin: 0;
    color: ${theme.colors.text.secondary};
  }
`;

const BookingIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSizes.xs};
  color: ${theme.colors.success};
  font-weight: ${theme.typography.fontWeights.medium};

  &::before {
    content: "";
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${theme.colors.success};
  }
`;

interface StationListProps {
  stations: StationListItem[];
  loading?: boolean;
  error?: string | null;
  onStationSelect?: (stationId: string) => void;
}

const StationCard = memo<{
  station: StationListItem;
  onSelect: (id: string) => void;
}>(({ station, onSelect }) => {
  const { getBookingsForStation } = useGlobalBookings();
  const stationBookings = getBookingsForStation(station.id);
  const hasBookings = stationBookings.length > 0;

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
        {hasBookings && (
          <BookingIndicator>
            {stationBookings.length} booking
            {stationBookings.length !== 1 ? "s" : ""}
          </BookingIndicator>
        )}
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
          <ErrorMessage message={`Error: ${error}`} />
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
