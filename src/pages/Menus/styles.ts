import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 4rem;
`;

export const Title = styled.label`
  color: ${props => props.theme.palette.text.primary};
  height: 400;
  font-size: 2rem;
`;

export const TableContainer = styled.div`
  display: flex;
  max-width: 900px;
  flex-direction: column;
  margin-top: 2rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;