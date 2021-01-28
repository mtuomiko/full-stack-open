type BMIValues = {
  height: number,
  weight: number,
};

const parseArgs = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  return parseValues(args[2], args[3]);
};

export const parseValues = (height: string, weight: string): BMIValues => {
  if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
    return {
      height: Number(height),
      weight: Number(weight),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const meters = height / 100;
  const bmi = weight / (meters * meters);
  if (bmi < 15) {
    return 'Very severely underweight';
  }
  if (bmi < 16) {
    return 'Severely underweight';
  }
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal (healthy weight)';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  if (bmi < 35) {
    return 'Obese Class I (Moderately obese)';
  }
  if (bmi < 40) {
    return 'Obese Class II (Severely obese)';
  }
  return 'Obese Class III (Very severely obese)';
};

if (require.main === module) {
  try {
    const { height, weight } = parseArgs(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (e) {
    if (e instanceof Error) {
      console.error('Error:', e.message);
    }
  }
}
