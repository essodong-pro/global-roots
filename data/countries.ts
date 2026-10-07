// Basic facts about a country.
export type Country = {
    id: number; // Unique id, used in URLs like /countries/1
    name: string;
    region: string; // Used to group countries on the map
    capital: string;
    language: string;
    currency: string;
    description: string; // Short summary shown on cards
};

// Mock list of countries.
// When adding a country, also add its cultural info, a map position in
// components/CulturalMap.tsx, and (optionally) stories and quiz questions.
export const countries: Country[] = [
    {
        id: 1,
        name: "Togo",
        region: "West Africa",
        capital: "Lome",
        language: "French",
        currency: "West African CFA franc",
        description:
            "Togo is a West African country known for its diverse cultures, traditional festivals, music, food, and coastal communities.",
    },
    {
        id: 2,
        name: "Ghana",
        region: "West Africa",
        capital: "Accra",
        language: "English",
        currency: "Ghanaian cedi",
        description:
            "Ghana is known for its rich history, colorful festivals, traditional clothing, music, and diverse cultural traditions.",
    },
    {
        id: 3,
        name: "Japan",
        region: "East Asia",
        capital: "Tokyo",
        language: "Japanese",
        currency: "Japanese yen",
        description:
            "Japan combines ancient traditions with modern culture and is known for its customs, cuisine, festivals, and arts.",
    },
    {
        id: 4,
        name: "Brazil",
        region: "South America",
        capital: "Brasilia",
        language: "Portuguese",
        currency: "Brazilian real",
        description:
            "Brazil has a diverse cultural heritage expressed through music, dance, food, festivals, and regional traditions.",
    },
    {
        id: 5,
        name: "France",
        region: "Europe",
        capital: "Paris",
        language: "French",
        currency: "Euro",
        description:
            "France has a long cultural history including cuisine, fashion, art, architecture, celebrations, and regional traditions.",
    },
    {
        id: 6,
        name: "India",
        region: "South Asia",
        capital: "New Delhi",
        language: "Hindi and English",
        currency: "Indian rupee",
        description:
            "India is home to many languages, religions, cuisines, celebrations, clothing styles, and cultural traditions.",
    },
];