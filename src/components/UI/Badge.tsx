import styled from "styled-components";
import type { BookingType } from "../../types";
import { getBookingTypeColor } from "../../utils/bookingUtils";
import { theme } from "../../styles/theme";

const StyledBadge = styled.div<{
  $variant?: string;
  $bg?: string;
  $color?: string;
}>`
  display: inline-flex;
  align-items: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: ${theme.borderRadius.full};
  font-size: ${theme.typography.fontSizes.xs};
  font-weight: ${theme.typography.fontWeights.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${({ $bg, $color, $variant }) => {
    if ($variant === "success") {
      return `
        background: ${theme.colors.successLight};
        color: ${theme.colors.successDark};
      `;
    }
    if ($variant === "info") {
      return `
        background: ${theme.colors.infoLight};
        color: ${theme.colors.infoDark};
      `;
    }
    return `
      background: ${$bg || theme.colors.background.light};
      color: ${$color || theme.colors.text.muted};
    `;
  }}
`;

interface BadgeProps {
  children: React.ReactNode;
  variant?: "success" | "info" | "custom";
  bg?: string;
  color?: string;
  className?: string;
}

export const Badge = ({
  children,
  variant,
  bg,
  color,
  className,
}: BadgeProps) => {
  return (
    <StyledBadge
      $variant={variant}
      $bg={bg}
      $color={color}
      className={className}
    >
      {children}
    </StyledBadge>
  );
};

interface BookingTypeBadgeProps {
  type: BookingType;
  className?: string;
}

export const BookingTypeBadge = ({
  type,
  className,
}: BookingTypeBadgeProps) => {
  const colors = getBookingTypeColor(type);

  return (
    <Badge bg={colors.bg} color={colors.color} className={className}>
      {colors.label}
    </Badge>
  );
};
