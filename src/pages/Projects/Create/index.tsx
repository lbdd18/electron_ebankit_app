import { useState } from 'react';
import * as fs from 'fs';
import * as cmd from 'child_process';
import MultiStep from 'react-multistep'

import { Container} from './styles'
import { Button } from '../../../components/Button';

export function CreateProject() {
  
  const [name, setName] = useState('');

  function handleGenerateFile() {
    fs.writeFile('c://temp//file.txt', "myfiledata", (err) => {
      if (err) throw err;
      console.log('File saved!');
    });
  }

  function handleRunCommand() {
    cmd.exec("mkdir \"C:\\temp\\newTemp\"", (error, stdout, stderr) => {
      
      if (error) throw error;
      console.log('CMD executed!');
    });
  }

  const steps = [
    {name: 'StepOne', component: (
    <div>
      <label>Project Details</label>
      <br/>
      <input placeholder="Name" value={name} onChange={event => setName(event.target.value)} />
      <br/>
      <input placeholder="Alias" value={name} onChange={event => setName(event.target.value)} />
      <br/>
      <input placeholder="Description" value={name} onChange={event => setName(event.target.value)} />
    </div>)},
    {name: 'StepTwo', component: (
      <div>
        <label>SQL Environment</label>
        <br/>
        <input placeholder="Instance name" value={name} onChange={event => setName(event.target.value)} />
        <br/>
        <input placeholder="Password" value={name} onChange={event => setName(event.target.value)} />
      </div>)},
    {name: 'StepThree', component: (
      <div>
        <label>Version Control</label>
        <br/>
        <input placeholder="GIT Repository" value={name} onChange={event => setName(event.target.value)} />
      </div>)},
    {name: 'StepFour', component: (
      <div>
        <label>Project Options</label>
        <br/>
        <input placeholder="Is Marketplace" value={name} onChange={event => setName(event.target.value)} />
      </div>)}
  ];

  const prevStyle = { background: '#33c3f0' }
  const nextStyle = { background: '#33c3f0' }

  return (
    <Container>
      <form>
        <MultiStep showNavigation={true} steps={steps} prevStyle={prevStyle} nextStyle={nextStyle}  />
      </form>
      <Button onClick={handleGenerateFile}>Test Generate File</Button>
      <Button onClick={handleRunCommand}>Test Run Command</Button>
    </Container>
  )
}
 
