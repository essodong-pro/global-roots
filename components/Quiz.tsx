'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { QuizQuestion } from '@/data/quiz-questions';

// Optional country id to limit the quiz to one country.
type QuizProps = {
  countryId?: string;
};

// Quiz: loads questions from GET /api/quiz and shows them one at a time.
export default function Quiz({ countryId }: QuizProps) {
  // Loaded questions (null while loading) and whether loading failed.
  const [questions, setQuestions] = useState<QuizQuestion[] | null>(null);
  const [loadError, setLoadError] = useState(false);

  // Current question number, the picked answer, and the score.
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  // Load the questions from the API.
  useEffect(() => {
    const url = countryId
      ? `/api/quiz?countryId=${encodeURIComponent(countryId)}`
      : '/api/quiz';

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to load quiz');
        }
        return response.json() as Promise<QuizQuestion[]>;
      })
      .then((data: QuizQuestion[]) => setQuestions(data))
      .catch(() => setLoadError(true));
  }, [countryId]);

  // Loading failed.
  if (loadError) {
    return (
      <p
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-800"
      >
        Sorry, the quiz could not be loaded. Please try again later.
      </p>
    );
  }

  // Still loading.
  if (!questions) {
    return (
      <p aria-live="polite" className="rounded-xl bg-white p-5 text-slate-700">
        Loading quiz...
      </p>
    );
  }

  // No questions available.
  if (questions.length === 0) {
    return (
      <p className="mb-4 text-sm font-semibold text-green-900">
        No quiz questions available yet.{' '}
        <Link href="/quiz">Try the full quiz</Link>
      </p>
    );
  }

  // Start over from the first question.
  function restart() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
  }

  // All questions answered: show the score.
  if (current >= questions.length) {
    return (
      <section aria-live="polite">
        <h2>Quiz complete</h2>
        <p>
          You scored {score} out of {questions.length}.
        </p>
        <button type="button" onClick={restart}>
          Restart quiz
        </button>
      </section>
    );
  }

  const question = questions[current];
  const answered = selected !== null;

  // Pick an answer (only once per question) and add a point if it's right.
  function choose(option: string) {
    if (answered) {
      return;
    }

    setSelected(option);

    if (option === question.correctAnswer) {
      setScore((value) => value + 1);
    }
  }

  // Go to the next question.
  function next() {
    setSelected(null);
    setCurrent((value) => value + 1);
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
      {/* Progress and score */}
      <p className="mb-4 text-sm font-semibold text-slate-600">
        Question {current + 1} of {questions.length} · Score: {score}
      </p>

      {/* Question and answer buttons */}
      <fieldset>
        <legend className="mb-4 text-xl font-bold leading-snug text-slate-900 sm:text-2xl">
          {question.question}
        </legend>
        <div className="grid gap-3">
          {question.options.map((option) => (
            <div key={option}>
              <button
                type="button"
                onClick={() => choose(option)}
                disabled={answered}
                aria-pressed={selected === option}
                className={`min-h-12 w-full rounded-xl border px-4 py-3 text-left font-medium transition ${
                  answered && option === question.correctAnswer
                    ? 'border-green-700 bg-green-50 text-green-900'
                    : answered && selected === option
                      ? 'border-red-300 bg-red-50 text-red-800'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-green-700 hover:bg-green-50'
                } disabled:cursor-default`}
              >
                {option}
              </button>
            </div>
          ))}
        </div>
      </fieldset>

      {/* Right or wrong feedback, read aloud by screen readers */}
      <p
        aria-live="polite"
        className={`mt-4 min-h-6 font-semibold ${selected === question.correctAnswer ? 'text-green-800' : 'text-red-700'}`}
      >
        {answered &&
          (selected === question.correctAnswer
            ? 'Correct!'
            : `Not quite. The correct answer is ${question.correctAnswer}.`)}
      </p>

      {/* Next button, shown after answering */}
      {answered && (
        <button
          type="button"
          onClick={next}
          className="mt-4 min-h-11 rounded-lg bg-green-800 px-5 py-2.5 font-semibold text-white hover:bg-green-900"
        >
          {current + 1 < questions.length ? 'Next question' : 'See results'}
        </button>
      )}
    </section>
  );
}
