import diagnoseEntries from '../../data/diagnosis';
import { Diagnosis } from '../types';

const getDiagnosis = (): Array<Diagnosis> => {
  return diagnoseEntries;
};

const addDiagnosis = () => {
  return null;
};

export default {
  getDiagnosis,
  addDiagnosis,
};
