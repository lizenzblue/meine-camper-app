import styled from "styled-components";
import { theme, cardStyles } from "../styles/theme";

const EmptyStateContainer = styled.div`
  ${cardStyles}
  padding: ${theme.spacing["2xl"]};
  text-align: center;
  color: ${theme.colors.text.light};

  h3 {
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${theme.colors.text.muted};
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
  }

  p {
    margin: 0;
    font-size: ${theme.typography.fontSizes.sm};
  }

  @media (min-width: ${theme.breakpoints.md}) {
    padding: 50px 30px;

    h3 {
      font-size: ${theme.typography.fontSizes.xl};
    }

    p {
      font-size: 16px;
    }
  }
`;

interface EmptyBookingsStateProps {
  title: string;
  message: string;
}

export const EmptyBookingsState = ({
  title,
  message,
}: EmptyBookingsStateProps) => {
  return (
    <EmptyStateContainer>
      <h3>{title}</h3>
      <p>{message}</p>
    </EmptyStateContainer>
  );
};
