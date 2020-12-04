interface RatingValues {
  rating: number;
  ratingDescription: string;
}

const getRating = (
  trainingDays: number,
  periodLength: number,
): RatingValues => {
  let rating: RatingValues['rating'] = -1;
  let ratingDescription: RatingValues['ratingDescription'] = 'Invalid';
  const exercise_rate = trainingDays / periodLength;

  if (exercise_rate <= 0.1) {
    rating = 1;
    ratingDescription = 'I think we can do better';
  } else if (exercise_rate <= 0.8) {
    rating = 2;
    ratingDescription = 'Good effort';
  } else if (exercise_rate > 0.8) {
    rating = 3;
    ratingDescription = 'Excellent';
  }

  return { rating, ratingDescription };
};

interface ExerciseDays {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExerciseDays = (
  dailyHours: Array<number>,
  target: number,
): object => {
  const average = dailyHours.reduce((a, b) => a + b, 0) / dailyHours.length;
  const periodLength = dailyHours.length;
  const trainingDays = dailyHours.filter((hours) => hours > 0).length;
  const success = average >= target;
  const { rating, ratingDescription } = getRating(trainingDays, periodLength);

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

const parseArgumentsForCalculateExerciseDays = (
  args: Array<string>,
): { target: number; trainingDays: Array<number> } => {
  if (args.length < 4)
    throw new Error(
      'Invalid arguments. Run as: calculateExercises <TARGET> <TRAINING DAYS>',
    );

  const [, , _target, ..._days] = args;

  if (!isNaN(Number(_target)) && _days.every((day) => !isNaN(Number(day)))) {
    return {
      target: Number(args[2]),
      trainingDays: _days.map((day) => Number(day)),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

if (process.argv.length === 2) {
  console.log(calculateExerciseDays([3, 0, 2, 4.5, 0, 3, 1], 2));
} else {
  const { target, trainingDays } = parseArgumentsForCalculateExerciseDays(
    process.argv,
  );
  console.log(calculateExerciseDays(trainingDays, target));
}
