
import React from 'react';
import { FormData, Course } from '../types';
import LoadingSpinner from './LoadingSpinner';

interface Props {
  formData: FormData;
  selectedCourse: Course | null;
  geminiResponse: string;
  isGenerating: boolean;
  onNext: () => void;
  onBack: () => void;
}

const DetailItem: React.FC<{ label: string; value?: string | number | null }> = ({ label, value }) => (
  <div>
    <h4 className="text-sm font-medium text-gray-500">{label}</h4>
    <p className="mt-1 text-base text-brand-secondary">{value || 'N/A'}</p>
  </div>
);


const ReviewStep: React.FC<Props> = ({ formData, selectedCourse, geminiResponse, isGenerating, onNext, onBack }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-brand-secondary">Review Your Application</h2>
      <div className="space-y-8">
        
        {/* AI Welcome Message */}
        <div className="bg-blue-50 border-l-4 border-brand-accent p-6 rounded-r-lg">
          <h3 className="text-lg font-semibold text-brand-secondary mb-3">A Message For You</h3>
          {isGenerating && (
            <div className="flex items-center space-x-3 text-gray-600">
              <LoadingSpinner size={5} />
              <span>Generating your personalized welcome...</span>
            </div>
          )}
          {!isGenerating && geminiResponse && (
            <div className="text-gray-700 space-y-3 prose">
              {geminiResponse.split('\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          )}
        </div>

        {/* Application Details */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-brand-secondary border-b pb-3 mb-4">Application Details</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <DetailItem label="Full Name" value={formData.fullName} />
            <DetailItem label="Email Address" value={formData.email} />
            <DetailItem label="Phone Number" value={formData.phone} />
            <DetailItem label="Address" value={formData.address} />
            <DetailItem label="Highest Qualification" value={formData.highestQualification} />
            <DetailItem label="Institution" value={formData.institution} />
            <DetailItem label="Year of Completion" value={formData.yearOfCompletion} />
            <DetailItem label="Selected Course" value={selectedCourse?.name} />
            <DetailItem label="Course Duration" value={selectedCourse?.duration} />
            <DetailItem label="Application Fee" value={`$${selectedCourse?.fee.toLocaleString()}`} />
          </div>
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors">
          Back
        </button>
        <button type="button" onClick={onNext} disabled={isGenerating} className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:bg-gray-400">
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default ReviewStep;
