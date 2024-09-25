import { useEffect } from "react";
import * as S from "./styles";
import RegistrationCard from "../RegistrationCard";
import { SearchBar } from "../Searchbar";
import { registrationService } from "~/services/registrationService";
import { RegistrationData } from "~/types/RegistrationData";

const allColumns = [
  { status: 'REVIEW', title: "Revisar" },
  { status: 'APPROVED', title: "Aprovado" },
  { status: 'REPROVED', title: "Reprovado" },
];

interface ColumnsProps {
  onOpen: () => void;
  setSelectedAction: (action: { id: string, action: 'approve' | 'reject' | 'review' | 'delete' }) => void;
  registrations: RegistrationData[]; 
  setRegistrations: (registrations: RegistrationData[]) => void;
}

const Columns: React.FC<ColumnsProps> = ({ onOpen, setSelectedAction, registrations, setRegistrations }) => {

  useEffect(() => {
    const loadRegistrations = async () => {
      try {
        const data = await registrationService.find();
        setRegistrations(data);
      } catch (err) {
        console.error("Erro ao buscar registros:", err);
      }
    };
    loadRegistrations();
  }, [setRegistrations]);

  const handleAction = (id: string, action: 'approve' | 'reject' | 'review' | 'delete') => {
    setSelectedAction({ id, action });  // Passa a ação e o ID para o estado no DashboardPage
    onOpen();
  };

  return (
    <>
      <SearchBar onSearchResult={setRegistrations} />
      <S.Container>
        {allColumns.map((column) => {
          const columnRegistrations = registrations.filter(
            (registration) => registration.status === column.status
          );

          return (
            <S.Column status={column.status} key={column.title}>
              <S.TitleColumn status={column.status}>
                {column.title}
              </S.TitleColumn>
              <S.CollumContent>
                {columnRegistrations.length > 0 ? (
                  columnRegistrations.map((registration) => (
                    <RegistrationCard
                      data={registration}
                      key={registration.id}
                      onApprove={() => handleAction(registration.id, 'approve')}
                      onReject={() => handleAction(registration.id, 'reject')}
                      onReview={() => handleAction(registration.id, 'review')}
                      onDelete={() => handleAction(registration.id, 'delete')}
                    />
                  ))
                ) : (
                  <div></div>
                )}
              </S.CollumContent>
            </S.Column>
          );
        })}
      </S.Container>
    </>
  );
};

export default Columns;
