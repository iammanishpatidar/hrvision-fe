import { CelebrationDataTypes, ProfileDataTypes } from '@/types';
import { PolicyCardDataItem } from './policies/components/PolicyCard';
export const GENDER_OPTIONS = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const policyTypes = [
  { label: 'Hr Policy', value: 'hr' },
  { label: 'Leave Policy', value: 'leave' },
  { label: 'WFH Policy', value: 'wfh' },
  { label: 'Security Policy', value: 'security' },
  { label: 'POSH', value: 'posh' },
  { label: 'Resignation Policy', value: 'resignation' },
];

export const policyData: PolicyCardDataItem[] = [
  {
    title: 'HR Policy.doc',
    fileType: 'doc',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Goals Management.doc',
    fileType: 'doc',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Executive Skills.pdf',
    fileType: 'pdf',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Leave Policy.ppt',
    fileType: 'ppt',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Work From Home Policy.pdf',
    fileType: 'pdf',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Code of Conduct.doc',
    fileType: 'doc',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'IT & Security Policy.ppt',
    fileType: 'ppt',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'POSH (Prevention of Sexual Harassment).doc',
    fileType: 'doc',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
  {
    title: 'Exit & Resignation Policy',
    fileType: 'doc',
    effectiveFrom: '04/15/2022',
    effectiveTill: '04/15/2023',
    createdBy: 'Fin Max',
  },
];

export const profileData: ProfileDataTypes = {
  firstName: 'Katie',
  lastName: 'Pena',
  image: 'src/pages/dashboard/images/Screenshot_2025-05-21_123214-removebg-preview.png',
  location: 'Yogyakarta, Indonesia',
  title: 'UX-UI Designer',
};
export const CelebrationData: CelebrationDataTypes = {
  image: 'src/pages/dashboard/images/image-removebg-preview.png',
  person: 'Jane Cooper',
  Designation: 'Head of Finance departement',
};
