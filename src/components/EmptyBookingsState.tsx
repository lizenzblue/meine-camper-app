import styled from "styled-components";

const EmptyStateContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #e2e8f0;
  text-align: center;
  color: #718096;

  h3 {
    margin: 0 0 8px 0;
    color: #4a5568;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 14px;
  }

  @media (min-width: 768px) {
    padding: 50px 30px;

    h3 {
      font-size: 20px;
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
