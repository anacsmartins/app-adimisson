import styled from "styled-components";

const Button = styled.button<{
  ml?: string;
}>`
  outline: none;
  border-radius: 26px;
  padding: 8px 22px;
  cursor: pointer;
  height: 38px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 14px;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  display: flex;
  border: 1px solid #e80537;
  background-color: #e80537;
  color: #fff;
  margin-left: ${(props) => props.ml ?? '0px'};
`;

const ButtonPrimary = styled.button<{
  ml?: string;
}>`
  outline: none;
  border-radius: 26px;
  padding: 8px 22px;
  cursor: pointer;
  height: 38px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  font-size: 14px;
  background-color: #fff;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  display: flex;
  border: 1px solid #e80537;
  color: #e80537;
  margin-left: ${(props) => props.ml ?? '0px'};
`;

interface ButtonSmallProps {
  bgcolor?: string;
  color?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; // Adiciona onClick
}

export const ButtonSmall = styled.button<ButtonSmallProps>`
  font-size: 12px;
  outline: none;
  border-radius: 4px;
  border: none;
  padding: 4px 16px;
  background-color: ${(props) => props.bgcolor ?? 'none'};
  color: ${(props) => props.color ?? "#000"};
  cursor: pointer;
  font-weight: 600;
`;

export const ButtonSmallWithClick: React.FC<ButtonSmallProps> = ({ onClick, bgcolor, color }) => {
  return (
    <ButtonSmall onClick={onClick} bgcolor={bgcolor} color={color}>
    </ButtonSmall>
  );
};

export { Button, ButtonPrimary };
