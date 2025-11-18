import ActiveStep from '../../../assets/stepper/ActiveStep.svg';
import InActiveStep from '../../../assets/stepper/InActiveStep.svg';

interface StepperProps {
  steps: {
    id: string;
    label?: string;
    component?: React.ReactNode;
  }[];
  activeStep: number;
  onStepClick?: (stepIndex: number) => void;
}

const Stepper = ({ steps, activeStep, onStepClick }: StepperProps) => {
  return (
    <div className="flex items-center gap-2">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => onStepClick && onStepClick(index)}
        >
          <img
            className="w-3.5 h-5"
            src={index === activeStep ? ActiveStep : InActiveStep}
            alt="step"
          />
        </div>
      ))}
    </div>
  );
};

export default Stepper;
