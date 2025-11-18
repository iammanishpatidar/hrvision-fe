import { HolidayInfo } from './';

export type HolidayMap = Record<string, HolidayInfo[]>;

export const holidays: HolidayMap = {
  'January 2025': [
    {
      id: '1',
      name: 'Lohri',
      date: new Date('2025-01-13'),
      type: 'Cultural/Religious Holiday',
      isMandatory: 'yes',
      allowedEmployeeType: ['full-time'],
      region: ['north-india'],
    },
    {
      id: '2',
      name: 'Republic Day',
      date: new Date('2025-01-26'),
      type: 'National Holiday',
      isMandatory: 'yes',
      allowedEmployeeType: ['all'],
      region: ['all-india'],
    },
  ],
  'February 2025': [
    {
      id: '3',
      name: 'Maha Shivaratri',
      date: new Date('2025-02-26'),
      type: 'Cultural/Religious Holiday',
      isMandatory: 'yes',
      allowedEmployeeType: ['all'],
      region: ['all-india'],
    },
  ],
  'March 2025': [
    {
      id: '4',
      name: 'Holi',
      date: new Date('2025-03-14'),
      type: 'Cultural/Religious Holiday',
      isMandatory: 'no',
      allowedEmployeeType: ['all'],
      region: ['north-india'],
    },
  ],
};

export const holidayTypeOptions = [
  { label: 'National Holiday', value: 'NATIONAL' },
  { label: 'Cultural/Religious Holiday', value: 'REGIONAL' },
  { label: 'Optional/Restricted Holiday', value: 'OPTIONAL' },
  { label: 'Company-Specific Holiday', value: 'COMPANY' },
];

export const isMandatoryOptions = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' },
];

export const regionOptions = [
  { label: 'All India', value: 'all-india' },
  { label: 'North India', value: 'north-india' },
  { label: 'South India', value: 'south-india' },
  { label: 'East India', value: 'east-india' },
  { label: 'West India', value: 'west-india' },
  { label: 'Central India', value: 'central-india' },
];
