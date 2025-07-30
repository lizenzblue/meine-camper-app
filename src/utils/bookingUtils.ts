import type { Booking, BookingType } from "../types";

export const getBookingType = (
  booking: Booking,
  viewDate?: Date,
): BookingType => {
  if (viewDate) {
    const viewDateStr = getCurrentDateString(viewDate);
    const startDateStr = getDateString(booking.startDate);
    const endDateStr = getDateString(booking.endDate);

    if (viewDateStr === startDateStr) return "pickup";
    if (viewDateStr === endDateStr) return "return";
  }

  const today = getCurrentDateString(new Date());
  const startDateStr = getDateString(booking.startDate);
  const endDateStr = getDateString(booking.endDate);

  if (today === startDateStr) return "pickup";
  if (today === endDateStr) return "return";

  return "pickup";
};

export const getBookingTypeColor = (type: BookingType) => {
  switch (type) {
    case "pickup":
      return {
        bg: "#e8f5e8",
        color: "#2e7d32",
        label: "🚗 START RENTAL",
      };
    case "return":
      return {
        bg: "#e3f2fd",
        color: "#1976d2",
        label: "🏁 END RENTAL",
      };
    default:
      return { bg: "#f5f5f5", color: "#666", label: "OTHER" };
  }
};

export const getDateString = (dateStr: string): string => {
  const isoDate = dateStr.split("T")[0];
  return isoDate;
};

export const getCurrentDateString = (date: Date): string => {
  return (
    date.getFullYear() +
    "-" +
    String(date.getMonth() + 1).padStart(2, "0") +
    "-" +
    String(date.getDate()).padStart(2, "0")
  );
};
