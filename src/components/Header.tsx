import { memo } from "react";
import styled from "styled-components";
import { MdDirectionsCarFilled, MdEdit } from "react-icons/md";
import { APP_CONFIG } from "../constants";
import { Button } from "./UI/Button";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 24px;
  padding: 16px 0;
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderIcon = styled.div`
  background-color: #f0f2f5;
  border-radius: 12px;
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    color: #1a202c;
  }
  p {
    font-size: 14px;
    color: #718096;
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

Header.displayName = "Header";
