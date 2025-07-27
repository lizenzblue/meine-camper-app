import React from "react";
import styled from "styled-components";
import { MdRefresh } from "react-icons/md";

const StyledButton = styled.button<{ $variant?: "primary" | "secondary" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ $variant = "primary" }) =>
    $variant === "primary"
      ? `
        background-color: #4a90e2;
        color: white;
        &:hover {
          background-color: #357abd;
        }
      `
      : `
        background-color: transparent;
        color: #4a90e2;
        border: 1px solid #4a90e2;
        &:hover {
          background-color: #f7faff;
        }
      `}

  &:focus {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  showIcon?: boolean;
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  showIcon = false,
  children,
  ...props
}: ButtonProps) => {
  return (
    <StyledButton $variant={variant} {...props}>
      {showIcon && <MdRefresh size={16} />}
      {children}
    </StyledButton>
  );
};
