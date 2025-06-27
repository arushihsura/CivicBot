import { Message } from '../types';

const civicResponses: Record<string, string> = {
  'hello': 'Hello! I\'m CivicBot, your AI assistant for civic awareness. I can help you understand your rights, duties, legal procedures, and civic processes. What would you like to know today?',
  'rights': 'Your fundamental rights include Right to Equality, Right to Freedom, Right against Exploitation, Right to Freedom of Religion, Cultural and Educational Rights, and Right to Constitutional Remedies. Which specific right would you like to know more about?',
  'fir': 'To file an FIR (First Information Report): 1) Go to the nearest police station, 2) Provide details of the incident in writing, 3) Ensure the FIR is registered and you get a copy, 4) Note the FIR number for future reference. You can also file online in many states.',
  'rti': 'To file an RTI (Right to Information): 1) Write an application to the Public Information Officer, 2) Pay the required fee (₹10 for most states), 3) Specify the information you need, 4) Provide your contact details. You should receive a response within 30 days.',
  'emergency': 'Important emergency numbers: Police - 100, Fire - 101, Ambulance - 108, Women Helpline - 1091, Disaster Management - 108, Tourist Helpline - 1363.',
  'complaint': 'To file a civic complaint: 1) Identify the relevant authority (municipal corporation, panchayat, etc.), 2) Write a detailed complaint, 3) Submit it online or in person, 4) Keep an acknowledgment, 5) Follow up regularly.',
  'voter': 'To apply for a Voter ID: 1) Visit [https://www.nvsp.in/](https://www.nvsp.in/), 2) Fill Form 6 for new registration, 3) Upload age & address proof, 4) Track status online. Voter ID is essential for participating in democratic elections.',
  'passport': 'To apply for a passport in India: 1) Register at [passportindia.gov.in](https://passportindia.gov.in), 2) Fill application, 3) Book appointment at PSK, 4) Submit documents, 5) Attend police verification. You’ll receive the passport by post.',
  'aadhar': 'To update or apply for Aadhaar: Visit a nearby Aadhaar Enrollment Centre or UIDAI website. Carry original documents for identity and address proof. You can track status online using the enrollment number.',
  'challan': 'Traffic challans can be checked and paid online through the Parivahan portal ([echallan.parivahan.gov.in](https://echallan.parivahan.gov.in)). Avoid delays to prevent license suspension or penalties.',
  'consumer': 'Consumer rights include Right to Safety, Right to Be Informed, Right to Choose, Right to Be Heard, Right to Redressal, and Right to Consumer Education. You can file complaints via [consumerhelpline.gov.in](https://consumerhelpline.gov.in).',
  'pil': 'Public Interest Litigation (PIL) allows citizens to file petitions in court for public welfare. It can be filed in the High Court or Supreme Court if a matter affects the public at large. No lawyer is required in many cases.',
  'pollution': 'To report pollution complaints: You can use the Central Pollution Control Board’s grievance redressal system, or local apps like Sameer, Swachhata, or your state’s Pollution Control Board website.',
  'default': 'I understand you have a civic question. Could you please be more specific? I can help with topics like fundamental rights, legal procedures, emergency protocols, voter ID, RTI, PIL, and more.'
};

export function generateMockResponse(userMessage: string): string {
  const message = userMessage.toLowerCase();

  if (message.includes('hello') || message.includes('hi')) {
    return civicResponses.hello;
  } else if (message.includes('right') || message.includes('fundamental')) {
    return civicResponses.rights;
  } else if (message.includes('fir') || message.includes('police') || message.includes('crime')) {
    return civicResponses.fir;
  } else if (message.includes('rti') || message.includes('information')) {
    return civicResponses.rti;
  } else if (message.includes('emergency') || message.includes('helpline') || message.includes('number')) {
    return civicResponses.emergency;
  } else if (message.includes('complaint') || message.includes('civic') || message.includes('municipal')) {
    return civicResponses.complaint;
  } else if (message.includes('voter') || message.includes('election')) {
    return civicResponses.voter;
  } else if (message.includes('passport')) {
    return civicResponses.passport;
  } else if (message.includes('aadhar') || message.includes('aadhaar')) {
    return civicResponses.aadhar;
  } else if (message.includes('challan') || message.includes('traffic fine')) {
    return civicResponses.challan;
  } else if (message.includes('consumer')) {
    return civicResponses.consumer;
  } else if (message.includes('pil') || message.includes('public interest')) {
    return civicResponses.pil;
  } else if (message.includes('pollution') || message.includes('environment')) {
    return civicResponses.pollution;
  } else {
    return civicResponses.default;
  }
}

export function generateSuggestions(userMessage: string): string[] {
  const message = userMessage.toLowerCase();

  if (message.includes('fir')) {
    return [
      'What documents do I need for FIR?',
      'Can I file FIR online?',
      'What if police refuse to file FIR?'
    ];
  } else if (message.includes('rti')) {
    return [
      'RTI application fee details',
      'How to appeal RTI rejection?',
      'RTI for different states'
    ];
  } else if (message.includes('voter')) {
    return [
      'Steps to apply for Voter ID',
      'How to update voter details?',
      'Can I vote without a voter ID?'
    ];
  } else if (message.includes('passport')) {
    return [
      'Documents required for passport',
      'How long does it take to get a passport?',
      'What is Tatkaal passport service?'
    ];
  } else if (message.includes('aadhar')) {
    return [
      'How to update Aadhaar details?',
      'How to check Aadhaar status?',
      'Is Aadhaar mandatory for bank accounts?'
    ];
  } else if (message.includes('challan')) {
    return [
      'How to pay traffic challan online?',
      'What if I don’t pay my challan?',
      'Can challans affect my driving license?'
    ];
  } else if (message.includes('consumer')) {
    return [
      'How to file consumer complaint online?',
      'What are my consumer rights?',
      'Time limit for consumer complaint?'
    ];
  } else if (message.includes('pil')) {
    return [
      'How to file a PIL?',
      'Can a student file PIL?',
      'Famous PIL examples in India'
    ];
  } else {
    return [
      'How to file an FIR?',
      'RTI application process',
      'Emergency helpline numbers',
      'Consumer rights and complaints',
      'How to get Voter ID or Passport?'
    ];
  }
}
