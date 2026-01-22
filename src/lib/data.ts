
import { PlaceHolderImages } from "./placeholder-images";
import { startOfWeek, addDays, format as formatDate } from 'date-fns';

export type Profile = {
  id: string;
  name: string;
  initials: string;
  isCurrentUser: boolean;
  avatarId?: string;
};

export const profiles: Profile[] = [
  { id: '1', name: 'John Doe', initials: 'JD', isCurrentUser: true, avatarId: 'user-avatar' },
  { id: '2', name: 'Jane Doe', initials: 'JD', isCurrentUser: false, avatarId: 'testimonial-1' },
  { id: '3', name: 'Peter Pan', initials: 'PP', isCurrentUser: false, avatarId: 'testimonial-2' },
];


export type Service = {
    id: string;
    name: string;
    description: string;
}

export const services: Service[] = [
    {
        id: '1',
        name: 'Teleconsultation',
        description: 'Connect with your doctor from the comfort of your home.'
    },
    {
        id: '2',
        name: 'In-Person Visit',
        description: 'Visit your doctor in person for a check-up or consultation.'
    },
    {
        id: '3',
        name: 'Prescription Renewal',
        description: 'Renew your prescriptions online without needing a full appointment.'
    },
    {
        id: '4',
        name: 'Lab Test Results',
        description: 'View and discuss your lab test results with your doctor.'
    },
    {
        id: '5',
        name: 'Mental Health Counseling',
        description: 'Speak with a licensed therapist or counselor.'
    },
    {
        id: '6',
        name: 'Nutrition Advice',
        description: 'Get personalized nutrition plans from a registered dietitian.'
    },
    {
        id: '7',
        name: 'Emergency Services',
        description: '24/7 emergency medical care.'
    },
    {
        id: '8',
        name: 'Surgical Procedures',
        description: 'Minor and major surgical options.'
    }
]

export type SearchResult = {
    id: string;
    type: 'doctor' | 'clinic' | 'hospital';
    name: string;
    specialty?: string; // For doctors
    address?: string; // For clinics/hospitals
    avatarId: string;
    services: string[];
    workPhoneNumber?: string;
    openingHours?: { day: string; hours: string }[];
    homeVisit?: boolean;
    consultationFees?: {
        adult: number;
        child: number;
    };
    legal?: {
        registrationNumber: string;
        privacyPolicyUrl: string;
    };
};

export const searchResults: SearchResult[] = [
  { 
    id: 'doc-1', 
    type: 'doctor', 
    name: 'dr. Isyana', 
    specialty: 'Neurologist', 
    avatarId: 'doctor-1', 
    services: ['1', '2', '4'],
    workPhoneNumber: '+1 (555) 123-4567',
    openingHours: [
        { day: 'Mon - Fri', hours: '9:00 AM - 5:00 PM' },
        { day: 'Saturday', hours: '10:00 AM - 2:00 PM' },
        { day: 'Sunday', hours: 'Closed' },
    ],
    homeVisit: true,
    consultationFees: {
        adult: 150,
        child: 100,
    },
    legal: {
        registrationNumber: 'NPI-1234567890',
        privacyPolicyUrl: '/privacy-policy',
    }
  },
  { id: 'doc-2', type: 'doctor', name: 'Dr. John Smith', specialty: 'Dermatologist', avatarId: 'doctor-2', services: ['1', '2', '3'] },
  { id: 'doc-3', type: 'doctor', name: 'Dr. Emily White', specialty: 'Pediatrician', avatarId: 'testimonial-3', services: ['1', '2'] },
  { id: 'doc-4', type: 'doctor', name: 'Dr. James Wilson', specialty: 'Oncologist', avatarId: 'testimonial-4', services: ['2', '4'] },
  { id: 'doc-5', type: 'doctor', name: 'Dr. Maria Garcia', specialty: 'Neurologist', avatarId: 'doctor-5', services: ['1', '2', '4'] },
  { id: 'doc-6', type: 'doctor', name: 'Dr. David Kim', specialty: 'Orthopedist', avatarId: 'doctor-6', services: ['2'] },
  { id: 'doc-7', type: 'doctor', name: 'Dr. Olivia Martinez', specialty: 'Psychiatrist', avatarId: 'doctor-7', services: ['1', '5'] },
  { id: 'doc-8', type: 'doctor', name: 'Dr. Robert Brown', specialty: 'Gastroenterologist', avatarId: 'doctor-8', services: ['1', '2', '4'] },
  { 
    id: 'doc-gaelle', 
    type: 'doctor', 
    name: 'Dr. Gaelle de Lamotte', 
    specialty: 'General practitioner', 
    avatarId: 'doctor-gaelle', 
    services: ['1', '2'] 
  },
  { id: 'hosp-1', type: 'hospital', name: 'City General Hospital', address: '456 Health Ave, Wellness City', avatarId: 'hospital-1', services: ['1', '2', '4', '7', '8'] },
  { id: 'hosp-2', type: 'hospital', name: 'Oak Valley Medical Center', address: '789 Care Blvd, Mapleton', avatarId: 'hospital-2', services: ['1', '2', '3', '4', '5', '6', '7', '8'] },
  { id: 'clinic-1', type: 'clinic', name: 'Sunnyvale Clinic', address: '123 Sunshine Dr, Sunnyvale', avatarId: 'clinic-1', services: ['1', '2', '3', '6'] },
];

