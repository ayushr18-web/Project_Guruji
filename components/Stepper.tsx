import * as React from 'react';
import Box from '@mui/material/Box';
import MuiStepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { StepConnector, stepConnectorClasses } from '@mui/material';
import { styled } from '@mui/material/styles';

interface StepperProps {
  activeStep: number;
  steps: string[];
}

// Custom Step Connector
const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7B3F00',
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#7B3F00',
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.grey[300],
    borderTopWidth: 2,
    borderRadius: 1,
  },
}));

const Stepper: React.FC<StepperProps> = ({ activeStep, steps }) => {
  return (
    <Box sx={{ width: '100%' }}>
      <MuiStepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
        sx={{
          '& .MuiStepIcon-root.Mui-active': {
            color: '#7B3F00',
          },
          '& .MuiStepIcon-root.Mui-completed': {
            color: '#7B3F00',
          },
        }}
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </MuiStepper>
    </Box>
  );
};

export default Stepper;
