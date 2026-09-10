"use client";

import { FormEvent, useMemo, useState } from "react";

const countries = [
  {
    name: "Japan",
    region: "East Asia",
    flag: "JP",
    color: "coral",
    fact: "Omotenashi is the practice of anticipating a guest's needs with care.",
    tags: ["Etiquette", "Tea culture"],
  },
  {
    name: "Ghana",
    region: "West Africa",
    flag: "GH",
    color: "gold",
    fact: "Kente weaving uses bold patterns to tell stories about history and identity.",
    tags: ["Textiles", "Community"],
  },
  {
    name: "Mexico",
    region: "North America",
    flag: "MX",
    color: "leaf",
    fact: "Día de los Muertos honors loved ones through food, flowers, and remembrance.",
    tags: ["Celebrations", "Cuisine"],
  },
  {
    name: "Norway",
    region: "Northern Europe",
    flag: "NO",
    color: "sky",
    fact: "Friluftsliv describes a deep cultural connection to outdoor life in every season.",
    tags: ["Nature", "Daily life"],
  },
];

const quizQuestion = {
  prompt: "What does 'friluftsliv' celebrate in Norway?",
  answers: ["Outdoor life", "A harvest dance", "A formal greeting"],
  correct: 0,
};

export default function Home() {
  const [query, setQuery] = useState("");
  const [activeRegion, setActiveRegion] = useState("All regions");
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const regions = ["All regions", ...new Set(countries.map((country) => country.region))];
  const filteredCountries = useMemo(
    () =>
      countries.filter((country) => {
        const matchesQuery = country.name.toLowerCase().includes(query.toLowerCase());
        const matchesRegion = activeRegion === "All regions" || country.region === activeRegion;
        return matchesQuery && matchesRegion;
      }),
    [activeRegion, query],
  );

  function submitStory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStorySubmitted(true);
  }

  return (
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="GlobalRoots home">
          <span className="brand-mark">◎</span>
          <span>Global<span>Roots</span></span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#explore">Explore</a>
          <a href="#stories">Stories</a>
          <a href="#quiz">Quiz</a>
        </nav>
        <button className="outline-button" type="button">Sign in</button>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">A field guide to being human</p>
            <h1>Find the familiar in <em>every</em> culture.</h1>
            <p className="hero-text">Explore the rituals, flavors, and everyday wisdom that connect us across borders.</p>
            <a className="primary-button" href="#explore">Start exploring <span>↘</span></a>
          </div>
          <div className="hero-art" aria-label="Illustration of a world map with location markers" role="img">
            <div className="map-grid" />
            <span className="map-continent continent-one" />
            <span className="map-continent continent-two" />
            <span className="map-continent continent-three" />
            <span className="map-pin pin-one">JP</span>
            <span className="map-pin pin-two">GH</span>
            <span className="map-pin pin-three">MX</span>
            <span className="map-pin pin-four">NO</span>
            <span className="map-label label-one">small moments<br />big meaning</span>
          </div>
        </section>

        <section className="explore-section" id="explore">
          <div className="section-heading">
            <div><p className="eyebrow">Browse the atlas</p><h2>Start somewhere.</h2></div>
            <p className="section-note">Four places to begin your next conversation.</p>
          </div>
          <div className="controls">
            <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search countries" aria-label="Search countries" /></label>
            <div className="region-filters" aria-label="Filter by region">
              {regions.map((region) => <button className={activeRegion === region ? "filter active" : "filter"} key={region} onClick={() => setActiveRegion(region)} type="button">{region}</button>)}
            </div>
          </div>
          <div className="country-grid">
            {filteredCountries.map((country) => (
              <article className={`country-card ${country.color}`} key={country.name}>
                <div className="country-top"><span className="country-flag">{country.flag}</span><span className="arrow">↗</span></div>
                <p className="country-region">{country.region}</p><h3>{country.name}</h3><p className="country-fact">{country.fact}</p>
                <div className="tag-row">{country.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>
          {filteredCountries.length === 0 && <p className="empty-state">No country matches that search yet.</p>}
        </section>

        <section className="feature-band" id="stories">
          <div><p className="eyebrow">From the community</p><h2>Every tradition<br /><em>has a story.</em></h2><p className="feature-text">Share the recipe, ritual, or small act of belonging that feels like home to you.</p></div>
          <form className="story-form" onSubmit={submitStory}><label>Your name<input required name="name" placeholder="How should we call you?" /></label><label>What would you like to share?<textarea required name="story" placeholder="A dish, a greeting, a celebration..." rows={3} /></label><button className="light-button" type="submit">Share a story <span>→</span></button>{storySubmitted && <p className="success-message" role="status">Thanks for adding your perspective.</p>}</form>
        </section>

        <section className="quiz-section" id="quiz"><div><p className="eyebrow">One-minute quiz</p><h2>Curiosity looks<br /><em>good on you.</em></h2></div><div className="quiz-card"><p className="quiz-count">01 / 01</p><h3>{quizQuestion.prompt}</h3><div className="answers">{quizQuestion.answers.map((answer, index) => <button className={selectedAnswer === index ? "answer selected" : "answer"} key={answer} onClick={() => setSelectedAnswer(index)} type="button">{answer}<span>{selectedAnswer === index ? (index === quizQuestion.correct ? "✓" : "×") : "○"}</span></button>)}</div>{selectedAnswer !== null && <p className="quiz-result" role="status">{selectedAnswer === quizQuestion.correct ? "That's right. Keep exploring." : "Not quite, but now you know."}</p>}</div></section>
      </main>
      <footer><span>GlobalRoots</span><span>Learn widely. Live kindly.</span><span>© 2026</span></footer>
    </div>
  );
}
