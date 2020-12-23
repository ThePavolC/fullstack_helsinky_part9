import express from 'express';
import patientService from '../services/patientsService';
import { Discharge, Entry, HealthCheckRating, SickLeave } from '../types';
import { toNewEntry, toNewPatientEntry } from '../utils';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getPatient(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.post('/:id/entries', (req, res) => {
  const newEntry = toNewEntry(req.body) as Entry;
  newEntry.id = uuidv4();

  switch (newEntry.type) {
    case 'Hospital':
      newEntry.discharge = req.body.discharge as Discharge;
      break;
    case 'HealthCheck':
      newEntry.healthCheckRating = req.body
        .healthCheckRating as HealthCheckRating;
      break;
    case 'OccupationalHealthcare':
      newEntry.employerName = req.body.employerName as string;
      newEntry.sickLeave = req.body.sickLeave as SickLeave;
      break;
  }
  const updatedPatient = patientService.addEntry(req.params.id, newEntry);
  if (updatedPatient) {
    res.json(updatedPatient);
  } else {
    res.status(404);
  }
});

router.post('/', (_req, res) => {
  try {
    const newPatient = toNewPatientEntry(_req.body);
    const addedEntry = patientService.addPatient(newPatient);
    res.json(addedEntry);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    }
    throw error;
  }
});

export default router;
