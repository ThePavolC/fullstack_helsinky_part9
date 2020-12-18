import express from 'express';
import patientsRoute from './routes/patients';
import diagnosesRoute from './routes/diagnoses';

import cors from 'cors';
const app = express();

app.use(express.json());

const courseOpts = cors({ origin: true });
app.use(courseOpts);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRoute);
app.use('/api/patients', patientsRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
