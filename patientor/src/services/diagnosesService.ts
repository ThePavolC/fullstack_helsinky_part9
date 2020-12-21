import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const getDiagnoses = (): Array<Diagnose> => {
  return diagnoseEntries;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
};
