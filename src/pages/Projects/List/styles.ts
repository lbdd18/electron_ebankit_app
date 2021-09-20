import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 4rem;
`;

export const ContainerHeader = styled.div`
  display: flex;
  flex-direction: row;
`;

export const Title = styled.label`
  color: ${props => props.theme.palette.text.primary};
  height: 400;
  font-size: 2rem;
`;

export const TableContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 16px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-end;
  justify-content: flex-end;
`;