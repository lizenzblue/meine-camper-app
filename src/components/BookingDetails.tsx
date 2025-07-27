import styled from "styled-components";
import { MdDateRange, MdSchedule } from "react-icons/md";
import type { Booking } from "../types";

const BookingDetailsSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;

  @media (min-width: 768px) {
    padding: 32px;
  }
`;

const SelectedDate = styled.div`
  margin-bottom: 20px;
  text-align: center;
  padding: 16px;
  background: #667eea;
  border-radius: 12px;
  color: white;

  h4 {
    margin: 0 0 4px 0;
    font-size: 18px;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 20px;
    }
  }

  p {
    margin: 0;
    font-size: 14px;
    opacity: 0.9;

    @media (min-width: 768px) {
      font-size: 15px;
    }
  }
`;

const BookingCard = styled.div`
  background: #f8fafc;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  border: 1px solid #e2e8f0;

  &:last-child {
    margin-bottom: 0;
  }

  @media (min-width: 768px) {
    padding: 20px;
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
  flex-wrap: wrap;
  gap: 8px;

  h4 {
    margin: 0;
    color: #1a202c;
    font-size: 16px;
    font-weight: 600;

    @media (min-width: 768px) {
      font-size: 18px;
    }
  }
`;

const ReturnBadge = styled.span<{ isReturn: boolean }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  flex-shrink: 0;

  ${({ isReturn }) =>
    isReturn
      ? `
    background-color: #e3f2fd;
    color: #1976d2;
  `
      : `
    background-color: #e8f5e8;
    color: #2e7d32;
  `}

  @media (min-width: 768px) {
    font-size: 13px;
    padding: 6px 10px;
  }
`;

const BookingInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-bottom: 16px;

  @media (min-width: 480px) {
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
  padding: 8px 12px;
  background: white;
  border-radius: 8px;
  border: 1px solid #e2e8f0;

  svg {
    width: 16px;
    height: 16px;
    color: #718096;
  }

  @media (min-width: 768px) {
    font-size: 15px;
    padding: 10px 16px;
  }
`;

const BookingId = styled.div`
  padding: 12px 16px;
  background: white;
  border-radius: 8px;
  font-size: 12px;
  color: #4a5568;
  font-family: monospace;
  font-weight: 600;
  border: 1px solid #e2e8f0;
  text-align: center;

  @media (min-width: 768px) {
    font-size: 13px;
    padding: 14px 18px;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #718096;

  h3 {
    margin: 0 0 8px 0;
    color: #4a5568;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    padding: 50px 30px;

    h3 {
      font-size: 20px;
    }

    p {
      font-size: 16px;
    }
  }
`;

interface BookingDetailsProps {
  selectedDate: Date;
  bookings: Booking[];
}

export const BookingDetails = ({
  selectedDate,
  bookings,
}: BookingDetailsProps) => {
  // Get bookings for selected date
  const getBookingsForDate = (date: Date): Booking[] => {
    return bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  const selectedDateBookings = getBookingsForDate(selectedDate);

  return (
    <BookingDetailsSection>
      <SelectedDate>
        <h4>
          {selectedDate.toLocaleDateString("en-US", { weekday: "short" })}{" "}
          {selectedDate.getDate()}
        </h4>
        <p>
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
          })}
        </p>
      </SelectedDate>

      {selectedDateBookings.length > 0 ? (
        selectedDateBookings.map((booking) => (
          <BookingCard key={booking.id}>
            <BookingHeader>
              <h4>{booking.customerName}</h4>
              <ReturnBadge isReturn={true}>Return</ReturnBadge>
            </BookingHeader>
            <BookingInfo>
              <InfoItem>
                <MdDateRange />
                Start: {new Date(booking.startDate).toLocaleDateString()}
              </InfoItem>
              <InfoItem>
                <MdSchedule />
                End: {new Date(booking.endDate).toLocaleDateString()}
              </InfoItem>
            </BookingInfo>
            <BookingId>ID: {booking.id}</BookingId>
          </BookingCard>
        ))
      ) : (
        <EmptyState>
          <h3>No Bookings</h3>
          <p>No bookings for this date.</p>
        </EmptyState>
      )}
    </BookingDetailsSection>
  );
};
