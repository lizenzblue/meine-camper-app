import { memo } from "react";

interface DateDisplayProps {
  date: Date;
  format?: "short" | "long" | "time";
  className?: string;
}

export const DateDisplay = memo<DateDisplayProps>(
  ({ date, format = "short", className }) => {
    const formatDate = () => {
      switch (format) {
        case "short":
          return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          });
        case "long":
          return date.toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          });
        case "time":
          return date.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
          });
        default:
          return date.toLocaleDateString();
      }
    };

    return <span className={className}>{formatDate()}</span>;
  },
);
