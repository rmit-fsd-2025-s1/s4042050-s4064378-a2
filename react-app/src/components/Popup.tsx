import React, { useEffect } from "react";
import styled from "styled-components";

export const Popup = ({
  message,
  isOpen,
  setIsOpen,
}: {
  message: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setIsOpen(false);
      }, 1000);
    }
  }, [isOpen]);

  return (
    <div>
      {isOpen && (
        <PopupContainer>
          <PopupContent>
            <CloseButton onClick={togglePopup}>&times;</CloseButton>
            <h3>{message}</h3>
          </PopupContent>
          <PopupOverlay onClick={togglePopup} />
        </PopupContainer>
      )}
    </div>
  );
};

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

const PopupContent = styled.div`
  position: relative;
  background: white;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  max-width: 500px;
  z-index: 1001;

  h3 {
    color: var(--primary-color);
  }
`;

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

const PopupOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
`;
