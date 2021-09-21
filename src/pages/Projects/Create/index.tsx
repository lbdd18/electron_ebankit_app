import React, { useState, FormEvent } from 'react';

import {Box, Stepper, Step, StepLabel, Grid, CircularProgress, MenuItem, FormControlLabel, Radio} from '@material-ui/core'
import {Field, Form, Formik, FormikConfig, FormikValues} from 'formik'
import {TextField, RadioGroup} from 'formik-material-ui'
import { useHistory } from "react-router-dom";
import { object, string} from 'yup'
import { api } from "../../../services/api"

import { Container} from './styles'
import { Button } from '../../../components/Button';
import { useSnackbar } from 'notistack';

interface Environment {
  id: number;
  name: string;
  instance: string;
  sqlUser: string;
  sqlPassword: string;
}

export function CreateProject() {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  const handleSubmit = async (values, actions) => {
    const projectInput = {
      id: '',
      name: values.name,
      template: values.template,
      version: values.version,
      description: values.description,
      alias: values.alias,
      author: values.author,
      customer: values.customer,
      instance: values.instance,
      sqlUser: values.user,
      sqlPassword: values.password
    }

    try {
      console.log(projectInput);
      const responseEnvironment = await api.post('environment', { 
        Name: `DEV-${projectInput.alias}`,
	      DataSource: projectInput.instance,
	      SQLUser: projectInput.sqlUser,
	      SQLPassword: projectInput.sqlPassword,
        DatabasePrefix: projectInput.alias
      });

      const environment : Environment = responseEnvironment.data;

      const response = await api.post('project', { 
        Name: projectInput.name,
	      Description: projectInput.description,
	      Alias: projectInput.alias,
	      Author: projectInput.author,
	      Customer: projectInput.customer,
	      StartProjectDate: new Date(),
	      BaselineProjectDate: new Date(),
	      TemplateID: projectInput.template,
	      EnvironmentID: environment.id,
	      VersionControlID: 'c6eeaecb-9162-4ded-aa91-ec9dde810a00',
	      VersionSettingID: projectInput.version
      });

      // const project = response.data;
      history.push("/projects");
      enqueueSnackbar('Project created successfully!', { variant:'success', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    } catch (error) {
      enqueueSnackbar('Project not created!', { variant:'error', anchorOrigin:{vertical: 'bottom', horizontal: 'right',} });
    }
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
          onSubmit={handleSubmit}
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
                  <MenuItem value="cff6fb27-eb72-41fe-8c69-9536f41ecc15">Ebankit</MenuItem>
                </Field>
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="version" component={TextField} type="text" label="Version" select={true}>
                    <MenuItem value="921019c1-43f3-4c12-9757-b7fc719556d3">6.2.0</MenuItem>
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
