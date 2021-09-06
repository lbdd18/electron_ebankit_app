import styled from "styled-components";

export const Container = styled.div`
`

export const HeaderContainer = styled.div`
  display: flex;
  flex: 1;
  height: 60px;
  align-items: center;
  margin-left: 20px;
`

export const ButtonHeader = styled.button`
  height: 40px;
  width: 40px;
  border: 0;
  color: ${({ theme }) => theme.colors.onBackground};
  background-color: ${({ theme }) => theme.colors.background};
`

export const LogoHeader = styled.img`
  height: 70%;
  margin-right: 16px;
  color: ${({ theme }) => theme.colors.onBackground};
  background-color: ${({ theme }) => theme.colors.background};
`