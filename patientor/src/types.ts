export type Gender = 'male' | 'female';

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
