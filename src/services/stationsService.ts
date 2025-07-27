import type { Station, StationListItem, Booking } from "../types";
import { API_CONFIG, APP_CONFIG, ERROR_MESSAGES } from "../constants";

/**
 * StationsService - Manages station and booking data with smart caching
 *
 * Features:
 * - Fetches all station data (including bookings) in a single API call
 * - Caches data for 5 minutes to avoid unnecessary requests
 * - Provides methods to access stations and bookings without additional API calls
 * - Automatically filters out excluded stations (ID: 7)
 */
export class StationsService {
  private static instance: StationsService;
  private stationsCache: Station[] | null = null;
  private cacheTimestamp: number | null = null;
  private readonly CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

  private constructor() {}

  public static getInstance(): StationsService {
    if (!StationsService.instance) {
      StationsService.instance = new StationsService();
    }
    return StationsService.instance;
  }

  private isCacheValid(): boolean {
    return (
      this.stationsCache !== null &&
      this.cacheTimestamp !== null &&
      Date.now() - this.cacheTimestamp < this.CACHE_DURATION
    );
  }

  private setCacheData(stations: Station[]): void {
    this.stationsCache = stations;
    this.cacheTimestamp = Date.now();
  }

  private getCachedData(): Station[] | null {
    return this.isCacheValid() ? this.stationsCache : null;
  }

  private async fetchWithTimeout(
    url: string,
    options: RequestInit = {},
  ): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        throw new Error("Request timeout");
      }
      throw error;
    }
  }

  private handleApiError(error: unknown, context: string): never {
    console.error(`${context}:`, error);

    if (error instanceof Error) {
      if (error.message.includes("timeout")) {
        throw new Error("Request timeout. Please try again.");
      }
      if (error.message.includes("fetch")) {
        throw new Error(ERROR_MESSAGES.NETWORK_ERROR);
      }
      throw new Error(error.message);
    }

    throw new Error(ERROR_MESSAGES.UNKNOWN_ERROR);
  }

  async getAllStations(): Promise<Station[]> {
    // Check cache first
    const cachedData = this.getCachedData();
    if (cachedData) {
      return cachedData.filter(
        (station) => !APP_CONFIG.EXCLUDED_STATION_IDS.includes(station.id),
      );
    }

    try {
      const response = await this.fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATIONS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const stations: Station[] = await response.json();

      // Cache the full data (including excluded stations)
      this.setCacheData(stations);

      return stations.filter(
        (station) => !APP_CONFIG.EXCLUDED_STATION_IDS.includes(station.id),
      );
    } catch (error) {
      this.handleApiError(error, "Failed to fetch stations");
    }
  }

  async getStationsList(): Promise<StationListItem[]> {
    try {
      const stations = await this.getAllStations();
      return stations.map((station) => ({
        id: station.id,
        name: station.name,
      }));
    } catch (error) {
      this.handleApiError(error, "Failed to fetch stations list");
    }
  }

  async getStationById(id: string): Promise<Station | null> {
    try {
      // First try to get from cache or fetch all stations
      const allStations = await this.getAllStations();

      // Find the station in the cached data
      const station = allStations.find((station) => station.id === id);
      return station || null;
    } catch (error) {
      this.handleApiError(error, `Failed to fetch station with id ${id}`);
    }
  }

  async getBookingsForStation(stationId: string): Promise<Booking[]> {
    try {
      const station = await this.getStationById(stationId);
      return station?.bookings || [];
    } catch (error) {
      this.handleApiError(
        error,
        `Failed to fetch bookings for station ${stationId}`,
      );
    }
  }

  async getAllBookings(): Promise<Booking[]> {
    try {
      const stations = await this.getAllStations();
      return stations.flatMap((station) => station.bookings);
    } catch (error) {
      this.handleApiError(error, "Failed to fetch all bookings");
    }
  }

  clearCache(): void {
    this.stationsCache = null;
    this.cacheTimestamp = null;
  }
}

export const stationsService = StationsService.getInstance();
