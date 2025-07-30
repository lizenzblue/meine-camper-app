import React, { createContext, useEffect, useState } from "react";
import { stationsService } from "../services/stationsService";
import { getBookingsForDate } from "../utils/dateUtils";
import type { Booking } from "../types";

interface BookingContextType {
  allBookings: Booking[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  getBookingsForStation: (stationId: string) => Booking[];
  getBookingsForDate: (date: Date, stationId?: string) => Booking[];
  rescheduleBooking: (bookingId: string, newStartDate: Date) => void;
  rescheduleBookingEndDate: (bookingId: string, newEndDate: Date) => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const BookingContext = createContext<BookingContextType | undefined>(
  undefined,
);

interface BookingProviderProps {
  children: React.ReactNode;
}

export const BookingProvider = ({ children }: BookingProviderProps) => {
  const [allBookings, setAllBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const bookings = await stationsService.getAllBookings();
      setAllBookings(bookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const getBookingsForStation = (stationId: string): Booking[] => {
    return allBookings
      .filter((booking) => booking.pickupReturnStationId === stationId)
      .sort(
        (a, b) =>
          new Date(a.startDate).getTime() - new Date(b.startDate).getTime(),
      );
  };

  const getBookingsForDateWrapper = (
    date: Date,
    stationId?: string,
  ): Booking[] => {
    return getBookingsForDate(allBookings, date, stationId);
  };

  const rescheduleBooking = (bookingId: string, newStartDate: Date) => {
    setAllBookings((currentBookings) =>
      currentBookings.map((booking) => {
        if (booking.id === bookingId) {
          const originalStart = new Date(booking.startDate);
          const originalEnd = new Date(booking.endDate);
          const durationMs = originalEnd.getTime() - originalStart.getTime();

          const newStartDateTime = new Date(
            newStartDate.getFullYear(),
            newStartDate.getMonth(),
            newStartDate.getDate(),
            originalStart.getHours(),
            originalStart.getMinutes(),
            originalStart.getSeconds(),
          );

          const newEndDate = new Date(newStartDateTime.getTime() + durationMs);

          return {
            ...booking,
            startDate: newStartDateTime.toISOString(),
            endDate: newEndDate.toISOString(),
          };
        }
        return booking;
      }),
    );
  };

  const rescheduleBookingEndDate = (bookingId: string, newEndDate: Date) => {
    setAllBookings((currentBookings) =>
      currentBookings.map((booking) => {
        if (booking.id === bookingId) {
          const originalStart = new Date(booking.startDate);
          const originalEnd = new Date(booking.endDate);

          const newEndDateTime = new Date(
            newEndDate.getFullYear(),
            newEndDate.getMonth(),
            newEndDate.getDate(),
            originalEnd.getHours(),
            originalEnd.getMinutes(),
            originalEnd.getSeconds(),
          );

          return {
            ...booking,
            startDate: originalStart.toISOString(),
            endDate: newEndDateTime.toISOString(),
          };
        }
        return booking;
      }),
    );
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  const value: BookingContextType = {
    allBookings,
    loading,
    error,
    refetch: fetchAllBookings,
    getBookingsForStation,
    getBookingsForDate: getBookingsForDateWrapper,
    rescheduleBooking,
    rescheduleBookingEndDate,
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};
