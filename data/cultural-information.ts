// Cultural details for one country (one record per country).
export type CulturalInformation = {
    id: number;
    countryId: number; // Links to Country.id
    history: string;
    traditions: string[];
    etiquette: string[];
    celebrations: string[];
    cuisine: string[];
};

// Mock cultural details, one entry per country.
export const culturalInformation: CulturalInformation[] = [
    {
        id: 1,
        countryId: 1,
        history:
            "Togo has a diverse history shaped by many ethnic communities, regional kingdoms, trade, and French colonial influence before independence in 1960.",
        traditions: [
            "Traditional music and dance are important parts of community celebrations.",
            "Family and community gatherings often include shared meals and storytelling.",
            "Traditional crafts include weaving, pottery, and textile production.",
        ],
        etiquette: [
            "Greet people politely, especially elders.",
            "Respect community leaders and older family members.",
            "Hospitality and sharing food are important social practices.",
        ],
        celebrations: [
            "Independence Day",
            "Evala Festival",
            "Traditional regional festivals",
        ],
        cuisine: [
            "Fufu",
            "Akume",
            "Grilled fish",
            "Pate",
        ],
    },
    {
        id: 2,
        countryId: 2,
        history:
            "Ghana has a long history of kingdoms and trade, including the Asante Empire, followed by British colonial rule and independence in 1957.",
        traditions: [
            "Kente weaving is an important traditional art.",
            "Family and community gatherings are central to social life.",
            "Traditional storytelling and drumming remain important cultural practices.",
        ],
        etiquette: [
            "Greet others respectfully.",
            "Show respect toward elders.",
            "Sharing food is an important part of hospitality.",
        ],
        celebrations: [
            "Homowo Festival",
            "Akwasidae",
            "Independence Day",
        ],
        cuisine: [
            "Jollof rice",
            "Waakye",
            "Fufu",
            "Banku",
        ],
    },
    {
        id: 3,
        countryId: 3,
        history:
            "Japan has a long history of imperial traditions, samurai culture, modernization during the Meiji period, and postwar development.",
        traditions: [
            "Bowing is commonly used as a respectful greeting.",
            "Removing shoes indoors is common in many settings.",
            "Tea ceremony and seasonal celebrations are important cultural traditions.",
        ],
        etiquette: [
            "Bow when greeting or showing respect.",
            "Avoid loud conversations in quiet public spaces.",
            "Follow local rules about removing shoes.",
        ],
        celebrations: [
            "Shogatsu (New Year)",
            "Hanami",
            "Obon",
        ],
        cuisine: [
            "Sushi",
            "Ramen",
            "Tempura",
            "Miso soup",
        ],
    },
    {
        id: 4,
        countryId: 4,
        history:
            "Brazil has Indigenous, African, European, and other cultural influences that have shaped its regional traditions, music, cuisine, and celebrations.",
        traditions: [
            "Music and dance are important parts of Brazilian cultural life.",
            "Family and community gatherings are common.",
            "Regional traditions vary significantly across the country.",
        ],
        etiquette: [
            "Greetings are generally warm and friendly.",
            "Personal relationships are important in social situations.",
            "Respect local customs and regional differences.",
        ],
        celebrations: [
            "Carnival",
            "Festa Junina",
            "Independence Day",
        ],
        cuisine: [
            "Feijoada",
            "Pao de queijo",
            "Acaraje",
            "Brigadeiro",
        ],
    },
    {
        id: 5,
        countryId: 5,
        history:
            "France has a long cultural history shaped by kingdoms, the French Revolution, regional traditions, art, literature, and cuisine.",
        traditions: [
            "Food and shared meals have an important place in social life.",
            "French regional cultures have distinct traditions and cuisines.",
            "Art, literature, and fashion have played major roles in French cultural history.",
        ],
        etiquette: [
            "A polite greeting is expected when entering many shops or establishments.",
            "Using polite forms of address is important in formal situations.",
            "Meals are often treated as social occasions.",
        ],
        celebrations: [
            "Bastille Day",
            "Fete de la Musique",
            "Christmas celebrations",
        ],
        cuisine: [
            "Baguette",
            "Crepes",
            "Ratatouille",
            "Coq au vin",
        ],
    },
    {
        id: 6,
        countryId: 6,
        history:
            "India has a long and diverse history influenced by many civilizations, languages, religions, kingdoms, and regional cultures.",
        traditions: [
            "Family and community traditions vary widely across regions.",
            "Traditional clothing differs by region and occasion.",
            "Many celebrations include music, food, religious or cultural ceremonies, and family gatherings.",
        ],
        etiquette: [
            "Respect elders and family members.",
            "Remove shoes when entering some homes or religious places.",
            "Be respectful of regional and religious customs.",
        ],
        celebrations: [
            "Diwali",
            "Holi",
            "Eid celebrations",
        ],
        cuisine: [
            "Biryani",
            "Samosas",
            "Dosa",
            "Butter chicken",
        ],
    },
];