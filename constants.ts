
import React from 'react';
import { Course } from './types';

const ComputerIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-brand-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" })
    )
);

const BusinessIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-brand-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" })
    )
);

const DesignIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-brand-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" })
    )
);

const HealthIcon = () => (
    React.createElement('svg', { xmlns: "http://www.w3.org/2000/svg", className: "h-8 w-8 text-brand-primary", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
        React.createElement('path', { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" })
    )
);


export const COURSES: Course[] = [
  {
    id: 1,
    name: 'B.Sc. in Computer Science',
    description: 'Dive deep into algorithms, data structures, and software engineering principles.',
    duration: '4 Years',
    fee: 12000,
    icon: React.createElement(ComputerIcon),
  },
  {
    id: 2,
    name: 'BBA in Marketing',
    description: 'Learn the strategies to build brands and capture market share in a digital world.',
    duration: '3 Years',
    fee: 9500,
    icon: React.createElement(BusinessIcon),
  },
  {
    id: 3,
    name: 'MFA in Graphic Design',
    description: 'Master visual communication and digital artistry with our advanced design program.',
    duration: '2 Years',
    fee: 15000,
    icon: React.createElement(DesignIcon),
  },
    {
    id: 4,
    name: 'Diploma in Health Sciences',
    description: 'A foundational program for aspiring healthcare professionals, covering biology and patient care.',
    duration: '2 Years',
    fee: 8000,
    icon: React.createElement(HealthIcon),
  },
];
