import { PublicPatient, Patient, NewPatient } from '../types';
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

export default {
  getPatients,
  addPatient,
  getPublicPatients,
  getPatient,
};
