import { ENV } from "../config/env";

// App Configuration
export const APP_CONFIG = {
  TITLE: ENV.APP_TITLE,
  DESCRIPTION: ENV.APP_DESCRIPTION,
  EXCLUDED_STATION_IDS: ["7"] as readonly string[],
  SEARCH_DEBOUNCE_MS: 300,
} as const;

// API Configuration
export const API_CONFIG = {
  BASE_URL: ENV.API_BASE_URL,
  ENDPOINTS: {
    STATIONS: "/stations",
  },
  TIMEOUT: 10000,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error. Please check your connection.",
  UNKNOWN_ERROR: "An unknown error occurred",
} as const;
