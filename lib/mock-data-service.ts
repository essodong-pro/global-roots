// Mock data service: the one place pages and API routes get data from.
// To move to a real database later, change these functions and keep their names.
import { countries, type Country } from "@/data/countries";
import {
    culturalInformation,
    type CulturalInformation,
} from "@/data/cultural-information";
import { stories as seedStories, type Story } from "@/data/stories";
import {
    quizQuestions,
    type QuizQuestion,
} from "@/data/quiz-questions";

// All countries.
export function getCountries(): Country[] {
    return countries;
}

// One country by id, or undefined if it doesn't exist.
export function getCountryById(id: number): Country | undefined {
    return countries.find((country) => country.id === id);
}

// Cultural details (history, traditions, etiquette...) for one country.
export function getCulturalInformation(
    countryId: number,
): CulturalInformation | undefined {
    return culturalInformation.find(
        (information) => information.countryId === countryId,
    );
}

// Pages and route handlers can load separate copies of this module, so the
// in-memory story list lives on globalThis to be shared between them.
const globalStore = globalThis as typeof globalThis & { __stories?: Story[] };
const stories = (globalStore.__stories ??= [...seedStories]);

// All stories, or only one country's stories if a countryId is given.
export function getStories(countryId?: number): Story[] {
    if (countryId === undefined) {
        return stories;
    }

    return stories.filter((story) => story.countryId === countryId);
}

// A story as submitted by a user (the id and date are added when saving).
export type NewStory = Omit<Story, "id" | "date">;

// Save a new story with the next id and today's date.
// Stored in memory only: new stories are lost when the server restarts.
export function addStory(newStory: NewStory): Story {
    const story: Story = {
        ...newStory,
        id: Math.max(0, ...stories.map((item) => item.id)) + 1,
        date: new Date().toISOString().slice(0, 10),
    };

    stories.push(story);

    return story;
}

// All quiz questions, or only one country's questions if a countryId is given.
export function getQuizQuestions(countryId?: number): QuizQuestion[] {
    if (countryId === undefined) {
        return quizQuestions;
    }

    return quizQuestions.filter(
        (question) => question.countryId === countryId,
    );
}

// Everything about one country in one object (used by the country detail page).
export function getCountryProfile(id: number) {
    const country = getCountryById(id);

    if (!country) {
        return undefined;
    }

    return {
        country,
        culturalInformation: getCulturalInformation(id),
        stories: getStories(id),
        quizQuestions: getQuizQuestions(id),
    };
}
