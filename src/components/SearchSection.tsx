import styled from "styled-components";
import { HiSearch } from "react-icons/hi";

const SelectionSection = styled.section`
  text-align: center;
  margin-bottom: 24px;
  max-width: 560px;

  h2 {
    font-size: 28px;
    font-weight: 600;
    margin: 0 0 8px 0;
    color: #1a202c;
  }

  p {
    font-size: 16px;
    color: #718096;
    margin: 0;
    line-height: 1.5;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 560px;
  margin-bottom: 48px;
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #a0aec0;
  display: flex;
  align-items: center;
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  font-size: 16px;
  box-sizing: border-box;
  transition:
    border-color 0.2s,
    box-shadow 0.2s;

  &::placeholder {
    color: #a0aec0;
  }

  &:focus {
    outline: none;
    border-color: #4a90e2;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
  }

  &:focus-visible {
    outline: 2px solid #4a90e2;
    outline-offset: 2px;
  }

  &:focus + ${SearchIcon} {
    color: #4a90e2;
  }
`;

interface SearchSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const SearchSection = ({
  searchQuery,
  onSearchChange,
}: SearchSectionProps) => {
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
        <SearchInput
          type="text"
          placeholder="Search stations..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search stations"
          role="searchbox"
        />
      </SearchContainer>
    </>
  );
};
