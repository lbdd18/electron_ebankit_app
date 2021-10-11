import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: flex-start;
  justify-content: flex-start;
  margin: 2rem;
  height: 100%;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  position: fixed;
  flex: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
`;


export const Title = styled.label`
  color: ${props => props.theme.palette.text.primary};
  height: 400;
  font-size: 2rem;
`;
