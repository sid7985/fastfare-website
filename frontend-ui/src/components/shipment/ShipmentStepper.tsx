import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: number;
  name: string;
  description: string;
}

interface ShipmentStepperProps {
  steps: Step[];
  currentStep: number;
}

const ShipmentStepper = ({ steps, currentStep }: ShipmentStepperProps) => {
  return (
    <nav aria-label="Progress" className="mb-8">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li
            key={step.name}
            className={cn(
              stepIdx !== steps.length - 1 ? "flex-1" : "",
              "relative"
            )}
          >
            {step.id < currentStep ? (
              // Completed step
              <div className="group flex items-center">
                <span className="flex items-center">
                  <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-primary">
                    <Check className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <span className="ml-3 hidden md:block">
                    <span className="text-sm font-medium text-primary">
                      {step.name}
                    </span>
                    <span className="text-xs text-muted-foreground block">
                      {step.description}
                    </span>
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 flex-1 h-0.5 bg-primary" />
                )}
              </div>
            ) : step.id === currentStep ? (
              // Current step
              <div className="flex items-center" aria-current="step">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary bg-background">
                  <span className="text-sm font-semibold text-primary">
                    {step.id}
                  </span>
                </span>
                <span className="ml-3 hidden md:block">
                  <span className="text-sm font-medium text-foreground">
                    {step.name}
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    {step.description}
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 flex-1 h-0.5 bg-border" />
                )}
              </div>
            ) : (
              // Upcoming step
              <div className="group flex items-center">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-muted bg-background">
                  <span className="text-sm text-muted-foreground">{step.id}</span>
                </span>
                <span className="ml-3 hidden md:block">
                  <span className="text-sm text-muted-foreground">
                    {step.name}
                  </span>
                  <span className="text-xs text-muted-foreground block">
                    {step.description}
                  </span>
                </span>
                {stepIdx !== steps.length - 1 && (
                  <div className="ml-4 flex-1 h-0.5 bg-border" />
                )}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default ShipmentStepper;
