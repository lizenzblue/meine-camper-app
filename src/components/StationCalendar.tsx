import styled from "styled-components";
import Calendar from "react-calendar";
import type { Booking } from "../types";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100% !important;
  max-width: 100% !important;
  background: white !important;
  border: 1px solid #e2e8f0 !important;
  border-radius: 16px !important;
  font-family: inherit !important;
  line-height: 1.125em !important;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08) !important;
  overflow: hidden !important;

  /* Navigation */
  .react-calendar__navigation {
    display: flex !important;
    height: 60px !important;
    margin-bottom: 0 !important;
    background: #f8fafc !important;
    border-bottom: 1px solid #e2e8f0 !important;
    padding: 0 16px !important;
  }

  .react-calendar__navigation button {
    min-width: 44px !important;
    background: none !important;
    font-size: 16px !important;
    font-weight: 600 !important;
    color: #4a5568 !important;
    border-radius: 8px !important;
    transition: all 0.2s ease !important;
    margin: 0 !important;
    border: 0 !important;
    outline: none !important;
  }

  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: #e2e8f0 !important;
    color: #2d3748 !important;
  }

  .react-calendar__navigation__label {
    font-weight: 600 !important;
    font-size: 18px !important;
    color: #1a202c !important;
  }

  /* Weekdays */
  .react-calendar__month-view__weekdays {
    text-align: center !important;
    text-transform: uppercase !important;
    font-weight: 600 !important;
    font-size: 12px !important;
    color: #718096 !important;
    background: #f8fafc !important;
    padding: 8px 0 !important;
    border-bottom: 1px solid #e2e8f0 !important;
    display: flex !important;
  }

  .react-calendar__month-view__weekdays__weekday {
    flex: 1 !important;
    padding: 8px 4px !important;
    text-align: center !important;
  }

  /* Month view */
  .react-calendar__month-view__days {
    display: grid !important;
    grid-template-columns: repeat(7, 1fr) !important;
    gap: 0 !important;
  }

  /* Tiles (day buttons) */
  .react-calendar__tile {
    max-width: 100% !important;
    padding: 12px 6px !important;
    background: none !important;
    text-align: center !important;
    line-height: 16px !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    color: #2d3748 !important;
    border-radius: 8px !important;
    margin: 2px !important;
    transition: all 0.2s ease !important;
    position: relative !important;
    border: 0 !important;
    outline: none !important;
  }

  .react-calendar__tile:enabled:hover,
  .react-calendar__tile:enabled:focus {
    background-color: #e3f2fd !important;
    color: #1976d2 !important;
    transform: scale(1.05) !important;
  }

  .react-calendar__tile--now {
    background: #667eea !important;
    color: white !important;
    font-weight: 600 !important;
  }

  .react-calendar__tile--now:enabled:hover,
  .react-calendar__tile--now:enabled:focus {
    background: #5a67d8 !important;
    color: white !important;
  }

  .react-calendar__tile--active {
    background: #4a90e2 !important;
    color: white !important;
    font-weight: 600 !important;
  }

  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background: #357abd !important;
    color: white !important;
  }

  /* Days with bookings indicator */
  .react-calendar__tile--hasBookings {
    position: relative !important;
  }

  .react-calendar__tile--hasBookings::after {
    content: "" !important;
    position: absolute !important;
    bottom: 4px !important;
    left: 50% !important;
    transform: translateX(-50%) !important;
    width: 6px !important;
    height: 6px !important;
    background: #48bb78 !important;
    border-radius: 50% !important;
  }

  .react-calendar__tile--hasBookings.react-calendar__tile--active::after,
  .react-calendar__tile--hasBookings.react-calendar__tile--now::after {
    background: white !important;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    max-width: 100% !important;
    margin: 0 !important;

    .react-calendar__tile {
      padding: 8px 4px !important;
      font-size: 13px !important;
    }

    .react-calendar__navigation {
      height: 50px !important;
      padding: 0 12px !important;
    }

    .react-calendar__navigation__label {
      font-size: 16px !important;
    }
  }
`;

const CalendarLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
  font-size: 14px;
  color: #718096;

  @media (min-width: 768px) {
    gap: 24px;
    font-size: 15px;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #48bb78;
  }
`;

interface StationCalendarProps {
  selectedDate: Value;
  onDateChange: (date: Value) => void;
  bookings: Booking[];
  loading?: boolean;
  error?: string | null;
}

export const StationCalendar = ({
  selectedDate,
  onDateChange,
  bookings,
  loading,
  error,
}: StationCalendarProps) => {
  // Get bookings for selected date
  const getBookingsForDate = (date: Date): Booking[] => {
    return bookings.filter((booking) => {
      const startDate = new Date(booking.startDate);
      const endDate = new Date(booking.endDate);
      return date >= startDate && date <= endDate;
    });
  };

  // Check if a date has bookings
  const hasBookingsOnDate = (date: Date): boolean => {
    return getBookingsForDate(date).length > 0;
  };

  // Add custom tile className for days with bookings
  const tileClassName = ({ date }: { date: Date }) => {
    return hasBookingsOnDate(date) ? "react-calendar__tile--hasBookings" : "";
  };

  if (loading) {
    return <CalendarSection>Loading calendar...</CalendarSection>;
  }

  if (error) {
    return (
      <CalendarSection>
        <div
          style={{
            color: "#e53e3e",
            padding: "20px",
            textAlign: "center",
            background: "#fed7d7",
            borderRadius: "12px",
            border: "2px solid #feb2b2",
          }}
        >
          <strong>Error loading calendar:</strong> {error}
        </div>
      </CalendarSection>
    );
  }

  return (
    <CalendarSection>
      <StyledCalendar
        onChange={onDateChange}
        value={selectedDate}
        view="month"
        minDetail="month"
        maxDetail="month"
        tileClassName={tileClassName}
        locale="en-US"
        calendarType="gregory"
      />
      <CalendarLegend>
        <LegendItem>Days with bookings</LegendItem>
      </CalendarLegend>
    </CalendarSection>
  );
};
