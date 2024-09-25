import { useState, useEffect } from "react";
import * as React from "react";
import { HiRefresh } from "react-icons/hi";
import { useHistory } from "react-router-dom";
import { Button, ButtonPrimary } from "~/components/Buttons";
import { IconButton } from "~/components/Buttons/IconButton";
import routes from "~/router/routes";
import * as S from "./styles";
import { isCPF } from "brazilian-values";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RegistrationData } from "~/types/RegistrationData"; 
import MaskedCPFInput from "~/components/MaskedCPFInput";
import { registrationService } from "~/services/registrationService";

interface SearchBarProps {
  onSearchResult: (data: RegistrationData[]) => void;
}

export const SearchBar = ({ onSearchResult }: SearchBarProps) => {
  const history = useHistory();
  const [cpfValue, setCpfValue] = useState("");
  const [isCpfValid, setIsCpfValid] = useState(false);

  // Atualiza o valor de CPF enquanto o usuário digita
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCpfValue(value); // Atualiza o valor do CPF
  };

  // Validação do CPF
  useEffect(() => {
    const cleanedCPF = cpfValue.replace(/\D/g, ""); // Remove caracteres não numéricos
    if (cleanedCPF.length === 11) {
      const isValid = isCPF(cleanedCPF);
      setIsCpfValid(isValid);
      if (!isValid) {
        toast.error("CPF inválido. Por favor, verifique.");
      }
    } else {
      setIsCpfValid(false); // Reseta a validação se o CPF não tiver 11 dígitos
    }
  }, [cpfValue]);

  // Busca registros, baseado no CPF ou busca todos
  const handleSearch = async (fetchAll = false) => {
    try {
      let data: RegistrationData[] = [];

      if (fetchAll) {
        setCpfValue("");  // Limpa o campo de busca
        setIsCpfValid(false); // Reseta a validação
        data = await registrationService.find();
      } else if (isCpfValid) {
       data = await registrationService.find({ cpf: cpfValue.replace(/\D/g, "") }); // Busca por CPF
      }

      if (data.length > 0) {
        toast.success("Sucesso!");
        onSearchResult(data); // Retorna os resultados
      } else {
        toast.warning("Nenhum candidato encontrado.");
        onSearchResult([]); // Envia lista vazia
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro ao buscar usuário.");
    }
  };

  // Função para o botão de refresh
  const handleRefreshClick = () => {
    setCpfValue("");  // Limpa o campo
    setIsCpfValid(false);  // Reseta a validação
    handleSearch(true);  // Busca todos os registros
  };

  // Navega para a página de nova admissão
  const goToNewAdmissionPage = () => {
    history.push(routes.newUser);
  };

  return (
    <><S.Container>
      <ToastContainer />
      <MaskedCPFInput
        mask="999.999.999-99"
        value={cpfValue} // Mantém o campo de CPF controlado pelo estado
        onChange={handleChange}
        placeholder="Digite um CPF válido" width='16%' />
      <ButtonPrimary onClick={() => handleSearch()} disabled={!isCpfValid}>
        Pesquisar
      </ButtonPrimary>
      <S.Actions>
      <IconButton aria-label="refetch" onClick={handleRefreshClick}>
        <HiRefresh />
      </IconButton>
      <Button onClick={goToNewAdmissionPage}>Nova admissão</Button>
    </S.Actions>
    </S.Container></>
  );
};
