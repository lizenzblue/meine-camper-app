import { Component } from "react";
import type { ReactNode } from "react";
import styled from "styled-components";
import { Button } from "./UI";
import { theme } from "../styles/theme";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing.lg};
  padding: ${theme.spacing["3xl"]};
  border: 1px solid ${theme.colors.errorLight};
  border-radius: ${theme.borderRadius.sm};
  background-color: ${theme.colors.errorBg};
  margin: ${theme.spacing.lg} 0;
`;

const ErrorTitle = styled.h3`
  color: ${theme.colors.error};
  margin: 0;
  font-size: ${theme.typography.fontSizes.lg};
`;

const ErrorMessage = styled.p`
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSizes.base};
  margin: 0;
  text-align: center;
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
          <Button variant="primary" onClick={() => window.location.reload()}>
            Refresh Page
          </Button>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}
