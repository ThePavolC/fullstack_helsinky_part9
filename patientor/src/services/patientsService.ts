import patientEntries from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getPatients = (): Array<Patient> => {
  return patientEntries;
};

const getPublicPatients = (): Array<PublicPatient> => {
  return patientEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }),
  );
};

const addPatient = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientData,
  };

  patientEntries.push(newPatient);

  return newPatient;
};

const getPatient = (patientId: string): Patient | undefined => {
  return patientEntries.find((patient) => (patient.id = patientId));
};

export default {
  getPatients,
  addPatient,
  getPublicPatients,
  getPatient,
};
