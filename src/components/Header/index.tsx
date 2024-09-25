import styled from "styled-components";

const StyledHeader = styled.header`
  border-bottom-width: thin;
  width: 100%;
  height: 64px;
  position: fixed;
  top: 0;
  display: flex;
  align-items: center;
  padding: 0px 24px;
  z-index: 1;
  background: rgb(255 255 255);
  marge-botton: 5px;
  h1 {
    color: #fff;
    font-size: 24px;
  }
`;

interface HeaderProps {
  children: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({ children }) => {
  return <StyledHeader>{children}</StyledHeader>;
};
