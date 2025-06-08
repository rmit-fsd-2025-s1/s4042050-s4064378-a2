import React, { ReactNode } from "react";
import styled from "styled-components";

// Props definition for PopupContainer component
interface PopupProps {
  isOpen: boolean; // Controls visibility of popup
  onClose: () => void; // Callback to close the popup
  children: ReactNode; // Content to be rendered inside the popup
  closeOnOutsideClick?: boolean; // Whether clicking outside closes the popup
  width?: string; // Optional width for the popup
  height?: string; // Optional height for the popup
}

/**
 * A reusable popup/modal component that appears centered on the screen.
 *
 * @param isOpen - Boolean to toggle popup visibility
 * @param onClose - Function to be called when popup should close
 * @param children - The actual content inside the popup
 * @param closeOnOutsideClick - Whether to allow closing popup by clicking outside
 * @param width - Optional width of the popup content
 * @param height - Optional height of the popup content
 */
const PopupContainer: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  width = "auto",
  height = "auto",
}) => {
  if (!isOpen) return null; // Do not render anything if popup is not open

  // Handles closing popup when user clicks on the overlay background
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget && closeOnOutsideClick) {
      onClose();
    }
  };

  return (
    <Overlay onClick={handleOutsideClick}>
      <Content width={width} height={height}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        {children}
      </Content>
    </Overlay>
  );
};

// ===== Styled Components =====

// Fullscreen dark transparent background behind the popup content
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5); // Semi-transparent black
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px); // Optional blur effect
`;

// Main popup content area with dynamic width/height props and animation
const Content = styled.div<{ width: string; height: string }>`
  background: white;
  padding: 2rem;
  border-radius: 8px;
  position: relative;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

// Button to close the popup, positioned in the top-right corner
const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.2);
  }
`;

export default PopupContainer;
