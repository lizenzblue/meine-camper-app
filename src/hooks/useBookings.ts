import { useState, useEffect } from "react";
import { stationsService } from "../services/stationsService";
import type { Booking } from "../types";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const allBookings = await stationsService.getAllBookings();
      setBookings(allBookings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchBookingsForStation = async (stationId: string) => {
    try {
      setLoading(true);
      setError(null);
      const stationBookings =
        await stationsService.getBookingsForStation(stationId);
      setBookings(stationBookings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch station bookings",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllBookings();
  }, []);

  return {
    bookings,
    loading,
    error,
    refetch: fetchAllBookings,
    fetchBookingsForStation,
  };
};

export const useStationBookings = (stationId: string) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    if (!stationId) {
      setBookings([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const stationBookings =
        await stationsService.getBookingsForStation(stationId);
      setBookings(stationBookings);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch station bookings",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      if (!stationId) {
        setBookings([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const stationBookings =
          await stationsService.getBookingsForStation(stationId);
        setBookings(stationBookings);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch station bookings",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [stationId]);

  return {
    bookings,
    loading,
    error,
    refetch: fetchBookings,
  };
};
