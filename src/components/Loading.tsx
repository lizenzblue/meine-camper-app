import { memo } from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
`;

const Spinner = styled.div`
  border: 3px solid #f3f3f3;
  border-top: 3px solid #4a90e2;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  color: #718096;
  font-size: 14px;
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

Loading.displayName = "Loading";
