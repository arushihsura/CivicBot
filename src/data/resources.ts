import { Resource } from '../types';

export const resources: Resource[] = [
  {
    id: 'rti-form',
    title: 'RTI Application Form',
    description: 'Template for filing Right to Information requests',
    type: 'form',
    downloadUrl: 'https://rtionline.gov.in/request/request.php',
    content: 'RTI application template with guidelines',
    externalUrl: 'https://rtionline.gov.in'
  },
  {
    id: 'fir-guide',
    title: 'FIR Filing Guide',
    description: 'Step-by-step guide to file First Information Report',
    type: 'guide',
    content: 'Complete guide on FIR process and requirements',
    externalUrl: 'https://citizen.mahapolice.gov.in/Citizen/MH/PublicView/OnlineFIR.aspx'
  },
  {
    id: 'civic-complaint',
    title: 'Civic Complaint Portal',
    description: 'Online portal for filing civic complaints with authorities',
    type: 'form',
    downloadUrl: 'https://pgportal.gov.in/',
    content: 'Public Grievance portal for civic complaints',
    externalUrl: 'https://pgportal.gov.in/'
  },
  {
    id: 'emergency-contacts',
    title: 'Emergency Helplines',
    description: 'Important emergency contact numbers',
    type: 'contact',
    content: 'Police: 100, Fire: 101, Ambulance: 108, Women Helpline: 1091',
    externalUrl: 'https://www.india.gov.in/topics/law-justice/emergency-numbers'
  },
  {
    id: 'legal-aid',
    title: 'Legal Aid Services',
    description: 'Free legal aid services and contacts',
    type: 'contact',
    content: 'National Legal Services Authority contacts and procedures',
    externalUrl: 'https://nalsa.gov.in/'
  },
  {
    id: 'consumer-rights',
    title: 'Consumer Rights Portal',
    description: 'Know your rights as a consumer and file complaints',
    type: 'guide',
    content: 'Comprehensive guide to consumer protection laws',
    externalUrl: 'https://consumerhelpline.gov.in/'
  },
  {
    id: 'voter-services',
    title: 'Voter Registration',
    description: 'Apply for voter ID and election services',
    type: 'form',
    content: 'National Voters Service Portal for all election-related services',
    externalUrl: 'https://www.nvsp.in/',
    downloadUrl: 'https://www.nvsp.in/'
  },
  {
    id: 'passport-services',
    title: 'Passport Services',
    description: 'Apply for passport and related services',
    type: 'form',
    content: 'Official passport application portal',
    externalUrl: 'https://passportindia.gov.in/',
    downloadUrl: 'https://passportindia.gov.in/'
  },
  {
    id: 'aadhaar-services',
    title: 'Aadhaar Services',
    description: 'Aadhaar enrollment and update services',
    type: 'form',
    content: 'UIDAI official portal for Aadhaar services',
    externalUrl: 'https://uidai.gov.in/',
    downloadUrl: 'https://uidai.gov.in/'
  }
];