import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 4rem;
`;

export const Title = styled.label`
  color: ${({ theme }) => theme.colors.onBackground};
  height: 400;
  font-size: 2rem;
`;
