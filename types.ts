
export interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  highestQualification: string;
  institution: string;
  yearOfCompletion: string;
  courseId: number | null;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  fee: number;
  icon: React.ReactNode;
}

export enum Step {
  PersonalInfo = 1,
  AcademicInfo,
  CourseSelection,
  Review,
  Payment,
  Confirmation,
}
