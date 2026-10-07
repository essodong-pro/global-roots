"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import type { Country } from "@/data/countries";
import {
    MIN_CONTENT_LENGTH,
    validateStory,
    type StoryErrors,
    type StoryFormValues,
} from "@/lib/story-validation";

// The form receives the list of countries for the dropdown.
type StoryFormProps = {
    countries: Country[];
};

// Starting values; the form resets to these after a successful submit.
const emptyValues: StoryFormValues = {
    countryId: "",
    title: "",
    author: "",
    type: "story",
    content: "",
};

// Form to submit a story or recipe. It checks the fields, then sends them to POST /api/stories.
// PLACEHOLDER (Issue 8): Style the inputs. Right now they have no visible border
// (Tailwind removes the browser default), so they are hard to see, especially in dark mode.
// PLACEHOLDER (Issue 8): Style error messages (e.g. red text) and the submit button.
// PLACEHOLDER (Issue 7): Make inputs full width on mobile.
export default function StoryForm({ countries }: StoryFormProps) {
    const router = useRouter();

    // Current field values, error messages, and submit status.
    const [values, setValues] = useState(emptyValues);
    const [errors, setErrors] = useState<StoryErrors>({});
    const [status, setStatus] = useState<"idle" | "sending" | "sent" | "failed">("idle");

    // Update one field when the user types or picks an option.
    function update(field: keyof StoryFormValues, value: string) {
        setValues((current) => ({ ...current, [field]: value }));
    }

    // Runs when the form is submitted.
    async function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        // Check the fields first; stop and show errors if any are invalid.
        const result = validateStory(values);
        setErrors(result.errors);

        if (!result.story) {
            setStatus("idle");
            return;
        }

        setStatus("sending");

        try {
            // Send the story to the API.
            const response = await fetch("/api/stories", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });

            // The server rejected it: show its error messages.
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                setErrors(data.errors ?? {});
                setStatus("failed");
                return;
            }

            // Saved: clear the form and reload the story list.
            setValues(emptyValues);
            setStatus("sent");
            router.refresh();
        } catch {
            // Network error.
            setStatus("failed");
        }
    }

    // Accessibility attributes that mark a field as invalid and link it to its error.
    function errorProps(field: keyof StoryFormValues) {
        return {
            "aria-invalid": errors[field] ? true : undefined,
            "aria-describedby": errors[field] ? `${field}-error` : undefined,
        };
    }

    // The error message under a field, if it has one.
    function fieldError(field: keyof StoryFormValues) {
        return errors[field] ? (
            <p id={`${field}-error`} role="alert">
                {errors[field]}
            </p>
        ) : null;
    }

    return (
        <form onSubmit={handleSubmit} noValidate>
            {/* Country */}
            <p>
                <label htmlFor="countryId">Country</label>
                <br />
                <select
                    id="countryId"
                    value={values.countryId}
                    onChange={(event) => update("countryId", event.target.value)}
                    {...errorProps("countryId")}
                >
                    <option value="">Choose a country</option>
                    {countries.map((country) => (
                        <option key={country.id} value={country.id}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </p>
            {fieldError("countryId")}

            {/* Story or recipe */}
            <fieldset>
                <legend>Type</legend>
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="story"
                        checked={values.type === "story"}
                        onChange={(event) => update("type", event.target.value)}
                    />{" "}
                    Story
                </label>{" "}
                <label>
                    <input
                        type="radio"
                        name="type"
                        value="recipe"
                        checked={values.type === "recipe"}
                        onChange={(event) => update("type", event.target.value)}
                    />{" "}
                    Recipe
                </label>
            </fieldset>
            {fieldError("type")}

            {/* Title */}
            <p>
                <label htmlFor="title">Title</label>
                <br />
                <input
                    id="title"
                    value={values.title}
                    onChange={(event) => update("title", event.target.value)}
                    {...errorProps("title")}
                />
            </p>
            {fieldError("title")}

            {/* Author */}
            <p>
                <label htmlFor="author">Your name</label>
                <br />
                <input
                    id="author"
                    value={values.author}
                    onChange={(event) => update("author", event.target.value)}
                    {...errorProps("author")}
                />
            </p>
            {fieldError("author")}

            {/* Story or recipe text */}
            <p>
                <label htmlFor="content">
                    Story or recipe (at least {MIN_CONTENT_LENGTH} characters)
                </label>
                <br />
                <textarea
                    id="content"
                    rows={6}
                    value={values.content}
                    onChange={(event) => update("content", event.target.value)}
                    {...errorProps("content")}
                />
            </p>
            {fieldError("content")}

            {/* Submit button, disabled while sending */}
            <button type="submit" disabled={status === "sending"}>
                {status === "sending" ? "Submitting..." : "Submit"}
            </button>

            {/* Success or failure message, read aloud by screen readers */}
            <p aria-live="polite">
                {status === "sent" && "Thanks! Your submission was added."}
                {status === "failed" && "Something went wrong. Please check the form and try again."}
            </p>
        </form>
    );
}
