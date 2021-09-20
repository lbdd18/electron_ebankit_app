import styled from "styled-components";

export const Container = styled.form`
  h2 {
    color: ${props => props.theme.palette.text.primary};
    font-size: 1.5rem;
    margin-bottom: 2rem;
  }


  button[type="submit"]{
    width: 100%;
    padding: 0 1.5rem;
    height: 4rem;
    background: ${props => props.theme.palette.primary};
    color: ${props => props.theme.palette.onPrimary};
    border-radius: 0.25rem;
    border: 0;
    font-weight: 600;
    font-size: 1rem;
    margin-top: 1.5rem;

    transition: filter 0.2s;

    &:hover {
      filter: brightness(0.9);
    }
  }
`

export const TransactionTypeContainer = styled.div`
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
`
export const Select = styled.select`
  width: 100%;
  padding: 0 1.5rem;
  height: 4rem;
  border-radius: 0.25rem;

  border: 1px solid #d7d7d7;
  background: #e7e9ee;
  font-size: 1rem;
  margin-top: 1.5rem;

  option {
    color: black;
    background: #e7e9ee;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;