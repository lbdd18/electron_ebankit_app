import { TextFieldProps } from '@material-ui/core';

import { InputContainer } from './styles'

export function Input (props: TextFieldProps) {
  return <InputContainer variant="outlined"  {...props} />
}
