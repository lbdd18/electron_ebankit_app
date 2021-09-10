import React, { useState } from 'react';
import * as fs from 'fs';
import * as cmd from 'child_process';

import {Box, Stepper, Step, StepLabel, Grid, CircularProgress, MenuItem, FormControlLabel, Radio} from '@material-ui/core'
import {Field, Form, Formik, FormikConfig, FormikValues} from 'formik'
import {TextField, RadioGroup} from 'formik-material-ui'
import { object, string} from 'yup'

import { Container} from './styles'
import { Button } from '../../../components/Button';

const sleep = (time) => new Promise((acc)=> setTimeout(acc, time));

export function CreateProject() {

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

  return (
    <Container>
            <FormikStepper 
          initialValues={{
            name:'',
            template:'',
            version: '',
            description: '',
            alias: '',
            author: '',
            customer: '',
            instance: '',
            user: '',
            password: ''
          }} 
          onSubmit={async(values)=> {
            await sleep(3000);
            console.log('values', values);
          }}
        >
              <FormikStep label="Details"
                validationSchema={object({
                  name: string().required(),
                  template: string().required(),
                  version: string().required(),
                  description: string().required(),
                  alias: string().required(),
                  author: string().required(),
                  customer: string().required()
              })}>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="name" component={TextField} label="Name"/>
                </Box>
                <Box paddingBottom={2}>
                <Field fullWidth={true} variant="outlined" name="template" component={TextField} type="text" label="Template" select={true}>
                  <MenuItem value="ebankit">Ebankit</MenuItem>
                </Field>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="version" component={TextField} type="text" label="Version" select={true}>
                    <MenuItem value="1">6.2.0</MenuItem>
                  </Field>                
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="description" component={TextField} label="Description"/>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="alias" component={TextField} label="Alias"/>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="author" component={TextField} label="Author"/>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="customer" component={TextField} label="Customer"/>
                </Box>
              </FormikStep>
              <FormikStep label="Database Instance"
                validationSchema={object({
                  instance: string().required(),
                  user: string().required(),
                  password: string().required()
              })}>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="instance" type="text" component={TextField} label="Instance"/>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="user" type="text" component={TextField} label="User"/>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="password" type="password" component={TextField} label="Password"/>
                </Box>
              </FormikStep>
              <FormikStep label="Version Control">
                {/* <Box paddingBottom={2}>
                  <InputLabel>Version Control</InputLabel>
                  <Field component={Switch} type="checkbox" name="switch" />
                </Box> */}
                <Box >
                  <Field component={RadioGroup} name="activity">
                    <FormControlLabel
                      value="none"
                      control={<Radio />}
                      label="None"
                    />
                    <FormControlLabel
                      value="tfs"
                      control={<Radio  />}
                      label="TFS"
                    />
                    <FormControlLabel
                      value="git"
                      control={<Radio  />}
                      label="GIT"
                    />
                  </Field>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="repository" component={TextField} label="Repository"/>
                </Box>
              </FormikStep>
              <FormikStep label="Configurations">
                <Box paddingBottom={2}>
                  <Field fullWidth={true} name="description" component={TextField} label="Description"/>
                </Box>
              </FormikStep>
              <FormikStep label="Options">
                <Box paddingBottom={2}>
                  <Field fullWidth={true} name="description" component={TextField} label="Description"/>
                </Box>
              </FormikStep>
          </FormikStepper>
    </Container>
  )
}

export interface FormikStepProps extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'>{
  label: string;
}

export function FormikStep({children}: FormikStepProps){
  return (<>{children}</>)
}


export function FormikStepper({children, ...props}: FormikConfig<FormikValues>) {
  const childrenArray = React.Children.toArray(children) as React.ReactElement<FormikStepProps>[];
  const [step,setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length -1;
  }

  const handleSubmit = async (values, helpers) => {
    if(isLastStep()){
      await props.onSubmit(values, helpers);
      setCompleted(true);
    }
    else{
      setStep(s=> s+1);
    }
  };
  
  return (
    <Formik 
    {...props} 
    validationSchema={currentChild.props.validationSchema}
    onSubmit={handleSubmit}>
      {({isSubmitting}) => (
      <Form autoComplete="off">
        <Stepper alternativeLabel activeStep={step}>
          {childrenArray.map((child, index)=>(
            <Step key={child.props.label} completed={step > index || completed}>
              <StepLabel>{child.props.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box height="750px" paddingTop={2}>
          {currentChild}
          <Grid container spacing={2}>
            {step>0 ? (
              <Grid item>
                <Button disabled={isSubmitting} variant="contained" color="primary" onClick={() => setStep(s=> s-1)}>Back</Button>
              </Grid>
           ) : null}
            <Grid item>
              <Button startIcon={isSubmitting ? <CircularProgress size="1rem"/> : null} disabled={isSubmitting} variant="contained" color="primary" type="submit">
                {isSubmitting ? 'Submiting' : isLastStep() ? 'Submit' : 'Next'}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Form>
      )}
    </Formik>
  )
}
