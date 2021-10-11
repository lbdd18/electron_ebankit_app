import { useState, FormEvent } from 'react';
import { Box, MenuItem, TextField } from '@material-ui/core'

import { useMenus } from '../../../hooks/useMenus';

import { Button } from '../../../components/Button';
import { Container} from './styles';

interface CreateMenuProps {
  onRequestClose: () => void;
}

export function CreateMenu({ onRequestClose }: CreateMenuProps) {
    const { createMenu } = useMenus()

    const [name, setName] = useState('');
    const [application, setApplication] = useState('');

    async function handleCreateNewMenu(event: FormEvent) {
        event.preventDefault();
        await createMenu({ name, application:{id: application} });
        setName('');
        setApplication('');
        onRequestClose();
    }
  
    return (
      <Container onSubmit={handleCreateNewMenu}>
          <h2>New Menu</h2>
          <Box paddingBottom={2}>
            <TextField fullWidth variant='outlined' label='Name' value={name} onChange={event => setName(event.target.value)} />
          </Box>
          <Box>
            <TextField fullWidth={true} variant="outlined" name="application" type="text" label="Application" select={true} onChange={event => setApplication(event.target.value)}>
              <MenuItem value="15d49ca4-7f8f-4607-93b6-9b427e848e4b">IB</MenuItem>
              <MenuItem value="bcb9f215-d5ad-447b-8750-e68c2eaa28e2">IOS</MenuItem>
              <MenuItem value="669306a2-a360-4458-8fb8-46300f7fe830">Android</MenuItem>
            </TextField>
          </Box>
          <Button type="submit" variant='contained' color='primary'>Add</Button>
      </Container>
    )
}
 
