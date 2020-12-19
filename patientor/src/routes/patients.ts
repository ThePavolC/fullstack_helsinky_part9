import express from 'express';
import patientService from '../services/patientsService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/', (_req, res) => {
  try {
    const newPatient = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addEntry(newPatient);
    res.json(addedEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    throw error;
  }
});

export default router;
