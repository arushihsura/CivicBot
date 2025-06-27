export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'resource';
}

export interface CivicTopic {
  id: string;
  title: string;
  description: string;
  icon: string;
  examples: string[];
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'form' | 'guide' | 'contact';
  downloadUrl?: string;
  content?: string;
  externalUrl?: string;
}

export interface Location {
  state: string;
  city: string;
}

export interface ReportData {
  type: string;
  location: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  attachments?: File[];
}