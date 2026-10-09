// Story form checks, shared by the form (in the browser) and POST /api/stories (on the server).
import { getCountryById, type NewStory } from "@/lib/mock-data-service";

// Raw form values; everything is a string because it comes from inputs.
export type StoryFormValues = {
    countryId: string;
    title: string;
    author: string;
    type: string;
    content: string;
};

// Error message for each invalid field.
export type StoryErrors = Partial<Record<keyof StoryFormValues, string>>;

// Shortest allowed story or recipe text.
export const MIN_CONTENT_LENGTH = 20;

// Check the form values. Returns a clean story if valid, or error messages if not.
export function validateStory(
    values: StoryFormValues,
): { story?: NewStory; errors: StoryErrors } {
    const errors: StoryErrors = {};
    const countryId = Number(values.countryId);

    // Each field needs a valid value.
    if (!values.countryId || !getCountryById(countryId)) {
        errors.countryId = "Please choose a country.";
    }

    if (!values.title.trim()) {
        errors.title = "Title is required.";
    }

    if (!values.author.trim()) {
        errors.author = "Your name is required.";
    }

    if (values.type !== "story" && values.type !== "recipe") {
        errors.type = "Choose story or recipe.";
    }

    if (values.content.trim().length < MIN_CONTENT_LENGTH) {
        errors.content = `Content must be at least ${MIN_CONTENT_LENGTH} characters.`;
    }

    // Any errors: return only the errors.
    if (Object.keys(errors).length > 0) {
        return { errors };
    }

    // All valid: return the story with trimmed text and a numeric country id.
    return {
        errors,
        story: {
            countryId,
            title: values.title.trim(),
            author: values.author.trim(),
            type: values.type as NewStory["type"],
            content: values.content.trim(),
        },
    };
}
