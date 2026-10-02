import { countries, type Country } from "@/data/countries";
import {
    culturalInformation,
    type CulturalInformation,
} from "@/data/cultural-information";
import { stories, type Story } from "@/data/stories";
import {
    quizQuestions,
    type QuizQuestion,
} from "@/data/quiz-questions";

export function getCountries(): Country[] {
    return countries;
}

export function getCountryById(id: number): Country | undefined {
    return countries.find((country) => country.id === id);
}

export function getCulturalInformation(
    countryId: number,
): CulturalInformation | undefined {
    return culturalInformation.find(
        (information) => information.countryId === countryId,
    );
}

export function getStories(countryId?: number): Story[] {
    if (countryId === undefined) {
        return stories;
    }

    return stories.filter((story) => story.countryId === countryId);
}

export function getQuizQuestions(countryId?: number): QuizQuestion[] {
    if (countryId === undefined) {
        return quizQuestions;
    }

    return quizQuestions.filter(
        (question) => question.countryId === countryId,
    );
}

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