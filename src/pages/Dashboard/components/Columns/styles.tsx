import styled from "styled-components";
const registrationStatusStyles: {
  [key in string]: { background: string; title: string, bgTitle: string };
} = {
  REVIEW: {
    background: "#e0e0e052",
    title: "#fff",
    bgTitle: "#ff8858",
  },
  APPROVED: {
    background: "#e0e0e052",
    title: "#fff",
    bgTitle: "#59d359a3",
  },
  REPROVED: {
    background: "#e0e0e052",
    title: "#fff",
    bgTitle: "#e2b911d1",
  },
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 24px;
  justify-content: center;
  margin-top: 24px;
`;

export const Column = styled.div<{ status: any }>`
  height: auto;
  background-color: ${({ status }) =>
    registrationStatusStyles[status].background};
  border-radius: 32px;
  min-height: 80vh;
  max-height: 80vh;
`;

export const TitleColumn = styled.h3<{ status: any }>`
  margin: 0px;
  color: ${({ status }) => registrationStatusStyles[status].title};
  margin: 24px;
  font-weight: 600;
  border-radius: 20px;
  background: ${({ status }) => registrationStatusStyles[status].bgTitle};
  padding: 8px 25px;
  display: -webkit-inline-box;
  min-width: -webkit-fill-available;
  font-variant: all-small-caps;
`;

export const CollumContent = styled.div`
  overflow: auto;
  max-height: 85%;

  &::-webkit-scrollbar {
    display: none; /* Esconde a barra de rolagem */
  }

  scrollbar-width: none; /* Firefox */
`;
