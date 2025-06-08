import React, { useEffect } from "react";
import styled from "styled-components";

/**
 * Popup component that displays a temporary message overlay.
 *
 * @param {string} message - Text to be shown inside the popup
 * @param {boolean} isOpen - Controls visibility of the popup
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsOpen - Function to toggle popup visibility
 */
export const Popup = ({
  message,
  isOpen,
  setIsOpen,
}: {
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // Toggle function to manually close the popup
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  // Automatically close popup after 1 second when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000); // Auto-close delay: 1000ms
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <PopupContainer>
          <PopupContent>
            {/* Close icon button */}
            <CloseButton onClick={togglePopup}>&times;</CloseButton>
            {/* Display the popup message */}
            <h3>{message}</h3>
          </PopupContent>

          {/* Overlay that closes the popup when clicked */}
          <PopupOverlay onClick={togglePopup} />
        </PopupContainer>
      )}
    </div>
  );
};

/* Styled container for the popup (full-screen centered flex box) */
const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

/* The visible popup box with shadow and rounded corners */
const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 10px 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  z-index: 1001;

  h3 {
    color: var(--primary-color);
  }
`;

/* Close button (X icon) styled and placed at top-right */
const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #333;

  &:hover {
    color: #000;
  }
`;

/* Semi-transparent background overlay to dim rest of screen */
const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
