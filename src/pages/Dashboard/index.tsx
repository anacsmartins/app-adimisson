import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import Columns from "./components/Columns";
import ModalComponent from "~/components/Modal";
import * as S from "./styles";
import { RegistrationData } from "~/types/RegistrationData";
import { registrationService } from '~/services/registrationService';

const DashboardPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [registrations, setRegistrations] = useState<RegistrationData[]>([]);
  const [selectedAction, setSelectedAction] = useState<{ id: string, action: string } | null>(null);

  const handleSubmit = async () => {
    if (selectedAction) {
      const { id, action } = selectedAction;
      try {
        let updatedRegistration: RegistrationData;
        switch (action) {
          case 'approve':
            updatedRegistration = await registrationService.updateStatus(id, 'APPROVED');
            break;
          case 'reject':
            updatedRegistration = await registrationService.updateStatus(id, 'REPROVED');
            break;
          case 'review':
            updatedRegistration = await registrationService.updateStatus(id, 'REVIEW');
            break;
          case 'delete':
            await registrationService.delete(id);
            // Atualiza o estado de registrations após excluir
            setRegistrations(prevRegistrations =>
              prevRegistrations.filter(reg => reg.id !== id)
            );
            break;
          default:
            return;
        }
  
        // Para as demais ações, atualiza o registro
        if (action !== 'delete') {
          setRegistrations(prevRegistrations =>
            prevRegistrations.map(reg => 
              reg.id === id ? { ...reg, ...updatedRegistration } : reg
            )
          );
        }
      } catch (error) {
        console.error('Erro ao realizar a ação:', error);
      } finally {
        onClose();
      }
    }
  };
  

  return (
    <S.Container>
      <Columns 
        onOpen={onOpen} 
        setSelectedAction={setSelectedAction} 
        registrations={registrations} 
        setRegistrations={setRegistrations} 
      />
      <ModalComponent
        title="Confirmação"
        body="Você tem certeza que deseja realizar esta ação?"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        labelCloseBtn={'fechar'}
        labelSubmitBtn={'salvar'}
      />
    </S.Container>
  );
};

export default DashboardPage;
