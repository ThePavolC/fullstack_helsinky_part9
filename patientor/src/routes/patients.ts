import express from 'express';
import patientService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.post('/', (_req, res) => {
  res.send('Saving a patient!');
});

export default router;
