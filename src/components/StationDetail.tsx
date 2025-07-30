import styled from "styled-components";
import { useState } from "react";
import type { Station } from "../types";
import { useGlobalBookings } from "../contexts";
import { Loading } from "./Loading";
import { StationCalendar } from "./StationCalendar";
import { BookingDetails } from "./BookingDetails";
import { EmptyBookingsState } from "./EmptyBookingsState";
import { ErrorMessage } from "./UI";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const DetailContainer = styled.div`
  width: 100%;
  max-width: 1400px;
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

const ErrorContainer = styled(ErrorMessage)`
  grid-column: 1 / -1;
`;

interface StationDetailProps {
  station: Station;
}

export const StationDetail = ({ station }: StationDetailProps) => {
  const { getBookingsForStation, loading, error } = useGlobalBookings();
  const [selectedDate, setSelectedDate] = useState<Value>(new Date());

  const bookings = getBookingsForStation(station.id);

  return (
    <DetailContainer>
      {loading && <Loading message="Loading bookings..." />}

      {error && <ErrorContainer message={`Loading bookings: ${error}`} />}

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
