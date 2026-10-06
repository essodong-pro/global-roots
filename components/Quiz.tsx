"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { QuizQuestion } from "@/data/quiz-questions";

// Optional country id to limit the quiz to one country.
type QuizProps = {
    countryId?: string;
};

// Quiz: loads questions from GET /api/quiz and shows them one at a time.
// PLACEHOLDER (Issue 8): Style the answer buttons, feedback (green/red), and results screen.
// PLACEHOLDER (Issue 7): Make the answer buttons easy to tap on mobile.
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
            : "/api/quiz";

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to load quiz");
                }
                return response.json();
            })
            .then((data: QuizQuestion[]) => setQuestions(data))
            .catch(() => setLoadError(true));
    }, [countryId]);

    // Loading failed.
    if (loadError) {
        return <p role="alert">Sorry, the quiz could not be loaded. Please try again later.</p>;
    }

    // Still loading.
    if (!questions) {
        return <p aria-live="polite">Loading quiz...</p>;
    }

    // No questions available.
    if (questions.length === 0) {
        return (
            <p>
                No quiz questions available yet.{" "}
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
        <section>
            {/* Progress and score */}
            <p>
                Question {current + 1} of {questions.length} · Score: {score}
            </p>

            {/* Question and answer buttons */}
            <fieldset>
                <legend>{question.question}</legend>
                {question.options.map((option) => (
                    <p key={option}>
                        <button
                            type="button"
                            onClick={() => choose(option)}
                            disabled={answered}
                            aria-pressed={selected === option}
                        >
                            {option}
                        </button>
                    </p>
                ))}
            </fieldset>

            {/* Right or wrong feedback, read aloud by screen readers */}
            <p aria-live="polite">
                {answered &&
                    (selected === question.correctAnswer
                        ? "Correct!"
                        : `Not quite. The correct answer is ${question.correctAnswer}.`)}
            </p>

            {/* Next button, shown after answering */}
            {answered && (
                <button type="button" onClick={next}>
                    {current + 1 < questions.length ? "Next question" : "See results"}
                </button>
            )}
        </section>
    );
}
