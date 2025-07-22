import { CivicTopic } from '../types';

export const civicTopics: CivicTopic[] = [
  {
    id: 'rights',
    title: 'Fundamental Rights',
    description: 'Understanding your constitutional rights as a citizen',
    icon: 'Shield',
    examples: [
      'What are my fundamental rights?',
      'Can police search without warrant?',
      'Right to information process'
    ]
  },
  {
    id: 'legal',
    title: 'Legal Procedures',
    description: 'How to navigate legal processes and documentation',
    icon: 'Scale',
    examples: [
      'How to file an FIR?',
      'What is the bail process?',
      'How to get legal aid?'
    ]
  },
  {
    id: 'civic',
    title: 'Civic Complaints',
    description: 'Report and resolve civic issues in your area',
    icon: 'AlertTriangle',
    examples: [
      'Water supply issues',
      'Road repair complaints',
      'Noise pollution reports'
    ]
  },
  {
    id: 'emergency',
    title: 'Emergency Protocols',
    description: 'What to do in emergency situations',
    icon: 'Phone',
    examples: [
      'Emergency helpline numbers',
      'Natural disaster protocols',
      'Medical emergency procedures'
    ]
  },
  {
    id: 'documents',
    title: 'Government Documents',
    description: 'How to obtain and use official documents',
    icon: 'FileText',
    examples: [
      'Aadhaar card issues',
      'Passport application',
      'Voter ID registration'
    ]
  },
  {
    id: 'taxation',
    title: 'Taxes & Finance',
    description: 'Understanding tax obligations and financial rights',
    icon: 'Receipt',
    examples: [
      'Income tax filing',
      'Property tax payment',
      'GST compliance for small business'
    ]
  }
];