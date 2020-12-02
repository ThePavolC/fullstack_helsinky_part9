/*
input
[3, 0, 2, 4.5, 0, 3, 1]

output
{ periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: 'not too bad but could be better',
  target: 2,
  average: 1.9285714285714286 }

*/

interface RatingValues {
  rating: number;
  ratingDescription: string;
}

const getRating = (
  trainingDays: number,
  periodLength: number,
): RatingValues => {
  let rating;
  let ratingDescription;
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

console.log(calculateExerciseDays([3, 0, 2, 4.5, 0, 3, 1], 2));
