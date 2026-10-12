'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { countries } from '@/data/countries';
import { culturalInformation } from '@/data/cultural-information';

type Position = [number, number];
type WorldFeature = {
  properties: { ADMIN: string; CONTINENT: string };
  geometry: {
    type: 'Polygon' | 'MultiPolygon';
    coordinates: Position[][] | Position[][][];
  };
};
type WorldMapData = { features: WorldFeature[] };

const regionHighlights: Record<string, string> = {
  'West Africa': 'Explore a vibrant mix of languages, music, textiles, and community celebrations across the Gulf of Guinea.',
  'East Asia': 'Discover seasonal festivals, regional cuisines, and living traditions alongside contemporary culture.',
  'South America': 'Explore cultural traditions shaped by Indigenous, African, and European heritage, with strong regional diversity.',
  Europe: 'Find distinct local identities, historic arts, and food traditions that vary from one region to another.',
  'South Asia': 'Explore a remarkable range of languages, faiths, cuisines, and celebrations across the region.',
  'Southern Africa': 'Explore the languages, communities, histories, and arts of southern Africa.',
  'North Africa': 'Discover the diverse communities and histories of the Mediterranean and Sahara regions.',
  'Southeast Asia': 'Explore island and mainland cultures, languages, foodways, and celebrations.',
  Oceania: 'Discover the distinct Indigenous and island cultures of the Pacific and Australia.',
  'North America': 'Explore the many Indigenous, regional, and contemporary cultures of North America.',
  Caribbean: 'Discover the island cultures, music, languages, and cuisines of the Caribbean.',
  'Southern Europe': 'Explore the regional languages, histories, food, and arts of southern Europe.',
  'Central Europe': 'Discover the multilingual communities and local traditions of central Europe.',
  'Northern Europe': "Explore northern Europe's varied languages, communities, and seasonal traditions.",
  'Eastern Europe': 'Discover the regional histories, languages, and cultural traditions of eastern Europe.',
  'Middle East': "Explore the region's many languages, communities, histories, and living traditions.",
};

const regionNames = Array.from(new Set(countries.map((country) => country.region)));

const continentLabels = [
  { name: 'NORTH AMERICA', x: 18, y: 29 },
  { name: 'SOUTH AMERICA', x: 31, y: 64 },
  { name: 'EUROPE', x: 51, y: 29 },
  { name: 'AFRICA', x: 51, y: 51 },
  { name: 'ASIA', x: 72, y: 31 },
  { name: 'OCEANIA', x: 85, y: 74 },
];

function getCountryForFeature(featureName: string) {
  const normalized = featureName.toLowerCase().replace(/[^a-z]/g, '');
  const aliases: Record<string, string> = {
    unitedstatesofamerica: 'unitedstates',
    republicofkorea: 'southkorea',
    turkiye: 'turkey',
  };
  const target = aliases[normalized] ?? normalized;
  return countries.find(
    (country) => country.name.toLowerCase().replace(/[^a-z]/g, '') === target
  );
}

function project([longitude, latitude]: Position): Position {
  return [((longitude + 180) / 360) * 1000, ((90 - latitude) / 180) * 500];
}

