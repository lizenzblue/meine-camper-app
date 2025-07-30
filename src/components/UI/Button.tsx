import React, { forwardRef, memo } from "react";
import styled from "styled-components";
import { theme } from "../../styles/theme";

const StyledButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.md} ${theme.spacing["2xl"]};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSizes.base};
  font-weight: ${theme.typography.fontWeights.medium};
  cursor: pointer;
  transition: ${theme.transitions.fast};

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? `
        background-color: ${theme.colors.primary};
        color: white;
        &:hover {
          background-color: ${theme.colors.primaryHover};
        }
      `
      : `
        background-color: transparent;
        color: ${theme.colors.primary};
        border: 1px solid ${theme.colors.primary};
        &:hover {
          background-color: ${theme.colors.primaryLight};
        }
      `}

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  children: React.ReactNode;
}

export const Button = memo(
  forwardRef<HTMLButtonElement, ButtonProps>(
    ({ variant = "primary", children, ...props }, ref) => {
      return (
        <StyledButton ref={ref} $variant={variant} {...props}>
          {children}
        </StyledButton>
      );
    },
  ),
);

Button.displayName = "Button";
