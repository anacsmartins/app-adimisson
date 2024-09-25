import { ButtonSmall } from "~/components/Buttons";
import * as S from "./styles";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineTrash,
} from "react-icons/hi";
import { RegistrationData } from "~/types/RegistrationData";

type Props = {
  data: RegistrationData
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onReview: (id: string) => void;
  onDelete: (id: string) => void;
  
};

const RegistrationCard = (props: Props) => {
  const { status, employeeName, email, admissionDate, id } = props.data;

  return (
    <S.Card>
      <S.IconAndText>
        <HiOutlineUser />
        <h3><strong>{employeeName}</strong></h3>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineMail />
        <p>{email}</p>
      </S.IconAndText>
      <S.IconAndText>
        <HiOutlineCalendar />
        <span>{admissionDate}</span>
      </S.IconAndText>
      <S.Actions>
        {status === 'REVIEW' && (
          <>
            <ButtonSmall
              bgcolor="#e2b911d1"
              color="#FFF"
              onClick={() => props.onReject(id)}
            >
              Reprovar
            </ButtonSmall>
            <ButtonSmall
              bgcolor="rgb(155, 229, 155)"
              color="#FFF"
              onClick={() => props.onApprove(id)}
            >
              Aprovar
            </ButtonSmall>
          </>
        )}
        {(status === 'REPROVED' || status === 'APPROVED') && (
          <ButtonSmall
            bgcolor="#ff8858"
            color="#FFF"
            onClick={() => props.onReview(id)}
          >
            Revisar novamente
          </ButtonSmall>
        )}
        <HiOutlineTrash onClick={() => props.onDelete(id)} />
      </S.Actions>
    </S.Card>
  );
};

export default RegistrationCard;
