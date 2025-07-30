import { useContext } from "react";
import { BookingContext } from "./BookingContext";

export const useGlobalBookings = () => {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useGlobalBookings must be used within a BookingProvider");
  }
  return context;
};
