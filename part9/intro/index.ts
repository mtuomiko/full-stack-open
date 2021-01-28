interface ExerciseBody {
  daily_exercises: (string | number)[];
  target: string | number;
}

import express, { ErrorRequestHandler } from 'express';
import { parseValues, calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full stack!');
});

app.get('/bmi', (req, res) => {
  const errorMsg = 'malformatted parameters';

  if (typeof req.query.height !== 'string' || typeof req.query.weight !== 'string') {
    throw new Error(errorMsg);
  }

  try {
    const { height, weight } = parseValues(req.query.height, req.query.weight);
    const bmi = calculateBmi(height, weight);
    const response = {
      height,
      weight,
      bmi,
    };
    res.json(response);
  } catch (e) {
    throw new Error(errorMsg);
  }
});

app.post('/exercises', (req, res) => {
  const missingError = 'parameters missing';
  const malformattedError = 'malformatted parameters';

  const body = req.body as ExerciseBody;
  if (!('target' in body) || !('daily_exercises' in body)) {
    throw new Error(missingError);
  }

  const target = Number(body.target);
  const dailyExercises = body.daily_exercises;

  if (isNaN(target) || !Array.isArray(dailyExercises)) {
    throw new Error(malformattedError);
  }

  const dailyExercisesNumbers = dailyExercises.map(x => Number(x));
  if (dailyExercisesNumbers.some(x => isNaN(x))) {
    throw new Error(malformattedError);
  }

  const result = calculateExercises(dailyExercisesNumbers, target);
  res.json(result);
});

const errorHandler: ErrorRequestHandler = (err, _req, res, next) => {
  const errMsgs = ['malformatted parameters', 'parameters missing'];

  if (!(err instanceof Error)) {
    return next(err);
  }

  if (errMsgs.includes(err.message)) {
    return res.status(400).json({ error: err.message });
  }

  return next(err);
};
app.use(errorHandler);

const PORT = 3003;
app.listen(PORT, () => {
  console.log(`Henlo server running on port ${PORT}`);
});