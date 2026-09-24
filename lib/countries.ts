// PLACEHOLDER (Issue 6): Replace this mock file with the real data service / DB layer.
// Keep the same Country shape (or update API + pages if the schema changes).

export type Country = {
  id: number;
  name: string;
  summary: string;
  history: string;
  etiquette: string;
  celebrations: string;
};

export const countries: Country[] = [
  {
    id: 1,
    name: "Nigeria",
    summary: "West African nation known for diverse ethnic groups and vibrant culture.",
    history:
      "Nigeria has a long history of kingdoms and trade, later shaped by colonial rule and independence in 1960.",
    etiquette:
      "Greet elders with respect. Hospitality is important; accept food or drink when offered when possible.",
    celebrations:
      "Independence Day (Oct 1), New Yam festivals, and many local cultural celebrations across regions.",
  },
  {
    id: 2,
    name: "Mexico",
    summary: "North American country with Indigenous and Spanish cultural roots.",
    history:
      "Home to civilizations such as the Maya and Aztec, then Spanish colonial history and independence in 1821.",
    etiquette:
      "Greetings are warm. Use polite titles (Señor/Señora). Meals and family time are valued.",
    celebrations:
      "Día de los Muertos, Independence Day (Sept 16), and regional fiestas.",
  },
  {
    id: 3,
    name: "United States",
    summary: "Large North American country with many regional cultures and traditions.",
    history:
      "Formed from colonies and later expansion; independence declared in 1776 with ongoing cultural diversity.",
    etiquette:
      "Handshakes are common. Personal space matters. Punctuality is often expected in professional settings.",
    celebrations:
      "Independence Day (July 4), Thanksgiving, and many community and cultural festivals.",
  },
  {
    id: 4,
    name: "England",
    summary: "Country within the United Kingdom with deep historical landmarks and customs.",
    history:
      "From early kingdoms through empire and modern parliamentary democracy; rich literary and civic traditions.",
    etiquette:
      "Queue politely. Saying please/thank you is expected. Avoid overly personal questions with new acquaintances.",
    celebrations:
      "Guy Fawkes Night, Trooping the Colour, and local village fairs and festivals.",
  },
  {
    id: 5,
    name: "Japan",
    summary: "East Asian island nation known for tradition blended with modernity.",
    history:
      "Long imperial history, feudal eras, Meiji modernization, and post-war recovery into a major global culture.",
    etiquette:
      "Bow when greeting. Remove shoes indoors when expected. Be mindful of quiet public spaces.",
    celebrations:
      "New Year (Shōgatsu), cherry blossom season gatherings, and Obon.",
  },
];

export function getCountries(): Country[] {
  // PLACEHOLDER (Issue 6): swap for DB / service call
  return countries;
}

export function getCountryById(id: number): Country | undefined {
  // PLACEHOLDER (Issue 6): swap for DB / service call
  return countries.find((country) => country.id === id);
}
