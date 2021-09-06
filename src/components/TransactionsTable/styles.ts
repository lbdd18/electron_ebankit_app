import styled from "styled-components";

export const Container = styled.div`
  table {
    width: 100%;
    border-spacing: 0 0.5rem;

    th {
      color: ${({ theme }) => theme.colors.onBackground};
      font-weight: 400;
      padding: 1rem 2rem;
      text-align: left;
      line-height: 1.5rem;
    }

    td {
      padding: 1rem 2rem;
      border: 0;
      background: ${({ theme }) => theme.colors.background};
      color: ${({ theme }) => theme.colors.onBackground};
      border-radius: 0.25rem;

      &:first-child {
        color: ${({ theme }) => theme.colors.onBackground};
      }

      button {
        background: ${({ theme }) => theme.colors.secondary};
        padding: 4px;
        margin-right: 8px;
        border-width: 0.1rem;
        border-color: ${({ theme }) => theme.colors.onBackground};
        border-radius: 0.25rem;

        color: ${({ theme }) => theme.colors.onSecondary};
        font-weight: 400;

        cursor: pointer;
      }
    }
  }
`