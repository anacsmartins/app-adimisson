import { useState } from 'react';
import TextField from "~/components/TextField";
import * as S from "./styles";
import { Button } from "~/components/Buttons";
import { HiOutlineArrowLeft } from "react-icons/hi";
import { IconButton } from "~/components/Buttons/IconButton";
import { useHistory } from "react-router-dom";
import routes from "~/router/routes";
import { registrationService } from '~/services/registrationService';
import { RegistrationData } from '~/types/RegistrationData';
import { isCPF } from "brazilian-values";
import MaskedCPFInput from '~/components/MaskedCPFInput';

interface FormErrors {
  name?: string;
  email?: string;
  cpf?: string;
}

const NewUserPage = () => {
  const history = useHistory();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [admissionDate, setAdmissionDate] = useState('');
  const [cpf, setCpf] = useState('');
  const [errors, setErrors] = useState<FormErrors>({}); // Define o tipo para errors

  const goToHome = () => {
    history.push(routes.dashboard);
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name: string) => {
    const nameRegex = /^[a-zA-Z]{2,}(?: [a-zA-Z]{2,})+$/; // Pelo menos duas letras e pelo menos um espaço
    return nameRegex.test(name);
  };

  const validateCPF = (cpf: string) => {
    const cleanCpf = cpf.replace(/\D/g, '');
    return cleanCpf.length === 11 && isCPF(cleanCpf); 
  };

  const handleSubmit = async () => {
    const newRegistration: RegistrationData = {
      employeeName: name,
      email,
      admissionDate,
      cpf,
      status: 'REVIEW',
      id: ''
    };

    const newErrors: FormErrors = {};
    if (!validateName(name)) newErrors.name = 'Nome inválido.';
    if (!validateEmail(email)) newErrors.email = 'Email inválido.';
    if (!validateCPF(cpf)) newErrors.cpf = 'CPF inválido.';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return; // Não prosseguir se houver erros
    }

    try {
      await registrationService.create(newRegistration);
      goToHome(); // Redireciona após a criação
    } catch (error) {
      console.error('Erro ao criar registro:', error);
    }
  };

  return (
    <S.Container>
      <S.Card>
        <IconButton onClick={goToHome} aria-label="back">
          <HiOutlineArrowLeft size={24} />
        </IconButton>
        <TextField 
          label="Data de admissão:" 
          type="date" 
          value={admissionDate} 
          onChange={e => setAdmissionDate(e.target.value)} 
        />
        <TextField 
          placeholder="Nome" 
          value={name} 
          onChange={e => setName(e.target.value)} 
          error={errors.name}
        />
        <TextField 
          placeholder="Email" 
          type="email" 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          error={errors.email}
        />
        <MaskedCPFInput 
          mask="999.999.999-99" 
          value={cpf} 
          onChange={e => setCpf(e.target.value)} 
          placeholder="CPF"
          position='relative'
        />
        {errors.cpf && <p>{errors.cpf}</p>}
        
        <Button onClick={handleSubmit}>Cadastrar</Button>
      </S.Card>
    </S.Container>
  );
};

export default NewUserPage;
