import styled from "styled-components";
import { MdDirectionsCarFilled } from "react-icons/md";
import { APP_CONFIG } from "../constants";

const HeaderContainer = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`;

const HeaderIcon = styled.div`
  background-color: #f0f2f5;
  border-radius: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #555;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  h1 {
    font-size: 16px;
    font-weight: 600;
    margin: 0;
    color: #1a202c;
  }
  p {
    font-size: 14px;
    color: #718096;
    margin: 0;
  }
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <HeaderIcon>
        <MdDirectionsCarFilled size={20} />
      </HeaderIcon>
      <HeaderText>
        <h1>{APP_CONFIG.TITLE}</h1>
        <p>{APP_CONFIG.DESCRIPTION}</p>
      </HeaderText>
    </HeaderContainer>
  );
};
