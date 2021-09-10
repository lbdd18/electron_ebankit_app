import styled, { css } from 'styled-components'

export const Container = styled.header`
  width: 100%;
  background-color: ${props => props.theme.palette.primary.dark};
  min-height: 40px;
  position: relative;
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: center;
  strong {
    font-size: 13px;
    font-weight: 400;
    color: ${props => props.theme.palette.common.white};
  }
`

interface WindowActionsProps {
  position: 'left' | 'right'
  shouldShowIconsOnHover?: boolean
}

export const WindowActions = styled.div<WindowActionsProps>`
  position: absolute;
  top: 0;
  height: 100%;
  display: flex;
  align-items: center;
  ${props =>
    props.position === 'left'
      ? css`
          left: 20px;
        `
      : css`
          right: 20px;
        `};
  ${props =>
    props.shouldShowIconsOnHover &&
    css`
      &:hover svg {
        display: block;
      }
    `}
`

interface MacActionButtonProps {
  color: 'close' | 'minimize' | 'maximize'
}

const colors = {
  close: '#E96379',
  minimize: '#e7de79',
  maximize: '#67e480'
}

export const MacActionButton = styled.button<MacActionButtonProps>`
  background: ${props => colors[props.color]};
  -webkit-app-region: no-drag;
  border: 0;
  width: 12px;
  height: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  & + button {
    margin-left: 8px;
  }
  svg {
    width: 8px;
    height: 8px;
    opacity: 0.9;
    display: none;
  }
  &:hover svg {
    display: block;
  }
  &:active {
    opacity: 0.6;
  }
  &:focus {
    outline: 0;
  }
`

export const DefaultActionButton = styled.button`
  background: transparent;
  -webkit-app-region: no-drag;
  border: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${props => props.theme.palette.common.white};
  & + button {
    margin-left: 12px;
  }
  &:hover svg {
    color: ${props => props.theme.palette.grey.A100};
  }
  &:active {
    opacity: 0.6;
  }
  &:focus {
    outline: 0;
  }
`