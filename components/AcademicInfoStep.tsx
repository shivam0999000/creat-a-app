
import React, { useState } from 'react';
import { FormData } from '../types';

interface Props {
  formData: FormData;
  onDataChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const AcademicInfoStep: React.FC<Props> = ({ formData, onDataChange, onNext, onBack }) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const validate = () => {
        const newErrors: { [key: string]: string } = {};
        if (!formData.highestQualification) newErrors.highestQualification = "Highest qualification is required.";
        if (!formData.institution) newErrors.institution = "Institution name is required.";
        if (!formData.yearOfCompletion) newErrors.yearOfCompletion = "Year of completion is required.";
        else if (!/^\d{4}$/.test(formData.yearOfCompletion) || parseInt(formData.yearOfCompletion, 10) > new Date().getFullYear()) {
            newErrors.yearOfCompletion = "Enter a valid 4-digit year.";
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onNext();
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onDataChange({ [e.target.name]: e.target.value });
    };

  return (
    <form onSubmit={handleNext}>
      <h2 className="text-2xl font-bold mb-6 text-brand-secondary">Academic Background</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="highestQualification" className="block text-sm font-medium text-gray-700">Highest Qualification</label>
          <input type="text" name="highestQualification" id="highestQualification" value={formData.highestQualification} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="e.g., High School Diploma, Bachelor's Degree" />
          {errors.highestQualification && <p className="text-red-500 text-xs mt-1">{errors.highestQualification}</p>}
        </div>
        <div>
          <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution Name</label>
          <input type="text" name="institution" id="institution" value={formData.institution} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" />
          {errors.institution && <p className="text-red-500 text-xs mt-1">{errors.institution}</p>}
        </div>
        <div className="md:col-span-1">
          <label htmlFor="yearOfCompletion" className="block text-sm font-medium text-gray-700">Year of Completion</label>
          <input type="text" name="yearOfCompletion" id="yearOfCompletion" value={formData.yearOfCompletion} onChange={handleChange} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm" placeholder="YYYY"/>
          {errors.yearOfCompletion && <p className="text-red-500 text-xs mt-1">{errors.yearOfCompletion}</p>}
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors">
          Back
        </button>
        <button type="submit" className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors">
          Next
        </button>
      </div>
    </form>
  );
};

export default AcademicInfoStep;
