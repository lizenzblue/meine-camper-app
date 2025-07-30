import { getCurrentDateString, getDateString } from "./bookingUtils";
import type { Booking } from "../types";

export const getBookingsForDate = (
  bookings: Booking[],
  date: Date,
  stationId?: string,
): Booking[] => {
  const targetDateStr = getCurrentDateString(date);

  let filteredBookings = bookings;

  if (stationId) {
    filteredBookings = bookings.filter(
      (booking) => booking.pickupReturnStationId === stationId,
    );
  }

  return filteredBookings
    .filter((booking) => {
      const startDateStr = getDateString(booking.startDate);
      const endDateStr = getDateString(booking.endDate);

      return startDateStr === targetDateStr || endDateStr === targetDateStr;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
    );
};

export const hasBookingsOnDate = (
  bookings: Booking[],
  date: Date,
  stationId?: string,
): boolean => {
  return getBookingsForDate(bookings, date, stationId).length > 0;
};