function ringToPath(ring: Position[]) {
  return ring
    .map((position, index) => {
      const [x, y] = project(position);
      return `${index === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ') + ' Z';
}

function featureToPath(feature: WorldFeature) {
  const polygons =
    feature.geometry.type === 'Polygon'
      ? [feature.geometry.coordinates as Position[][]]
      : (feature.geometry.coordinates as Position[][][]);
  return polygons
    .flatMap((polygon) => polygon.map(ringToPath))
    .join(' ');
}

function getCulturalHighlights(countryId: number): { label: string; detail: string }[] {
  const information = culturalInformation.find((item) => item.countryId === countryId);
  if (!information && countryId === 7) {
    return [
      { label: 'Music', detail: 'Afrobeats and many regional music traditions' },
      { label: 'Food', detail: 'Jollof rice and diverse regional cuisines' },
      { label: 'Celebrations', detail: "Festivals reflecting Nigeria's many communities" },
    ];
  }
  if (!information) {
    const country = countries.find((item) => item.id === countryId);
    if (!country) return [];
    return [
      { label: 'Capital', detail: country.capital },
      { label: 'Language', detail: country.language },
      { label: 'Culture', detail: country.description },
    ];
  }
  return [
    { label: 'Celebrations', detail: information.celebrations.join(', ') },
    { label: 'Food', detail: information.cuisine.join(', ') },
    { label: 'Traditions', detail: information.traditions[0] },
  ];
}

export default function CulturalMap() {
  const [selectedCountryId, setSelectedCountryId] = useState(2);
  const [selectedRegion, setSelectedRegion] = useState('West Africa');
  const [mapData, setMapData] = useState<WorldMapData | null>(null);
  const [mapError, setMapError] = useState(false);
  const selectedCountry = countries.find((country) => country.id === selectedCountryId) ?? countries[0];
  const countriesInRegion = useMemo(
    () => countries.filter((country) => country.region === selectedRegion),
    [selectedRegion]
  );

  useEffect(() => {
    fetch('/world-countries.geojson')
      .then((response) => {
        if (!response.ok) throw new Error('Map data could not be loaded');
        return response.json() as Promise<WorldMapData>;
      })
      .then(setMapData)
      .catch(() => setMapError(true));
  }, []);

  function selectRegion(region: string) {
    setSelectedRegion(region);
    const firstCountry = countries.find((country) => country.region === region);
    if (firstCountry) setSelectedCountryId(firstCountry.id);
  }

  function selectCountry(countryId: number) {
    const country = countries.find((item) => item.id === countryId);
    if (!country) return;
    setSelectedCountryId(countryId);
    setSelectedRegion(country.region);
  }

  return (
    <main className="flex-1 bg-slate-50 text-slate-900">
      <section className="bg-green-900 px-5 py-12 text-white sm:px-8 sm:py-16">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-orange-300">A world of living traditions</p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Explore culture, one place at a time.</h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-green-100 sm:text-lg">
            Choose a region or a country on the world map to explore cultural highlights and the countries in each region.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Browse by region</h2>
            <p className="mt-1 text-sm text-slate-600">Select a region to see every country in it.</p>
          </div>
          <p className="text-sm text-slate-500">{countries.length} countries to explore</p>
        </div>

        <div aria-label="Filter countries by region" role="group" className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {regionNames.map((region) => (
            <button
              key={region}
              type="button"
              aria-pressed={selectedRegion === region}
              onClick={() => selectRegion(region)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${
                selectedRegion === region
                  ? 'border-green-800 bg-green-800 text-white'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-green-700 hover:text-green-800'
              }`}
            >
              {region}
            </button>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.55fr)_minmax(19rem,0.85fr)]">
          <section aria-labelledby="map-heading" className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 px-5 py-4 sm:px-6">
              <div>
                <h2 id="map-heading" className="font-bold text-slate-900">World map</h2>
                <p className="mt-1 text-sm text-slate-500">Select a highlighted country to open its profile.</p>
              </div>
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-800">{selectedRegion}</span>
            </div>

            <div className="relative aspect-[2/1] min-h-64 overflow-hidden border-y border-sky-100 bg-sky-50 sm:min-h-80">
              <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 1000 500"
                role="group"
                aria-label={`Interactive world map. ${selectedRegion} is selected.`}
                preserveAspectRatio="xMidYMid meet"
              >
                <rect width="1000" height="500" fill="#eaf5fa" />
                {[100, 200, 300, 400].map((y) => <path key={y} d={`M0 ${y}H1000`} stroke="#d4e8f0" strokeDasharray="3 8" />)}
                {mapData?.features.map((feature) => {
                  const country = getCountryForFeature(feature.properties.ADMIN);
                  const isSelected = country?.id === selectedCountryId;
                  const isInRegion = country?.region === selectedRegion;
                  const clickable = Boolean(country);
                  return (
                    <path
                      key={feature.properties.ADMIN}
                      d={featureToPath(feature)}
                      fill={isSelected ? '#f97316' : isInRegion ? '#18804a' : '#cbd5d1'}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 1.8 : 1.1}
                      strokeLinejoin="round"
                      className={clickable ? 'cursor-pointer transition-colors hover:fill-orange-400 focus:outline-none' : undefined}
                      role={clickable ? 'button' : undefined}
                      tabIndex={clickable ? 0 : undefined}
                      aria-label={clickable ? `${country!.name}, ${country!.region}` : undefined}
                      aria-pressed={clickable ? isSelected : undefined}
                      onClick={clickable ? () => selectCountry(country!.id) : undefined}
                      onKeyDown={clickable ? (event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();
                          selectCountry(country!.id);
                        }
                      } : undefined}
                    />
                  );
                })}
              </svg>

              {continentLabels.map((continent) => (
                <span
                  key={continent.name}
                  aria-hidden="true"
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-[8px] font-bold tracking-[0.12em] text-slate-500/70 sm:text-[10px]"
                  style={{ left: `${continent.x}%`, top: `${continent.y}%` }}
                >
                  {continent.name}
                </span>
              ))}

              {!mapData && (
                <div className="absolute inset-0 flex items-center justify-center bg-sky-50/80 text-sm text-slate-600">
                  {mapError ? 'The world map could not be loaded.' : 'Loading world map…'}
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-5 py-4 text-xs text-slate-600 sm:px-6">
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-orange-500" />Selected country</span>
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-800" />Countries in {selectedRegion}</span>
              <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-slate-300" />Other countries</span>
            </div>
          </section>

          <aside aria-live="polite" aria-labelledby="country-heading" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-7">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-orange-700">{selectedCountry.region}</p>
            <h2 id="country-heading" className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{selectedCountry.name}</h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">{regionHighlights[selectedCountry.region]}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">Capital: {selectedCountry.capital}</span>
              <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700">Language: {selectedCountry.language}</span>
            </div>
            <div className="mt-7 border-t border-slate-100 pt-6">
              <h3 className="text-base font-bold text-slate-900">Cultural highlights</h3>
              <ul className="mt-4 space-y-4">
                {getCulturalHighlights(selectedCountry.id).map((highlight) => (
                  <li key={highlight.label} className="flex gap-3">
                    <span aria-hidden="true" className="mt-1 h-2 w-2 shrink-0 rounded-full bg-orange-500" />
                    <div>
                      <p className="text-sm font-semibold text-slate-800">{highlight.label}</p>
                      <p className="mt-0.5 text-sm leading-5 text-slate-600">{highlight.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <Link href={`/countries/${selectedCountry.id}`} className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-green-800 px-4 py-3 text-sm font-semibold text-white transition hover:bg-green-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-800">
              Explore {selectedCountry.name} culture <span aria-hidden="true" className="ml-2">→</span>
            </Link>
          </aside>
        </div>

        <section aria-labelledby="region-countries-heading" className="mt-7 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 id="region-countries-heading" className="text-lg font-bold text-slate-900">Countries in {selectedRegion}</h2>
            <p className="text-sm text-slate-500">{countriesInRegion.length} {countriesInRegion.length === 1 ? 'country' : 'countries'}</p>
          </div>
          {countriesInRegion.length ? (
            <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {countriesInRegion.map((country) => (
                <li key={country.id}>
                  <button
                    type="button"
                    onClick={() => selectCountry(country.id)}
                    aria-pressed={country.id === selectedCountryId}
                    className={`w-full rounded-xl border px-4 py-3 text-left text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 ${country.id === selectedCountryId ? 'border-green-800 bg-green-50 text-green-900' : 'border-slate-200 text-slate-700 hover:border-green-700 hover:text-green-800'}`}
                  >
                    {country.name}<span className="float-right text-slate-400">→</span>
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm text-slate-600">No countries are currently listed for this region.</p>
          )}
        </section>

        <div className="mt-8 rounded-2xl border border-orange-100 bg-orange-50 px-5 py-4 text-sm leading-6 text-slate-700">
          Cultural practices vary within every country and community. These highlights are starting points for further discovery.
        </div>
        <p className="mt-3 text-xs text-slate-500">Map boundaries and geographic data: Natural Earth, public domain.</p>
      </section>
    </main>
  );
}
