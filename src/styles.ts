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
  flex: 1;
  display: flex;
  background: ${({ theme }) => theme.colors.surface};
  flex-direction: column;
`

export const Body = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`