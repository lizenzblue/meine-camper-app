import styled from "styled-components";
import { theme } from "../styles/theme";

export const ContentWrapper = styled.div`
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
  padding: ${theme.spacing["2xl"]};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${theme.spacing["2xl"]};
`;
