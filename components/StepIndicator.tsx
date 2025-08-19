
import React from 'react';
import { Step } from '../types';

interface StepIndicatorProps {
  currentStep: Step;
}

const steps = [
  { id: Step.PersonalInfo, name: 'Personal Info' },
  { id: Step.AcademicInfo, name: 'Academics' },
  { id: Step.CourseSelection, name: 'Course' },
  { id: Step.Review, name: 'Review' },
  { id: Step.Payment, name: 'Payment' },
];

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {currentStep > step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-brand-primary" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center bg-brand-primary rounded-full"
                >
                  <svg className="h-5 w-5 text-white" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.052-.143z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="absolute mt-2 text-sm font-medium text-brand-primary">{step.name}</span>
              </>
            ) : currentStep === step.id ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center bg-white border-2 border-brand-primary rounded-full"
                  aria-current="step"
                >
                  <span className="h-2.5 w-2.5 bg-brand-primary rounded-full" aria-hidden="true" />
                </div>
                 <span className="absolute mt-2 text-sm font-medium text-brand-primary">{step.name}</span>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-gray-200" />
                </div>
                <div
                  className="group relative flex h-8 w-8 items-center justify-center bg-white border-2 border-gray-300 rounded-full"
                >
                   <span className="h-2.5 w-2.5 bg-transparent rounded-full" aria-hidden="true" />
                </div>
                <span className="absolute mt-2 text-sm font-medium text-gray-500">{step.name}</span>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;
