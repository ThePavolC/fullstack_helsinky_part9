import diagnoseEntries from '../../data/diagnoses';
import { Diagnose } from '../types';

const getEntries = (): Array<Diagnose> => {
  return diagnoseEntries;
};

const addEntry = () => {
  return null;
};

export default {
  getEntries,
  addEntry,
};
