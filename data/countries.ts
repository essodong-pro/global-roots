export type Country = {
    id: number;
    profileId?: number;
    name: string;
    region: string;
    capital: string;
    language: string;
    currency: string;
    description: string;
};

export const countries: Country[] = [
    {
        id: 1,
        name: "Togo",
        region: "West Africa",
        capital: "Lomé",
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
        capital: "Brasília",
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
    {
        id: 7,
        profileId: 1,
        name: "Nigeria",
        region: "West Africa",
        capital: "Abuja",
        language: "English",
        currency: "Nigerian naira",
        description:
            "Nigeria is home to hundreds of ethnic groups and languages, with vibrant music, food, festivals, and cultural traditions.",
    },
];