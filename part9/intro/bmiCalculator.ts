type BMIValues = {
  height: number,
  mass: number,
}

const parseArgs = (args: string[]): BMIValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3]),
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

const calculateBmi = (height: number, mass: number): string => {

  const meters = height / 100;
  const bmi = mass / (meters * meters);
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
}

try {
  const { height, mass } = parseArgs(process.argv);
  console.log(calculateBmi(height, mass));
} catch (e) {
  console.log('Error:', e.message);
}