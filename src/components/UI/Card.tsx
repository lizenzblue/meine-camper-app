import styled from "styled-components";
import { theme, cardStyles, hoverStyles } from "../../styles/theme";

export const Card = styled.div`
  ${cardStyles}
  padding: ${theme.spacing["2xl"]};
`;

export const ClickableCard = styled(Card)`
  cursor: pointer;
  ${hoverStyles}

  &:hover {
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.md};
  }

  &:focus {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const InteractiveCard = styled(ClickableCard)`
  background: ${theme.colors.background.muted};

  &:hover {
    background: ${theme.colors.background.light};
    border-color: ${theme.colors.primary};
    transform: translateY(-1px);
    box-shadow: ${theme.shadows.md};
  }

  &:active {
    transform: translateY(1px);
  }
`;
