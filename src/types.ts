export type Role = 'admin' | 'staff';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  aiSummary: string;
  aiTags: string[];
  staffTags: string[];
  ratings: {
    intent: number;
    power: number;
    urgency: number;
  };
  lastFollowUp: string;
  status: string;
}
