export const theme = {
  colors: {
    primary: "#4a90e2",
    primaryHover: "#357abd",
    primaryLight: "#f7faff",

    accent: "#667eea",

    success: "#48bb78",
    successHover: "#38a169",
    successLight: "#e8f5e8",
    successDark: "#2e7d32",

    info: "#4a90e2",
    infoLight: "#e3f2fd",
    infoDark: "#1976d2",

    warning: "#ed8936",
    warningLight: "#fef5e7",
    warningDark: "#c53030",

    error: "#c53030",
    errorLight: "#fed7d7",
    errorBg: "#fef5e7",

    text: {
      primary: "#1a202c",
      secondary: "#2d3748",
      muted: "#4a5568",
      light: "#718096",
      placeholder: "#a0aec0",
    },

    background: {
      white: "#ffffff",
      light: "#f7fafc",
      muted: "#f8fafc",
      overlay: "rgba(0, 0, 0, 0.5)",
    },

    border: {
      light: "#e2e8f0",
      muted: "#a0aec0",
    },
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "20px",
    "2xl": "24px",
    "3xl": "32px",
    "4xl": "48px",
  },

  borderRadius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    full: "9999px",
  },

  shadows: {
    sm: "0 4px 12px rgba(0, 0, 0, 0.08)",
    md: "0 10px 25px rgba(0, 0, 0, 0.2)",
    focus: "0 0 0 3px rgba(74, 144, 226, 0.1)",
    focusRing: "0 0 0 3px rgba(74, 144, 226, 0.2)",
  },

  typography: {
    fontSizes: {
      xs: "12px",
      sm: "14px",
      base: "16px",
      lg: "18px",
      xl: "24px",
      "2xl": "28px",
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },

  transitions: {
    fast: "0.2s ease",
    normal: "0.3s ease",
  },

  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1400px",
  },
} as const;

export type Theme = typeof theme;

export const focusStyles = `
  outline: none;
  border-color: ${theme.colors.primary};
  box-shadow: ${theme.shadows.focus};
`;

export const hoverStyles = `
  transition: ${theme.transitions.fast};
`;

export const cardStyles = `
  background: ${theme.colors.background.white};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.md};
  box-shadow: ${theme.shadows.sm};
`;

export const buttonResetStyles = `
  background: none;
  border: none;
  cursor: pointer;
  ${hoverStyles}
`;
