import type { Story } from "@/data/stories";

// The card receives one story and, optionally, its country name.
type StoryCardProps = {
    story: Story;
    countryName?: string;
};

// Shows one story or recipe in the stories list.
// PLACEHOLDER (Issue 8): Style as a card (border, padding, a badge for story/recipe).
export default function StoryCard({ story, countryName }: StoryCardProps) {
    return (
        <article>
            <h3>{story.title}</h3>

            {/* Type, country, author, and date */}
            <p>
                {story.type === "recipe" ? "Recipe" : "Story"}
                {countryName && ` · ${countryName}`} · By {story.author} ·{" "}
                <time dateTime={story.date}>{story.date}</time>
            </p>

            <p>{story.content}</p>
        </article>
    );
}
