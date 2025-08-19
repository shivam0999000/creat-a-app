
import React from 'react';
import { FormData } from '../types';
import { COURSES } from '../constants';

interface Props {
  formData: FormData;
  onDataChange: (data: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const CourseSelectionStep: React.FC<Props> = ({ formData, onDataChange, onNext, onBack }) => {
    const handleNext = () => {
        if (formData.courseId) {
            onNext();
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6 text-brand-secondary">Select Your Course</h2>
            <div className="space-y-4">
                {COURSES.map((course) => (
                    <div
                        key={course.id}
                        onClick={() => onDataChange({ courseId: course.id })}
                        className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                            formData.courseId === course.id
                                ? 'border-brand-primary bg-blue-50 ring-2 ring-brand-primary'
                                : 'border-gray-300 bg-white hover:border-brand-accent'
                        }`}
                    >
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center rounded-full bg-blue-100">
                                {course.icon}
                            </div>
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-brand-secondary">{course.name}</h3>
                                <p className="text-gray-600">{course.description}</p>
                                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                                    <span>Duration: {course.duration}</span>
                                    <span>&bull;</span>
                                    <span>Fee: ${course.fee.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="flex items-center h-full">
                                <div className={`h-5 w-5 rounded-full border-2 flex items-center justify-center ${formData.courseId === course.id ? 'border-brand-primary bg-brand-primary' : 'border-gray-400'}`}>
                                    {formData.courseId === course.id && <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex justify-between">
                <button type="button" onClick={onBack} className="bg-gray-200 text-gray-700 font-bold py-2 px-6 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors">
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={!formData.courseId}
                    className="bg-brand-primary text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-primary transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                    Review Application
                </button>
            </div>
        </div>
    );
};

export default CourseSelectionStep;
