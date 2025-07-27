import React, { Component } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 32px;
  border: 1px solid #fed7d7;
  border-radius: 8px;
  background-color: #fef5e7;
  margin: 16px 0;
`;

const ErrorTitle = styled.h3`
  color: #c53030;
  margin: 0;
  font-size: 18px;
`;

const ErrorMessage = styled.p`
  color: #744210;
  margin: 0;
  text-align: center;
`;

const RetryButton = styled.button`
  padding: 8px 16px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background-color: #357abd;
  }
`;

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <ErrorTitle>Something went wrong</ErrorTitle>
          <ErrorMessage>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </ErrorMessage>
          <RetryButton onClick={() => window.location.reload()}>
            Refresh Page
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
