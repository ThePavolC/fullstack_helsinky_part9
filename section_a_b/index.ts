import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExerciseDays from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req: express.Request, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.status(404).send({ error: 'malformatted parameters' });
  }

  const bmi = calculateBmi(height, weight);
  return res.send({ height, weight, bmi });
});

app.post('/exercises', (req: express.Request, res) => {
  interface ExercisesArgs {
    daily_exercises: Array<number>;
    target: number;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const args: ExercisesArgs = req.body;

  const isParamMissing = () =>
    args.target == undefined || args.daily_exercises == undefined;
  const isMalformedParam = () =>
    isNaN(args.target) ||
    args.daily_exercises.some((day) => isNaN(Number(day)));

  if (isParamMissing()) {
    return res.status(400).json({
      error: 'parameters missing',
    });
  }
  if (isMalformedParam()) {
    return res.status(400).json({
      error: '"malformatted parameters"',
    });
  }

  const data = calculateExerciseDays(args.daily_exercises, args.target);
  return res.json(data);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
