import styled from "styled-components";
import { useState } from "react";
import { MdSchedule, MdClose, MdDateRange, MdEdit } from "react-icons/md";
import type { Booking } from "../types";
import { getBookingType } from "../utils/bookingUtils";
import { useGlobalBookings } from "../contexts";
import { BookingTypeBadge, DateDisplay } from "./UI";
import { theme } from "../styles/theme";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${theme.colors.background.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: ${theme.spacing.xl};
`;

const ModalContent = styled.div`
  background: ${theme.colors.background.white};
  border-radius: ${theme.borderRadius.lg};
  padding: ${theme.spacing["2xl"]};
  max-width: 500px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${theme.shadows.md};
  position: relative;

  @media (min-width: ${theme.breakpoints.md}) {
    padding: ${theme.spacing["3xl"]};
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${theme.spacing["2xl"]};
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.typography.fontSizes.xl};
  color: ${theme.colors.text.light};
  cursor: pointer;
  padding: ${theme.spacing.xs};
  border-radius: ${theme.borderRadius.sm};
  transition: ${theme.transitions.fast};

  &:hover {
    background: ${theme.colors.background.light};
    color: ${theme.colors.text.muted};
  }
`;

const BookingTitle = styled.h2`
  margin: 0;
  color: ${theme.colors.text.primary};
  font-size: ${theme.typography.fontSizes.xl};
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const BookingSubtitle = styled.p`
  margin: ${theme.spacing.xs} 0 0 0;
  color: ${theme.colors.text.light};
  font-size: ${theme.typography.fontSizes.sm};
`;

const DetailSection = styled.div`
  margin-bottom: ${theme.spacing["2xl"]};
`;

const SectionTitle = styled.h3`
  margin: 0 0 ${theme.spacing.lg} 0;
  color: ${theme.colors.text.secondary};
  font-size: ${theme.typography.fontSizes.lg};
  font-weight: ${theme.typography.fontWeights.semibold};
`;

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${theme.spacing.lg};

  @media (min-width: ${theme.breakpoints.sm}) {
    grid-template-columns: 1fr 1fr;
  }
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  padding: ${theme.spacing.lg};
  background: ${theme.colors.background.muted};
  border-radius: ${theme.borderRadius.md};
  border: 1px solid ${theme.colors.border.light};

  svg {
    width: 20px;
    height: 20px;
    color: ${theme.colors.primary};
    flex-shrink: 0;
  }
`;

const DetailText = styled.div`
  h4 {
    margin: 0 0 ${theme.spacing.xs} 0;
    font-size: ${theme.typography.fontSizes.sm};
    font-weight: ${theme.typography.fontWeights.semibold};
    color: ${theme.colors.text.secondary};
  }

  p {
    margin: 0;
    font-size: ${theme.typography.fontSizes.base};
    color: ${theme.colors.text.primary};
  }
`;

const BookingIdSection = styled.div`
  background: ${theme.colors.accent};
  color: white;
  padding: ${theme.spacing.lg};
  border-radius: ${theme.borderRadius.md};
  text-align: center;

  h4 {
    margin: 0 0 ${theme.spacing.sm} 0;
    font-size: ${theme.typography.fontSizes.sm};
    font-weight: ${theme.typography.fontWeights.semibold};
    opacity: 0.9;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    margin: 0;
    font-size: ${theme.typography.fontSizes.lg};
    font-weight: ${theme.typography.fontWeights.semibold};
    font-family: monospace;
  }
`;

const DateInput = styled.input`
  width: 100%;
  padding: ${theme.spacing.md};
  border: 1px solid ${theme.colors.border.light};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.typography.fontSizes.sm};
  background: ${theme.colors.background.white};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
    box-shadow: ${theme.shadows.focus};
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`;

const EditIcon = styled(MdEdit)`
  margin-left: ${theme.spacing.sm};
  font-size: ${theme.typography.fontSizes.sm};
  opacity: 0.7;
`;

const CompactButtonGroup = styled(ButtonGroup)`
  margin-top: ${theme.spacing.sm};
`;

const CompactButton = styled.button<{ variant: "save" | "cancel" }>`
  flex: 1;
  font-size: ${theme.typography.fontSizes.xs};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border: none;
  border-radius: ${theme.borderRadius.sm};
  cursor: pointer;
  font-weight: ${theme.typography.fontWeights.semibold};
  transition: ${theme.transitions.fast};

  ${({ variant }) =>
    variant === "save"
      ? `
        background: ${theme.colors.success};
        color: white;
        &:hover { background: ${theme.colors.successHover}; }
        &:disabled { background: ${theme.colors.text.placeholder}; cursor: not-allowed; }
      `
      : `
        background: ${theme.colors.text.light};
        color: white;
        &:hover { background: ${theme.colors.text.muted}; }
      `}
