
import React, { useState, useCallback } from 'react';
import { FormData, Course, Step } from './types';
import { generateCourseWelcome } from './services/geminiService';
import { COURSES } from './constants';

import StepIndicator from './components/StepIndicator';
import PersonalInfoStep from './components/PersonalInfoStep';
import AcademicInfoStep from './components/AcademicInfoStep';
import CourseSelectionStep from './components/CourseSelectionStep';
import ReviewStep from './components/ReviewStep';
import PaymentStep from './components/PaymentStep';
import ConfirmationStep from './components/ConfirmationStep';
import Header from './components/Header';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>(Step.PersonalInfo);
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    highestQualification: '',
    institution: '',
    yearOfCompletion: '',
    courseId: null,
  });
  const [geminiResponse, setGeminiResponse] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const nextStep = useCallback(async () => {
    if (currentStep === Step.CourseSelection) {
      setIsGenerating(true);
      setGeminiResponse('');
      try {
        const selectedCourse = COURSES.find(c => c.id === formData.courseId);
        if (selectedCourse) {
          const response = await generateCourseWelcome(formData.fullName, selectedCourse.name);
          setGeminiResponse(response);
        }
      } catch (error) {
        console.error("Error generating welcome message:", error);
        setGeminiResponse("We couldn't generate a personalized welcome message at this time, but we're excited to have you review your application!");
      } finally {
        setIsGenerating(false);
      }
    }
    
    if (currentStep < Step.Confirmation) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep, formData.courseId, formData.fullName]);

  const prevStep = () => {
    if (currentStep > Step.PersonalInfo) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handlePayment = async () => {
    setPaymentStatus('processing');
    await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate API call
    setPaymentStatus('success');
    setCurrentStep(Step.Confirmation);
  };
  
  const selectedCourse = COURSES.find(c => c.id === formData.courseId) || null;

  const renderStep = () => {
    switch (currentStep) {
      case Step.PersonalInfo:
        return <PersonalInfoStep formData={formData} onDataChange={handleFormDataChange} onNext={nextStep} />;
      case Step.AcademicInfo:
        return <AcademicInfoStep formData={formData} onDataChange={handleFormDataChange} onNext={nextStep} onBack={prevStep} />;
      case Step.CourseSelection:
        return <CourseSelectionStep formData={formData} onDataChange={handleFormDataChange} onNext={nextStep} onBack={prevStep} />;
      case Step.Review:
        return <ReviewStep formData={formData} selectedCourse={selectedCourse} geminiResponse={geminiResponse} isGenerating={isGenerating} onNext={nextStep} onBack={prevStep} />;
      case Step.Payment:
        return <PaymentStep selectedCourse={selectedCourse} onPayment={handlePayment} status={paymentStatus} onBack={prevStep} />;
      case Step.Confirmation:
        return <ConfirmationStep formData={formData} selectedCourse={selectedCourse} />;
      default:
        return <PersonalInfoStep formData={formData} onDataChange={handleFormDataChange} onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-brand-secondary">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10 border border-gray-100">
          {currentStep !== Step.Confirmation && (
            <div className="mb-10">
              <StepIndicator currentStep={currentStep} />
            </div>
          )}
          {renderStep()}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} EduForm AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
