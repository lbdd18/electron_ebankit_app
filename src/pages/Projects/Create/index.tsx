import React, { useState, FormEvent } from 'react';

import {Box, Stepper, Step, StepLabel, Grid, CircularProgress, MenuItem, FormControlLabel, Radio, FormLabel, RadioGroup, Typography} from '@material-ui/core'
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';
import {Field, Form, Formik, FormikConfig, FormikHelpers, FormikValues} from 'formik'
import {Switch, TextField} from 'formik-material-ui'
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

  const handleSubmit = async (values: FormikValues) => {
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
            startprojectDate: new Date(),
            baselineprojectDate: new Date(),
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
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field fullWidth={true} variant="outlined" name="name" component={TextField} label="Name"/>
                    </Grid>
                    <Grid item xs={6}>                   
                      <Field fullWidth={true} variant="outlined" name="alias" component={TextField} label="Alias"/>
                    </Grid>
                  </Grid>  
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field fullWidth={true} variant="outlined" name="template" component={TextField} type="text" label="Template" select={true}>
                        <MenuItem value="cff6fb27-eb72-41fe-8c69-9536f41ecc15">Ebankit</MenuItem>
                      </Field>
                    </Grid>
                    <Grid item xs={6}>
                      <Field fullWidth={true} variant="outlined" name="version" component={TextField} type="text" label="Version" select={true}>
                        <MenuItem value="921019c1-43f3-4c12-9757-b7fc719556d3">6.2.0</MenuItem>
                      </Field>  
                    </Grid>
                  </Grid>  
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="description" component={TextField} label="Description"/>
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field fullWidth={true} variant="outlined" name="author" component={TextField} label="Author"/>
                    </Grid>
                    <Grid item xs={6}>                   
                      <Field fullWidth={true} variant="outlined" name="customer" component={TextField} label="Customer"/>
                    </Grid>
                  </Grid>  
                </Box>
                <Box paddingBottom={2} >
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>  
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field component={FormikDatePicker} name="startprojectDate" nameDate="startprojectDate" label="Start Date"/>                                       
                      </Grid>
                      <Grid item xs={6}>                   
                        <Field component={FormikDatePicker} name="baselineprojectDate" nameDate="baselineprojectDate" label="Baseline Date"/>                   
                      </Grid>
                    </Grid>                
                  </MuiPickersUtilsProvider>
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
                <Box paddingBottom={2}>
                  <RadioGroup row aria-label="Source Control" defaultValue="none">
                    <FormControlLabel value="none" color="primary" control={<Radio color="primary" />} label={<Typography color="textPrimary">None</Typography>} />
                    <FormControlLabel value="tfs" control={<Radio color="primary" />} label={<Typography color="textPrimary">TFS</Typography>} />
                    <FormControlLabel value="git" control={<Radio color="primary" />} label={<Typography color="textPrimary">GIT</Typography>} />
                  </RadioGroup>
                </Box>
              </FormikStep>
              <FormikStep label="Configurations">
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="logintype" type="text" defaultValue="single-step" component={TextField} label="Login Type" select={true}>
                        <MenuItem value="single-step">Single-step</MenuItem>
                        <MenuItem value="mult-step">Multi-step</MenuItem>
                      </Field>  
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="createbackofficeprocess" type="text" defaultValue="no" component={TextField} label="Create backoffice process" select={true}>
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Field> 
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="autoapproveprocess" type="text" defaultValue="no" component={TextField} label="Auto-approve process" select={true}>
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Field> 
                    </Grid>
                  </Grid>
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="securityquestionlogin" type="text" defaultValue="no" component={TextField} label="Security question login" select={true}>
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Field> 
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="securityquestionpasswordrecovery" type="text" defaultValue="no" component={TextField} label="Security question password recovery" select={true}>
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Field> 
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="securityimages" type="text" defaultValue="no" component={TextField} label="Security images" select={true}>
                        <MenuItem value="no">No</MenuItem>
                        <MenuItem value="yes">Yes</MenuItem>
                      </Field> 
                    </Grid>
                  </Grid>
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailserver" defaultValue="outlook.office365.com" type="text" component={TextField} label="Mail server"/>
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailserverport" defaultValue="25" type="text" component={TextField} label="Mail server port"/>
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailfrom" defaultValue="notifies@ebankit.com" type="text" component={TextField} label="Mail from"/>
                    </Grid>
                  </Grid>
                </Box>
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailuser" defaultValue="notifies@ebankit.com" type="text" component={TextField} label="Mail user"/>
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailpassword" type="password" component={TextField} label="Mail password"/>
                    </Grid>
                    <Grid item xs={4}>
                      <Field fullWidth={true} variant="outlined" name="mailuserdomain" type="text" component={TextField} label="Mail user domain"/>
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep label="Options">
                <Box paddingBottom={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={2}>
                      <Typography color="textPrimary">Marketplace</Typography>
                      <Field name="marketplace" color="primary" component={Switch} defaultValue={true} />  
                    </Grid>
                    <Grid item xs={2}>
                      <Typography color="textPrimary">Transactional menus</Typography>
                      <Field name="transactionalmenus" color="primary" component={Switch} defaultValue={true} />
                    </Grid>
                  </Grid>
                  
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="regionsettings" type="text" defaultValue="pt" component={TextField} label="Region settings" select={true}>
                    <MenuItem value="pt">PT</MenuItem>
                    <MenuItem value="en">EN</MenuItem>
                  </Field> 
                </Box>
                <Box paddingBottom={2}>
                  <Field fullWidth={true} variant="outlined" name="defaultlanguage" type="text" defaultValue="pt" component={TextField} label="Default language" select={true}>
                    <MenuItem value="pt">PT</MenuItem>
                    <MenuItem value="en">EN</MenuItem>
                  </Field> 
                </Box>
              </FormikStep>
          </FormikStepper>
    </Container>
  )
}

const FormikDatePicker = ({
  nameDate,
  label,
  form: { setFieldValue },
  field: { value },
  ...rest
}: any) => {
  // console.log(rest);
  return (
    <KeyboardDatePicker
      name={nameDate}
      clearable
      fullWidth
      autoOk
      variant="inline" 
      disablePast 
      inputVariant="outlined" 
      format="dd/MM/yyyy"
      label={label}
      onChange={value => {
        console.log(nameDate);
        setFieldValue(nameDate, value);
      }}
      value={value}
      animateYearScrolling={false}
    />
  );
};

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

  const handleSubmit = async (values: FormikValues, helpers: FormikHelpers<FormikValues>) => {
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
