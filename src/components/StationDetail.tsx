import styled from "styled-components";
import { useState } from "react";
import type { Station } from "../types";
import { useStationBookings } from "../hooks";
import { Loading } from "./Loading";
import { StationCalendar } from "./StationCalendar";
import { BookingDetails } from "./BookingDetails";
import { EmptyBookingsState } from "./EmptyBookingsState";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DetailContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    align-items: start;
  }
`;

interface StationDetailProps {
  station: Station;
}

export const StationDetail = ({ station }: StationDetailProps) => {
  const { bookings, loading, error } = useStationBookings(station.id);
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  return (
    <DetailContainer>
      {loading && <Loading message="Loading bookings..." />}

      {error && (
        <div
          style={{
            color: "#e53e3e",
            padding: "20px",
            textAlign: "center",
            background: "#fed7d7",
            borderRadius: "12px",
            border: "2px solid #feb2b2",
            gridColumn: "1 / -1",
          }}
        >
          <strong>Error loading bookings:</strong> {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <StationCalendar
            selectedDate={selectedDate}
            onDateChange={setSelectedDate}
            bookings={bookings}
            loading={loading}
            error={error}
          />

          {selectedDate instanceof Date && (
            <BookingDetails selectedDate={selectedDate} bookings={bookings} />
          )}

          {bookings.length === 0 && !selectedDate && (
            <EmptyBookingsState
              title="No Bookings Available"
              message="This station currently has no bookings to display."
            />
          )}
        </>
      )}
    </DetailContainer>
  );
};
