import type { Station, StationListItem } from "../types";
import { API_CONFIG, APP_CONFIG, ERROR_MESSAGES } from "../constants";

export class StationsService {
  private static instance: StationsService;

  private constructor() {}

  public static getInstance(): StationsService {
    if (!StationsService.instance) {
      StationsService.instance = new StationsService();
    }
    return StationsService.instance;
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
    try {
      const response = await this.fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATIONS}`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const stations: Station[] = await response.json();

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
      const response = await this.fetchWithTimeout(
        `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.STATIONS}/${id}`,
      );

      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const station: Station = await response.json();
      return station;
    } catch (error) {
      this.handleApiError(error, `Failed to fetch station with id ${id}`);
    }
  }
}

export const stationsService = StationsService.getInstance();
