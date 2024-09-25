import { useState } from "react";
import styled from "styled-components";

const StyledInputMask = styled('input')<{ position: string, width: string }>`
  padding: 0 8px;
  vertical-align: middle;
  position: ${(props) => props.position ?? 'absolute'};
  border-radius: 2px;
  width: ${(props) => props.width ?? '100%'};
  min-height: 36px;
  background-color: #ffffff;
  border: 1px solid rgba(36, 28, 21, 0.3);
  transition: all 0.2s ease-in-out 0s;
  font-size: 14px;
  line-height: 18px;
  font-weight: normal;
  border-radius: 8px;
  :focus {
    outline: none;
    border: 1px solid #007c89;
    box-shadow: inset 0 0 0 1px #007c89;
  }`
;

interface MaskedCPFInputProps {
  mask: string;
  value: string;
  placeholder?: string;
  width?: string;
  position?:string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const MaskedCPFInput: React.FC<MaskedCPFInputProps> = ({
  mask,
  value,
  placeholder,
  width,
  position,
  onChange,
}) => {
  const [cpf, setCpf] = useState(value);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cpfValue = event.target.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    const formattedCpf = formatCpf(cpfValue, mask);
    setCpf(formattedCpf);
    onChange(event);
  };
  
  const formatCpf = (cpfValue: string, mask: string): string => {
    let formattedCpf = '';
    let cpfIndex = 0;
  
    for (let i = 0; i < mask.length && cpfIndex < cpfValue.length; i++) {
      if (mask[i] === '9') {
        formattedCpf += cpfValue[cpfIndex];
        cpfIndex++;
      } else {
        formattedCpf += mask[i];
      }
    }  
    return formattedCpf;
  };

  return (
    <StyledInputMask
      type="text"
      value={cpf}
      onChange={handleChange}
      placeholder={placeholder}
      position={position}
      width={width}
    />
  );
};

export default MaskedCPFInput;