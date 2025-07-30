import { memo } from "react";
import styled, { keyframes } from "styled-components";
import { theme } from "../styles/theme";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing["3xl"]};
`;

const Spinner = styled.div`
  border: 3px solid ${theme.colors.background.light};
  border-top: 3px solid ${theme.colors.primary};
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSizes.sm};
  margin: 0;
`;

interface LoadingProps {
  message?: string;
}

export const Loading = memo<LoadingProps>(({ message = "Loading..." }) => {
  return (
    <LoadingContainer role="status" aria-live="polite">
      <Spinner aria-hidden="true" />
      <LoadingText>{message}</LoadingText>
    </LoadingContainer>
  );
});
