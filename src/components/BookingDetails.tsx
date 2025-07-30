import styled from "styled-components";
import { useState } from "react";
import type { Booking } from "../types";
import { BookingModal } from "./BookingModal";
import { Card, InteractiveCard, BookingTypeBadge, DateDisplay } from "./UI";
import { theme } from "../styles/theme";
import { getBookingType } from "../utils/bookingUtils";
import { getBookingsForDate } from "../utils/dateUtils";

const BookingDetailsSection = Card;

const SelectedDate = styled.div`
  margin-bottom: ${theme.spacing.xl};
  text-align: center;
  padding: ${theme.spacing.lg};
  background: ${theme.colors.accent};
  border-radius: ${theme.borderRadius.md};
  color: white;

  h4 {
    margin: 0 0 ${theme.spacing.xs} 0;
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
  }

  p {
    margin: 0;
    font-size: ${theme.typography.fontSizes.sm};
    opacity: 0.9;
  }
`;

const BookingCard = styled(InteractiveCard)`
  margin-bottom: ${theme.spacing.md};

  &:last-child {
    margin-bottom: 0;
  }
`;

const BookingHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${theme.spacing.sm};

  h4 {
    margin: 0;
    color: ${theme.colors.text.primary};
    font-size: ${theme.typography.fontSizes.base};
    font-weight: ${theme.typography.fontWeights.semibold};
  }
`;

const TimeInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  margin-top: ${theme.spacing.xs};
  font-size: ${theme.typography.fontSizes.sm};
  color: ${theme.colors.text.light};
`;

const TimeRange = styled.span`
  font-weight: ${theme.typography.fontWeights.medium};
  color: ${theme.colors.text.muted};
`;

const EmptyState = styled.div`
  text-align: center;
  padding: ${theme.spacing["4xl"]} ${theme.spacing.xl};
  color: ${theme.colors.text.light};

  h3 {
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${theme.colors.text.muted};
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
  }

  p {
    margin: 0;
    font-size: ${theme.typography.fontSizes.sm};
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
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const selectedDateBookings = getBookingsForDate(bookings, selectedDate);

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
  };

  const closeModal = () => {
    setSelectedBooking(null);
  };

  return (
    <>
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
          <div>
            {selectedDateBookings.map((booking) => {
              const bookingType = getBookingType(booking, selectedDate);
              const startDate = new Date(booking.startDate);
              const endDate = new Date(booking.endDate);

              return (
                <BookingCard
                  key={booking.id}
                  onClick={() => handleBookingClick(booking)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleBookingClick(booking);
                    }
                  }}
                  aria-label={`View details for ${booking.customerName}'s booking`}
                >
                  <BookingHeader>
                    <h4>{booking.customerName}</h4>
                    <BookingTypeBadge type={bookingType} />
                  </BookingHeader>
                  <TimeInfo>
                    <TimeRange>
                      <DateDisplay date={startDate} format="time" />
                      {" - "}
                      <DateDisplay date={endDate} format="time" />
                    </TimeRange>
                  </TimeInfo>
                </BookingCard>
              );
            })}
          </div>
        ) : (
          <EmptyState>
            <h3>No Bookings</h3>
            <p>No bookings for this date.</p>
          </EmptyState>
        )}
      </BookingDetailsSection>

      {selectedBooking && (
        <BookingModal
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={closeModal}
          viewDate={selectedDate}
        />
      )}
    </>
  );
};
