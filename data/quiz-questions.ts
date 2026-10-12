import { countries } from './countries';

// A multiple-choice quiz question.
export type QuizQuestion = {
  id: number;
  countryId: number; // Links to Country.id
  question: string;
  options: string[]; // Answer choices, shown in this order
  correctAnswer: string; // Must match one of the options exactly
};

type QuestionContent = Omit<QuizQuestion, 'id' | 'countryId'>;

// Keep the original questions and add country-specific questions from the
// profile fields, so quiz facts stay in sync with the country data.
const existingQuestions: Record<number, QuestionContent> = {
  1: {
    question: 'What is the official language of Togo?',
    options: ['French', 'Portuguese', 'Japanese', 'Hindi'],
    correctAnswer: 'French',
  },
  2: {
    question: 'Which traditional Ghanaian textile is well known internationally?',
    options: ['Kente', 'Kimono', 'Sari', 'Beret'],
    correctAnswer: 'Kente',
  },
  3: {
    question: 'What is a common respectful greeting in Japan?',
    options: ['Bowing', 'Waving with both hands', 'Snapping fingers', 'Clapping'],
    correctAnswer: 'Bowing',
  },
  4: {
    question: 'Which celebration is strongly associated with Brazil?',
    options: ['Carnival', 'Obon', 'Diwali', 'Akwasidae'],
    correctAnswer: 'Carnival',
  },
  5: {
    question: 'Which city is the capital of France?',
    options: ['Paris', 'Lyon', 'Marseille', 'Nice'],
    correctAnswer: 'Paris',
  },
  6: {
    question: 'Which celebration is commonly associated with lights?',
    options: ['Diwali', 'Carnival', 'Obon', 'Homowo'],
    correctAnswer: 'Diwali',
  },
};

function makeOptions(correctAnswer: string, values: string[], seed: number): string[] {
  const distractors = [...new Set(values)].filter((value) => value !== correctAnswer);
  const selected = Array.from({ length: 3 }, (_, index) => {
    return distractors[(seed * 3 + index) % distractors.length];
  });
  const options = [correctAnswer, ...selected];
  const rotation = seed % options.length;
  return [...options.slice(rotation), ...options.slice(0, rotation)];
}

function profileQuestions(countryId: number): QuestionContent[] {
  const country = countries.find((item) => item.id === countryId);
  if (!country) return [];

  const seed = country.id;
  const names = countries.map((item) => item.name);
  const capitals = countries.map((item) => item.capital);
  const languages = countries.map((item) => item.language);
  const currencies = countries.map((item) => item.currency);
  const regions = countries.map((item) => item.region);

  return [
    {
      question: `What is the capital listed for ${country.name}?`,
      options: makeOptions(country.capital, capitals, seed),
      correctAnswer: country.capital,
    },
    {
      question: `Which language information is listed for ${country.name}?`,
      options: makeOptions(country.language, languages, seed + 1),
      correctAnswer: country.language,
    },
    {
      question: `Which currency is listed for ${country.name}?`,
      options: makeOptions(country.currency, currencies, seed + 2),
      correctAnswer: country.currency,
    },
    {
      question: `In which region is ${country.name} grouped?`,
      options: makeOptions(country.region, regions, seed + 3),
      correctAnswer: country.region,
    },
    {
      question: `Which country's listed capital is ${country.capital}?`,
      options: makeOptions(country.name, names, seed + 4),
      correctAnswer: country.name,
    },
    {
      question: `Which country profile lists ${country.capital} as its capital and ${country.currency} as its currency?`,
      options: makeOptions(country.name, names, seed + 5),
      correctAnswer: country.name,
    },
  ];
}

export const quizQuestions: QuizQuestion[] = countries.flatMap((country) => {
  const featured = existingQuestions[country.id];
  const generated = profileQuestions(country.id).slice(0, featured ? 5 : 6);
  const content = featured ? [featured, ...generated] : generated;

  return content.map((question, index) => ({
    ...question,
    id: (country.id - 1) * 6 + index + 1,
    countryId: country.id,
  }));
});
