
import React from 'react';
import { FormData, Course } from '../types';

interface Props {
  formData: FormData;
  selectedCourse: Course | null;
}

const ConfirmationStep: React.FC<Props> = ({ formData, selectedCourse }) => {
  return (
    <div className="text-center py-10 px-6">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
        <svg className="h-6 w-6 text-brand-success" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      </div>
      <h2 className="mt-4 text-3xl font-bold tracking-tight text-brand-secondary">Application Submitted!</h2>
      <p className="mt-2 text-lg leading-8 text-gray-600">
        Congratulations, {formData.fullName}! Your application for the {selectedCourse?.name} program has been received.
      </p>
      <div className="mt-8 text-left max-w-md mx-auto bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-brand-secondary border-b pb-2 mb-4">Summary</h3>
        <p className="text-sm text-gray-600"><span className="font-semibold">Confirmation Email:</span> Sent to {formData.email}</p>
        <p className="text-sm text-gray-600 mt-2"><span className="font-semibold">Next Steps:</span> Our admissions team will review your application and be in touch within 5-7 business days.</p>
      </div>
      <div className="mt-10">
        <button
          onClick={() => window.location.reload()}
          className="rounded-md bg-brand-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Start New Application
        </button>
      </div>
    </div>
  );
};

export default ConfirmationStep;
