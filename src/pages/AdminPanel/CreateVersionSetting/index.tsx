import { useState, FormEvent } from 'react';
import { Box, MenuItem, TextField } from '@material-ui/core'

import { useMenus } from '../../../hooks/useMenus';

import { Button } from '../../../components/Button';
import { Container} from './styles';
import { useVersionSettings } from '../../../hooks/useVersionSettings';

interface CreateVersionSettingProps {
  onRequestClose: () => void;
}

export function CreateVersionSetting({ onRequestClose }: CreateVersionSettingProps) {
    const { createVersionSetting } = useVersionSettings()

    const [version, setVersion] = useState('');

    async function handleCreateNewVersionSetting(event: FormEvent) {
        event.preventDefault();
        await createVersionSetting({ version, isEnabled: true});
        setVersion('');
        onRequestClose();
    }
  
    return (
      <Container onSubmit={handleCreateNewVersionSetting}>
          <h2>New Version Setting</h2>
          <Box paddingBottom={2}>
            <TextField fullWidth variant='outlined' label='Version' value={version} onChange={event => setVersion(event.target.value)} />
          </Box>
          <Button type="submit" variant='contained' color='primary'>Add</Button>
      </Container>
    )
}
 
