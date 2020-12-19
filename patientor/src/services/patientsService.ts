import patientEntries from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const getEntries = (): Array<Patient> => {
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

const addEntry = (patientData: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    ...patientData,
  };

  patientEntries.push(newPatient);

  return newPatient;
};

export default {
  getEntries,
  addEntry,
  getPublicPatients,
};
