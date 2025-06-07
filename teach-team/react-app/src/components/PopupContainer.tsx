import React, { ReactNode } from "react";
import styled from "styled-components";

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  closeOnOutsideClick?: boolean;
  width?: string;
  height?: string;
}

const PopupContainer: React.FC<PopupProps> = ({
  isOpen,
  onClose,
  children,
  closeOnOutsideClick = true,
  width = "auto",
  height = "auto",
}) => {
  if (!isOpen) return null;

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

// Styled Components
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

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
