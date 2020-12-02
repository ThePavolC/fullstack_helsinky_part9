enum BMI {
  LOW = 18.5,
  MEDIUM = 25,
  HIGH = 30,
}

const calculateBmi = (height: number, weight: number): string => {
  const bmi_index = weight / Math.pow(height / 100, 2);

  if (bmi_index < BMI.LOW) {
    return 'Underweight';
  }
  if (bmi_index >= BMI.LOW && bmi_index < BMI.MEDIUM) {
    return 'Normal (healthy weight)';
  }
  if (bmi_index >= BMI.MEDIUM && bmi_index < BMI.HIGH) {
    return 'Overweight';
  }
  if (bmi_index >= BMI.HIGH) {
    return 'Obese';
  }
};

const parseArgumentsForCalculateBmi = (
  args: Array<string>,
): { height: number; weight: number } => {
  if (args.length !== 4)
    throw new Error(
      'Invalid arguments. Run as: calculateBMI <HEIGHT> <WEIGHT>',
    );

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (process.argv.length === 2) {
  console.log(calculateBmi(180, 74));
} else {
  const { height, weight } = parseArgumentsForCalculateBmi(process.argv);
  console.log(calculateBmi(height, weight));
}
