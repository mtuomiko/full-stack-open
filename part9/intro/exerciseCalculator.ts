interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Input {
  hours: number[];
  target: number;
}

const parseExerciseArgs = (args: string[]): Input => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }
  const values = args.slice(2).map(x => Number(x));
  if (values.some(x => isNaN(x))) {
    throw new Error('Provided values were not numbers!');
  }
  return {
    hours: values.slice(1),
    target: values[0],
  };
};

export const calculateExercises = (hours: number[], target: number): Result => {
  const periodLength = hours.length;
  const trainingDays = hours.filter(x => x > 0).length;
  const average = hours.reduce((a, b) => a + b, 0) / periodLength;
  const success = average >= target;

  let rating;
  let ratingDescription;
  if (average < (target / 2)) {
    rating = 1;
    ratingDescription = 'You gotta pump those numbers up, those are rookie numbers';
  } else if (average < target) {
    rating = 2;
    ratingDescription = 'Nearly there';
  } else {
    rating = 3;
    ratingDescription = 'Yeah buddy! Light weight!';
  }

  return {
    periodLength,
    trainingDays,
    target,
    average,
    success,
    rating,
    ratingDescription,
  };
};

if (require.main === module) {
  try {
    const { hours, target } = parseExerciseArgs(process.argv);
    console.log(calculateExercises(hours, target));
  } catch (e) {
    if (e instanceof Error) {
      console.log('Error:', e.message);
    }
  }
}