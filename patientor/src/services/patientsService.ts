import { PublicPatient, Patient, NewPatient, Entry } from '../types';
import { v4 as uuidv4 } from 'uuid';
import patients from '../../data/patients';

const getPatients = (): Array<Patient> => {
  return patients;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientData,
  };

  patients.push(newPatient);

  return newPatient;
};

const getPatient = (patientId: string): Patient | undefined => {
  return patients.find((patient) => patient.id === patientId);
};

const addEntry = (patientId: string, entry: Entry): Patient | undefined => {
  const patient = getPatient(patientId);
  if (patient) {
    patient.entries.push(entry);
    return patient;
  } else {
    return undefined;
  }
};

export default {
  getPatients,
  addPatient,
  getPublicPatients,
  getPatient,
  addEntry,
};
