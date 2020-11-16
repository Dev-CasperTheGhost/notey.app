import styled from "styled-components/macro";

export const ModalContainer = styled.div`
  z-index: 30;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);

  display: none;
  align-items: center;
  justify-content: center;

  &.active {
    display: flex;
  }
`;

export const ModalStyle = styled.div`
  z-index: 35;
  padding: 10px;
  background-color: #2f2f2f;
  width: 600px;
  max-width: 90%;
  max-height: 95%;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  transition: transform 200ms;
  border-radius: 0.7rem;

  @media (max-height: 750px) {
    overflow-y: auto;
  }
`;

export const ModalHeader = styled.div`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f2f2f2;
  font-size: 1.5rem;
  font-weight: 600;
  border-bottom: 2px solid #5c5c5c;
  margin-bottom: 15px;
  padding-bottom: 5px;
`;

export const CloseModal = styled.button`
  color: #f2f2f2;
  font-weight: 600;
  background: none;
  border: none;
  font-size: 2.5rem;
  cursor: pointer;
  width: 50px;
  height: 50px;
  transition: background 200ms;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(85, 85, 85, 0.8);
  }

  &:focus {
    outline: none;
  }
`;

export const ModalBody = styled.div`
  max-height: 90%;
`;

// OptionsModal
export const OptionsModalStyle = styled.div`
  color: #f2f2f2;
`;

export const OptionsModalContent = styled.div`
  display: grid;
  grid-template-rows: auto 50px;
`;

export const OptionsModalBody = styled.div`
  padding: 10px 0;
`;

export const OptionsModalFooter = styled.div`
  border-top: 2px solid #5c5c5c;
  padding: 10px 0;
  color: #f2f2f2;
  font-size: 1.2rem;
  text-align: center;

  & a {
    color: #f5f5f5;
    text-decoration: underline;
  }
`;
