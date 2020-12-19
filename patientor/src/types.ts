export enum Gender {
  male = 'male',
  female = 'female',
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type PublicPatient = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
