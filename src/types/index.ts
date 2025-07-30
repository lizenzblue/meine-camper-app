export interface Booking {
  id: string;
  pickupReturnStationId: string;
  customerName: string;
  startDate: string;
  endDate: string;
}

export type BookingType = "pickup" | "return";

export interface Station {
  id: string;
  name: string;
  bookings: Booking[];
}

export interface StationListItem {
  id: string;
  name: string;
}