// NOTE: Keep `doctors` export for pages that only deal with doctors, like `messaging`
export const doctors = searchResults.filter(r => r.type === 'doctor');


export type Appointment = {
    id: number;
    doctorId: string;
    patientId: string;
    time: string; // HH:MM
    duration: number; // minutes
    date: string; // YYYY-MM-DD
    type: 'teleconsultation' | 'in-person';
    status: 'Completed' | 'Scheduled' | 'Canceled' | 'Waiting' | 'Break';
    reason: string;
};

const today = new Date();
const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 }); // Monday

export const appointments: Appointment[] = [
    // Monday
    { id: 1, doctorId: 'doc-1', patientId: 'p1', date: formatDate(startOfThisWeek, 'yyyy-MM-dd'), time: '09:00', duration: 60, type: 'in-person', status: 'Completed', reason: 'General Check-up' },
    { id: 2, doctorId: 'doc-1', patientId: 'p2', date: formatDate(startOfThisWeek, 'yyyy-MM-dd'), time: '10:30', duration: 30, type: 'teleconsultation', status: 'Canceled', reason: 'Follow-up Consultation' },
    { id: 3, doctorId: 'doc-1', patientId: 'p3', date: formatDate(startOfThisWeek, 'yyyy-MM-dd'), time: '13:00', duration: 60, type: 'in-person', status: 'Completed', reason: 'Blood Test' },

    // Tuesday
    { id: 4, doctorId: 'doc-1', patientId: 'p-james', date: formatDate(addDays(startOfThisWeek, 1), 'yyyy-MM-dd'), time: '09:30', duration: 60, type: 'in-person', status: 'Completed', reason: 'Blood Pressure Check' },
    { id: 5, doctorId: 'doc-1', patientId: 'p-emily', date: formatDate(addDays(startOfThisWeek, 1), 'yyyy-MM-dd'), time: '11:00', duration: 60, type: 'in-person', status: 'Waiting', reason: 'Headache' },
    { id: 6, doctorId: 'doc-1', patientId: 'p4', date: formatDate(addDays(startOfThisWeek, 1), 'yyyy-MM-dd'), time: '13:00', duration: 60, type: 'in-person', status: 'Scheduled', reason: 'Skin Rash' },

    // Wednesday (Today)
    { id: 7, doctorId: 'doc-1', patientId: 'p-henderson', date: formatDate(addDays(startOfThisWeek, 2), 'yyyy-MM-dd'), time: '10:30', duration: 60, type: 'teleconsultation', status: 'Scheduled', reason: 'Prescription Refill' },
    { id: 100, doctorId: 'doc-1', patientId: 'break', date: formatDate(addDays(startOfThisWeek, 2), 'yyyy-MM-dd'), time: '12:00', duration: 60, type: 'in-person', status: 'Break', reason: 'Break Time' },

    // Thursday
    { id: 8, doctorId: 'doc-1', patientId: 'p-leo', date: formatDate(addDays(startOfThisWeek, 3), 'yyyy-MM-dd'), time: '09:00', duration: 60, type: 'teleconsultation', status: 'Scheduled', reason: 'Chronic Condition Review' },
    { id: 9, doctorId: 'doc-1', patientId: 'p-tannia', date: formatDate(addDays(startOfThisWeek, 3), 'yyyy-MM-dd'), time: '10:00', duration: 60, type: 'teleconsultation', status: 'Canceled', reason: 'Mental Health Consultation' },

    // Friday
    { id: 10, doctorId: 'doc-1', patientId: 'p-thomas', date: formatDate(addDays(startOfThisWeek, 4), 'yyyy-MM-dd'), time: '09:30', duration: 60, type: 'in-person', status: 'Scheduled', reason: 'General Check-up' },
    { id: 11, doctorId: 'doc-1', patientId: 'p-ling', date: formatDate(addDays(startOfThisWeek, 4), 'yyyy-MM-dd'), time: '11:00', duration: 60, type: 'teleconsultation', status: 'Scheduled', reason: 'Lab Results Discussion' },
];


