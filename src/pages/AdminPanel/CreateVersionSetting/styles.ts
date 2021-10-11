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