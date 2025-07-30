import { memo } from "react";
import styled from "styled-components";
import { MdDirectionsCarFilled, MdEdit } from "react-icons/md";
import { APP_CONFIG } from "../constants";
import { Button } from "./UI/Button";
import { theme } from "../styles/theme";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing["2xl"]};
  padding: ${theme.spacing.lg} 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
`;

const HeaderIcon = styled.div`
  background-color: ${theme.colors.background.light};
  border-radius: ${theme.borderRadius.md};
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${theme.colors.text.muted};
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  h1 {
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
    margin: 0;
    color: ${theme.colors.text.primary};
  }
  p {
    font-size: ${theme.typography.fontSizes.sm};
    color: ${theme.colors.text.light};
    margin: 2px 0 0 0;
  }
`;

interface HeaderProps {
  stationName?: string;
  stationId?: string;
  onChangeStation?: () => void;
}

export const Header = memo<HeaderProps>(
  ({ stationName, stationId, onChangeStation }) => {
    return (
      <HeaderContainer>
        <HeaderContent>
          <HeaderIcon>
            <MdDirectionsCarFilled size={20} />
          </HeaderIcon>
          <HeaderText>
            <h1>{stationName || APP_CONFIG.TITLE}</h1>
            <p>
              {stationName
                ? `Station ID: ${stationId}`
                : APP_CONFIG.DESCRIPTION}
            </p>
          </HeaderText>
        </HeaderContent>
        {onChangeStation && (
          <Button variant="secondary" onClick={onChangeStation}>
            <MdEdit />
            Change Station
          </Button>
        )}
      </HeaderContainer>
    );
  },
);
