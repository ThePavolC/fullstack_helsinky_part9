import patientEntries from '../../data/patients';
import { PublicPatient, Patient } from '../types';

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

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
  getPublicPatients,
};
