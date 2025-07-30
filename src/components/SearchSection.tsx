import { memo, useCallback } from "react";
import styled from "styled-components";
import { HiSearch } from "react-icons/hi";
import { theme } from "../styles/theme";
import { Input } from "./UI";

const SelectionSection = styled.section`
  text-align: center;
  margin-bottom: ${theme.spacing["2xl"]};
  max-width: 560px;

  h2 {
    font-size: ${theme.typography.fontSizes["2xl"]};
    font-weight: ${theme.typography.fontWeights.semibold};
    margin: 0 0 ${theme.spacing.sm} 0;
    color: ${theme.colors.text.primary};
  }

  p {
    font-size: ${theme.typography.fontSizes.base};
    color: ${theme.colors.text.light};
    margin: 0;
    line-height: ${theme.typography.lineHeights.normal};
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  margin-bottom: ${theme.spacing["4xl"]};
`;

const SearchIcon = styled.div`
  position: absolute;
  left: ${theme.spacing.lg};
  top: 50%;
  transform: translateY(-50%);
  color: ${theme.colors.text.placeholder};
  display: flex;
  align-items: center;
  pointer-events: none;
  z-index: 1;
`;

const StyledSearchInput = styled(Input)`
  padding-left: ${theme.spacing["4xl"]};
  
  &:focus + ${SearchIcon} {
    color: ${theme.colors.primary};
  }
`;

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchSection = memo<SearchSectionProps>(
  ({ searchQuery, onSearchChange }) => {
    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onSearchChange(e.target.value);
      },
      [onSearchChange],
    );

    return (
      <>
        <SelectionSection>
          <h2>Select a Station</h2>
          <p>Choose a station to view bookings and manage operations</p>
        </SelectionSection>

        <SearchContainer>
          <SearchIcon>
            <HiSearch size={20} />
          </SearchIcon>
          <StyledSearchInput
            type="text"
            placeholder="Search stations..."
            value={searchQuery}
            onChange={handleSearchChange}
            aria-label="Search stations"
            role="searchbox"
          />
        </SearchContainer>
      </>
    );
  },
);
