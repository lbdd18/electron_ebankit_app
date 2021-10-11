import styled from 'styled-components'

export const AppContent = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: fixed;
`

export const Container = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`

export const Content = styled.div`
  display: flex;
  flex: 1;
  overflow: auto;
  background: ${props => props.theme.palette.background.default};
  flex-direction: row;
`

export const Body = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
`

export const ContentRoute = styled.div`
  display: flex;
  overflow: hidden;
  flex: 1;
  width: 100%;
  height: 100%;
`

export const LeftSection = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.palette.primary.main};
`;