`;

interface BookingModalProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  viewDate?: Date;
}

export const BookingModal = ({
  booking,
  isOpen,
  onClose,
  viewDate,
}: BookingModalProps) => {
  const { rescheduleBooking, rescheduleBookingEndDate } = useGlobalBookings();
  const [isEditingStart, setIsEditingStart] = useState(false);
  const [isEditingEnd, setIsEditingEnd] = useState(false);
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("");

  if (!isOpen) return null;

  const startDate = new Date(booking.startDate);
  const endDate = new Date(booking.endDate);
  const bookingType = getBookingType(booking, viewDate);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleStartDateEdit = () => {
    setIsEditingStart(true);
    setNewStartDate(startDate.toISOString().split("T")[0]);
  };

  const handleEndDateEdit = () => {
    setIsEditingEnd(true);
    setNewEndDate(endDate.toISOString().split("T")[0]);
  };

  const handleStartDateSave = () => {
    if (newStartDate) {
      const selectedDate = new Date(newStartDate + "T00:00:00.000Z");
      rescheduleBooking(booking.id, selectedDate);
      setIsEditingStart(false);
      onClose();
    }
  };

  const handleEndDateSave = () => {
    if (newEndDate) {
      const selectedEndDate = new Date(newEndDate + "T00:00:00.000Z");
      rescheduleBookingEndDate(booking.id, selectedEndDate);
      setIsEditingEnd(false);
      onClose();
    }
  };

  const handleCancelEdit = () => {
    setIsEditingStart(false);
    setIsEditingEnd(false);
    setNewStartDate("");
    setNewEndDate("");
  };

  return (
    <ModalOverlay
      onClick={handleOverlayClick}
      onKeyDown={handleKeyDown}
      tabIndex={-1}
    >
      <ModalContent
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
      >
        <ModalHeader>
          <div>
            <BookingTitle id="booking-title">
              {booking.customerName}
            </BookingTitle>
            <BookingSubtitle>
              <BookingTypeBadge type={bookingType} />
            </BookingSubtitle>
          </div>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <MdClose />
          </CloseButton>
        </ModalHeader>

        <DetailSection>
          <SectionTitle>Booking Information</SectionTitle>
          <DetailGrid>
            <DetailItem>
              <MdDateRange />
              <DetailText>
                <h4>Start Date</h4>
                {!isEditingStart ? (
                  <p
                    onClick={handleStartDateEdit}
                    style={{ cursor: "pointer" }}
                  >
                    <DateDisplay date={startDate} format="short" />
                    <EditIcon />
                  </p>
                ) : (
                  <div>
                    <DateInput
                      type="date"
                      value={newStartDate}
                      onChange={(e) => setNewStartDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      autoFocus
                    />
                    <CompactButtonGroup>
                      <CompactButton
                        variant="save"
                        onClick={handleStartDateSave}
                        disabled={!newStartDate}
                      >
                        Save
                      </CompactButton>
                      <CompactButton
                        variant="cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </CompactButton>
                    </CompactButtonGroup>
                  </div>
                )}
              </DetailText>
            </DetailItem>
            <DetailItem>
              <MdSchedule />
              <DetailText>
                <h4>End Date</h4>
                {!isEditingEnd ? (
                  <p onClick={handleEndDateEdit} style={{ cursor: "pointer" }}>
                    <DateDisplay date={endDate} format="short" />
                    <EditIcon />
                  </p>
                ) : (
                  <div>
                    <DateInput
                      type="date"
                      value={newEndDate}
                      onChange={(e) => setNewEndDate(e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      autoFocus
                    />
                    <CompactButtonGroup>
                      <CompactButton
                        variant="save"
                        onClick={handleEndDateSave}
                        disabled={!newEndDate}
                      >
                        Save
                      </CompactButton>
                      <CompactButton
                        variant="cancel"
                        onClick={handleCancelEdit}
                      >
                        Cancel
                      </CompactButton>
                    </CompactButtonGroup>
                  </div>
                )}
              </DetailText>
            </DetailItem>
          </DetailGrid>
        </DetailSection>

        <DetailSection>
          <SectionTitle>Booking Reference</SectionTitle>
          <BookingIdSection>
            <h4>Booking ID</h4>
            <p>{booking.id}</p>
          </BookingIdSection>
        </DetailSection>
      </ModalContent>
    </ModalOverlay>
  );
};
