import styled from "styled-components";
import Calendar from "react-calendar";
import type { Booking } from "../types";
import { hasBookingsOnDate } from "../utils/dateUtils";
import { ErrorMessage } from "./UI";

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

const CalendarSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledCalendar = styled(Calendar)`
  width: 100%;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: inherit;

  .react-calendar__navigation {
    height: 44px;
    margin-bottom: 0;
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
  }

  .react-calendar__navigation button {
    background: none;
    border: 0;
    font-size: 16px;
    color: #4a5568;
    min-width: 44px;
    height: 44px;

    &:hover {
      background-color: #edf2f7;
    }

    &:disabled {
      opacity: 0.3;
    }
  }

  .react-calendar__navigation__label {
    font-weight: 600;
    color: #1a202c;
  }

  .react-calendar__month-view__weekdays {
    background: #f8fafc;
    border-bottom: 1px solid #e2e8f0;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 11px;
    color: #718096;
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 12px 0;
    text-align: center;

    abbr {
      text-decoration: none;
    }
  }

  .react-calendar__tile {
    max-width: 100%;
    padding: 12px 0;
    background: none;
    text-align: center;
    line-height: 16px;
    font-size: 14px;
    color: #2d3748;
    border: none;
    position: relative;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #f7fafc;
    }

    &.react-calendar__tile--active {
      background: #4a90e2;
      color: white;
    }

    &.react-calendar__tile--now {
      background: #667eea;
      color: white;
      font-weight: 600;
    }

    &.react-calendar__tile--hasBookings::after {
      content: "";
      position: absolute;
      bottom: 4px;
      left: 50%;
      transform: translateX(-50%);
      width: 4px;
      height: 4px;
      background: #48bb78;
      border-radius: 50%;
    }

    &.react-calendar__tile--hasBookings.react-calendar__tile--active::after,
    &.react-calendar__tile--hasBookings.react-calendar__tile--now::after {
      background: white;
    }

    &.react-calendar__month-view__days__day--neighboringMonth {
      color: #a0aec0;
    }
  }
`;
const CalendarLegend = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 16px;
  font-size: 14px;
  color: #718096;
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
  const tileClassName = ({ date }: { date: Date }) => {
    return hasBookingsOnDate(bookings, date)
      ? "react-calendar__tile--hasBookings"
      : "";
  };

  if (loading) {
    return <CalendarSection>Loading calendar...</CalendarSection>;
  }

  if (error) {
    return (
      <CalendarSection>
        <ErrorMessage message={`Error loading calendar: ${error}`} />
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
