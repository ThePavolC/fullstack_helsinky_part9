/* eslint-disable @typescript-eslint/no-explicit-any */

import { Gender, NewPatient } from './types';

// Type Guards

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

const isSsn = (ssn: any): ssn is string => {
  // Very basic check for SSN number validity
  const ssnPattern = /^[0-9-A-Z]*$/;
  return ssnPattern.test(ssn);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

// Parses

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error(`Incorrect or missing name`);
  }
  return name;
};

const parseDateOfBirth = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error(`Incorrect or missing date`);
  }
  return date;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isSsn(ssn)) {
    throw new Error(`Incorrect or missing ssn`);
  }
  return ssn;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error(`Incorrect or missing gender`);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error(`Incorrect or missing occupation`);
  }
  return occupation;
};

// Utils

const toNewPatientEntry = (object: {
  name: any;
  dateOfBirth: any;
  ssn: any;
  gender: any;
  occupation: any;
  entries: any;
}): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    ssn: parseSsn(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: [],
  };
};

export default toNewPatientEntry;