export type Message = {
    contactId: string;
    from: 'me' | 'other';
    text: string;
    time: string;
}

export const messages: Message[] = [
    { contactId: 'doc-2', from: 'me', text: 'Hello, I have a question about my prescription.', time: '10:30 AM' },
    { contactId: 'doc-2', from: 'other', text: 'Of course, Dr. Smith is available to help. What is your question?', time: '10:31 AM' },
    { contactId: 'doc-2', from: 'me', text: 'I seem to have misplaced the dosage information.', time: '10:32 AM' },
    { contactId: 'doc-2', from: 'other', text: 'No problem. I will resend it to you. Please confirm your date of birth.', time: '10:35 AM' },
    { contactId: 'doc-1', from: 'other', text: 'See you then!', time: '10:42 AM' },
    { contactId: 'support-team', from: 'other', text: 'Your invoice is ready.', time: '2d ago' },

];

export type Patient = {
  id: string;
  name: string;
  avatarId: string;
  email: string;
  lastVisit: string;
  reason: string;
  dob: string;
  gender: 'Male' | 'Female';
  status: 'Active' | 'Inactive' | 'New';
};

export const patients: Patient[] = [
    { id: 'p1', name: 'Liam Johnson', avatarId: 'testimonial-2', email: 'liam@example.com', lastVisit: '2024-07-15', reason: 'Annual Check-up', dob: '1988-05-21', gender: 'Male', status: 'Active' },
    { id: 'p2', name: 'Olivia Smith', avatarId: 'testimonial-1', email: 'olivia@example.com', lastVisit: '2024-07-14', reason: 'Follow-up', dob: '1992-11-09', gender: 'Female', status: 'Active' },
    { id: 'p3', name: 'Noah Williams', avatarId: 'testimonial-4', email: 'noah@example.com', lastVisit: '2024-07-12', reason: 'New Patient Visit', dob: '1976-02-14', gender: 'Male', status: 'New' },
    { id: 'p4', name: 'Emma Brown', avatarId: 'testimonial-3', email: 'emma@example.com', lastVisit: '2024-07-10', reason: 'Allergy Consultation', dob: '2001-08-30', gender: 'Female', status: 'Active' },
    { id: 'p5', name: 'James Jones', avatarId: 'doctor-2', email: 'james@example.com', lastVisit: '2024-06-28', reason: 'Sore Throat', dob: '1995-03-10', gender: 'Male', status: 'Active' },
    { id: 'p6', name: 'Sophia Miller', avatarId: 'doctor-1', email: 'sophia@example.com', lastVisit: '2024-05-19', reason: 'Flu Shot', dob: '1982-12-01', gender: 'Female', status: 'Inactive' },
    { id: 'p-james', name: 'James Wong', avatarId: 'testimonial-4', email: 'james@example.com', lastVisit: '2024-04-01', reason: 'Blood Pressure Check', dob: '1970-06-20', gender: 'Male', status: 'Active' },
    { id: 'p-emily', name: 'Emily Watford', avatarId: 'testimonial-3', email: 'emily@example.com', lastVisit: '2024-04-15', reason: 'Headache', dob: '1998-09-12', gender: 'Female', status: 'New' },
    { id: 'p-henderson', name: 'Henderson Kai', avatarId: 'testimonial-2', email: 'henderson@example.com', lastVisit: '2024-01-20', reason: 'Refill', dob: '1983-04-25', gender: 'Male', status: 'Active'},
    { id: 'p-leo', name: 'Leo Wildheart', avatarId: 'testimonial-4', email: 'leo@example.com', lastVisit: '2024-03-30', reason: 'Chronic Condition', dob: '1965-07-19', gender: 'Male', status: 'Active' },
    { id: 'p-tannia', name: 'Tannia Burg', avatarId: 'testimonial-1', email: 'tannia@example.com', lastVisit: '2024-04-10', reason: 'Mental Health', dob: '1991-03-15', gender: 'Female', status: 'Active' },
    { id: 'p-thomas', name: 'Thomas Andre', avatarId: 'testimonial-2', email: 'thomas@example.com', lastVisit: '2023-12-12', reason: 'Check-up', dob: '1988-08-08', gender: 'Male', status: 'Active' },
    { id: 'p-ling', name: 'Ling Ling Ben', avatarId: 'testimonial-3', email: 'lingling@example.com', lastVisit: '2024-04-02', reason: 'Lab Results', dob: '1995-02-28', gender: 'Female', status: 'Active' },
];

