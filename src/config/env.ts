// Environment configuration
export const ENV = {
  API_BASE_URL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://605c94c36d85de00170da8b4.mockapi.io",
  APP_TITLE: import.meta.env.VITE_APP_TITLE || "Campervan Management",
  APP_DESCRIPTION:
    import.meta.env.VITE_APP_DESCRIPTION ||
    "Manage your campervan rental business",
  NODE_ENV: import.meta.env.NODE_ENV || "development",
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;
