import styled from "styled-components";
import { theme } from "../../styles/theme";

const ErrorContainer = styled.div`
  color: ${theme.colors.error};
  padding: ${theme.spacing.xl};
  text-align: center;
  background: ${theme.colors.errorLight};
  border-radius: ${theme.borderRadius.md};
  border: 2px solid ${theme.colors.errorLight};
`;

interface ErrorMessageProps {
  message: string;
  className?: string;
}

export const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  return (
    <ErrorContainer className={className}>
      <strong>Error:</strong> {message}
    </ErrorContainer>
  );
};
