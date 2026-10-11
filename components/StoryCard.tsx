'use client';

import { useState, type FormEvent } from 'react';
import type { Story } from '@/data/stories';

type StoryCardProps = {
  story: Story;
  countryName?: string;
  canEdit?: boolean;
};

export default function StoryCard({
  story,
  countryName,
  canEdit = false,
}: StoryCardProps) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(story.title);
  const [content, setContent] = useState(story.content);
  const [status, setStatus] = useState('');
  const [deleted, setDeleted] = useState(false);

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('Saving...');
    const response = await fetch(`/api/stories/${story.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    setStatus(
      response.ok
        ? 'Story updated.'
        : 'Could not update story. Please try again.'
    );
    if (response.ok) setEditing(false);
  }

  async function remove() {
    if (!window.confirm('Delete this story? This cannot be undone.')) return;
    const response = await fetch(`/api/stories/${story.id}`, {
      method: 'DELETE',
    });
    if (response.ok) setDeleted(true);
    else setStatus('Could not delete story. Please try again.');
  }

  if (deleted) return null;

  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      {editing ? (
        <form onSubmit={save} className="space-y-3">
          <label className="block text-sm font-semibold text-slate-800">
            Title
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              minLength={3}
              maxLength={100}
              required
              className="mt-1 block min-h-11 w-full rounded-lg border border-slate-300 px-3"
            />
          </label>
          <label className="block text-sm font-semibold text-slate-800">
            Story or recipe
            <textarea
              value={content}
              onChange={(event) => setContent(event.target.value)}
              minLength={20}
              maxLength={5000}
              required
              rows={5}
              className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2"
            />
          </label>
          <button className="min-h-10 rounded-lg bg-green-800 px-4 font-semibold text-white">
            Save changes
          </button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="ml-3 min-h-10 px-2 font-semibold text-slate-700 underline"
          >
            Cancel
          </button>
        </form>
      ) : (
        <>
          <h3 className="text-xl font-bold text-slate-900">{story.title}</h3>
          <p className="mt-2 text-sm text-slate-600">
            <span className="rounded-full bg-green-50 px-2 py-1 font-semibold text-green-900">
              {story.type === 'recipe' ? 'Recipe' : 'Story'}
            </span>
            {countryName && ` · ${countryName}`} · By {story.author} ·{' '}
            <time dateTime={story.date}>{story.date}</time>
          </p>
          <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
            {story.content}
          </p>
          {canEdit && (
            <div className="mt-4 flex gap-4 border-t border-slate-100 pt-4">
              <button
                onClick={() => setEditing(true)}
                className="font-semibold text-green-800 underline"
              >
                Edit
              </button>
              <button
                onClick={remove}
                className="font-semibold text-red-700 underline"
              >
                Delete
              </button>
            </div>
          )}
        </>
      )}
      <p
        role="status"
        aria-live="polite"
        className="mt-3 text-sm text-slate-600"
      >
        {status}
      </p>
    </article>
  );
}
