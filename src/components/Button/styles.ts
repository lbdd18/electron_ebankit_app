import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.button`
  height: 42px;
  padding: 0 24px;
  
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.primary};
  border-radius: 8px;
  border: 0;

  color: ${({ theme }) => theme.colors.onPrimary};
  font-size: 16px;
  font-weight: bold;

  &:hover {
    filter: brightness(0.9);
  }

  &:active {
    filter: brightness(0.7);
  }

  Link {

  }
`
