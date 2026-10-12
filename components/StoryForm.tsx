'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import type { Country } from '@/data/countries';
import {
  MIN_CONTENT_LENGTH,
  validateStory,
  type StoryErrors,
  type StoryFormValues,
} from '@/lib/story-validation';

// The form receives the list of countries for the dropdown.
type StoryFormProps = {
  countries: Country[];
};

// Starting values; the form resets to these after a successful submit.
const emptyValues: StoryFormValues = {
  countryId: '',
  title: '',
  author: '',
  type: 'story',
  content: '',
};

// Form to submit a story or recipe. It checks the fields, then sends them to POST /api/stories.
export default function StoryForm({ countries }: StoryFormProps) {
  const router = useRouter();

  // Current field values, error messages, and submit status.
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<StoryErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'failed'>(
    'idle'
  );

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
      setStatus('idle');
      return;
    }

    setStatus('sending');

    try {
      // Send the story to the API.
      const response = await fetch('/api/stories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      // The server rejected it: show its error messages.
      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as {
          errors?: StoryErrors;
        } | null;
        setErrors(data?.errors ?? {});
        setStatus('failed');
        return;
      }

      // Saved: clear the form and reload the story list.
      setValues(emptyValues);
      setStatus('sent');
      router.refresh();
    } catch {
      // Network error.
      setStatus('failed');
    }
  }

  // Accessibility attributes that mark a field as invalid and link it to its error.
  function errorProps(field: keyof StoryFormValues) {
    return {
      'aria-invalid': errors[field] ? true : undefined,
      'aria-describedby': errors[field] ? `${field}-error` : undefined,
    };
  }

  // The error message under a field, if it has one.
  function fieldError(field: keyof StoryFormValues) {
    return errors[field] ? (
      <p
        id={`${field}-error`}
        role="alert"
        className="mt-1 text-sm font-medium text-red-700"
      >
        {errors[field]}
      </p>
    ) : null;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Country */}
      <div>
        <label
          htmlFor="countryId"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Country
        </label>
        <select
          id="countryId"
          value={values.countryId}
          onChange={(event) => update('countryId', event.target.value)}
          {...errorProps('countryId')}
          className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
        >
          <option value="">Choose a country</option>
          {countries.map((country) => (
            <option key={country.id} value={country.id}>
              {country.name}
            </option>
          ))}
        </select>
      </div>
      {fieldError('countryId')}

      {/* Story or recipe */}
      <fieldset className="rounded-lg border border-slate-200 p-3">
        <legend className="px-1 text-sm font-semibold text-slate-800">
          Type
        </legend>
        <label className="mr-5 inline-flex min-h-10 cursor-pointer items-center gap-2 text-sm text-slate-800">
          <input
            type="radio"
            name="type"
            value="story"
            checked={values.type === 'story'}
            onChange={(event) => update('type', event.target.value)}
          />{' '}
          Story
        </label>
        <label className="inline-flex min-h-10 cursor-pointer items-center gap-2 text-sm text-slate-800">
          <input
            type="radio"
            name="type"
            value="recipe"
            checked={values.type === 'recipe'}
            onChange={(event) => update('type', event.target.value)}
          />{' '}
          Recipe
        </label>
      </fieldset>
      {fieldError('type')}

      {/* Title */}
      <div>
        <label
          htmlFor="title"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Title
        </label>
        <input
          id="title"
          value={values.title}
          onChange={(event) => update('title', event.target.value)}
          {...errorProps('title')}
          className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
        />
      </div>
      {fieldError('title')}

      {/* Author */}
      <div>
        <label
          htmlFor="author"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Your name
        </label>
        <input
          id="author"
          value={values.author}
          onChange={(event) => update('author', event.target.value)}
          {...errorProps('author')}
          className="min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
        />
      </div>
      {fieldError('author')}

      {/* Story or recipe text */}
      <div>
        <label
          htmlFor="content"
          className="mb-1.5 block text-sm font-semibold text-slate-800"
        >
          Story or recipe (at least {MIN_CONTENT_LENGTH} characters)
        </label>
        <textarea
          id="content"
          rows={6}
          value={values.content}
          onChange={(event) => update('content', event.target.value)}
          {...errorProps('content')}
          className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none focus:border-green-700 focus:ring-2 focus:ring-green-200"
        />
      </div>
      {fieldError('content')}

      {/* Submit button, disabled while sending */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="min-h-11 w-full rounded-lg bg-green-800 px-5 py-2.5 font-semibold text-white transition hover:bg-green-900 focus-visible:outline-offset-2 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {status === 'sending' ? 'Submitting...' : 'Submit'}
      </button>

      {/* Success or failure message, read aloud by screen readers */}
      <p
        aria-live="polite"
        className={
          status === 'failed'
            ? 'text-sm font-medium text-red-700'
            : 'text-sm font-medium text-green-800'
        }
      >
        {status === 'sent' && 'Thanks! Your submission was added.'}
        {status === 'failed' &&
          'Something went wrong. Please check the form and try again.'}
      </p>
    </form>
  );
}
