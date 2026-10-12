// Basic facts about a country.
export type Country = {
  // IDs are shared by country routes, cultural records, stories, and quizzes.
  id: number;
  name: string;
  region: string; // Used to group countries on the map
  capital: string;
  language: string;
  currency: string;
  description: string; // Short summary shown on cards
};

// Local country seed used by the home page and cultural map.
// Keep IDs and country fields in sync with the Supabase country seed SQL.
export const countries: Country[] = [
  {
    id: 1,
    name: 'Togo',
    region: 'West Africa',
    capital: 'Lome',
    language: 'French',
    currency: 'West African CFA franc',
    description:
      'Togo is a West African country known for its diverse cultures, traditional festivals, music, food, and coastal communities.',
  },
  {
    id: 2,
    name: 'Ghana',
    region: 'West Africa',
    capital: 'Accra',
    language: 'English',
    currency: 'Ghanaian cedi',
    description:
      'Ghana is known for its rich history, colorful festivals, traditional clothing, music, and diverse cultural traditions.',
  },
  {
    id: 3,
    name: 'Japan',
    region: 'East Asia',
    capital: 'Tokyo',
    language: 'Japanese',
    currency: 'Japanese yen',
    description:
      'Japan combines ancient traditions with modern culture and is known for its customs, cuisine, festivals, and arts.',
  },
  {
    id: 4,
    name: 'Brazil',
    region: 'South America',
    capital: 'Brasilia',
    language: 'Portuguese',
    currency: 'Brazilian real',
    description:
      'Brazil has a diverse cultural heritage expressed through music, dance, food, festivals, and regional traditions.',
  },
  {
    id: 5,
    name: 'France',
    region: 'Europe',
    capital: 'Paris',
    language: 'French',
    currency: 'Euro',
    description:
      'France has a long cultural history including cuisine, fashion, art, architecture, celebrations, and regional traditions.',
  },
  {
    id: 6,
    name: 'India',
    region: 'South Asia',
    capital: 'New Delhi',
    language: 'Hindi and English',
    currency: 'Indian rupee',
    description:
      'India is home to many languages, religions, cuisines, celebrations, clothing styles, and cultural traditions.',
  },
  {
    id: 7,
    name: 'Nigeria',
    region: 'West Africa',
    capital: 'Abuja',
    language: 'English',
    currency: 'Nigerian naira',
    description:
      'Nigeria is home to hundreds of ethnic groups and languages, with vibrant music, food, festivals, and cultural traditions.',
  },
  {
    id: 8,
    name: 'Benin',
    region: 'West Africa',
    capital: 'Porto-Novo',
    language: 'French',
    currency: 'West African CFA franc',
    description:
      'Benin is a West African country with a rich history, varied landscapes, and many living cultural traditions.',
  },
  {
    id: 9,
    name: 'Senegal',
    region: 'West Africa',
    capital: 'Dakar',
    language: 'French',
    currency: 'West African CFA franc',
    description:
      'Senegal is known for its Atlantic coast, diverse communities, music, cuisine, and historic cities.',
  },
  {
    id: 10,
    name: 'Kenya',
    region: 'East Africa',
    capital: 'Nairobi',
    language: 'Swahili and English',
    currency: 'Kenyan shilling',
    description:
      'Kenya has many languages and communities, with cultural life shaped by both urban and rural traditions.',
  },
  {
    id: 11,
    name: 'South Africa',
    region: 'Southern Africa',
    capital: 'Pretoria',
    language: '12 official languages',
    currency: 'South African rand',
    description:
      'South Africa is a multilingual country with diverse communities, histories, landscapes, and arts.',
  },
  {
    id: 12,
    name: 'Egypt',
    region: 'North Africa',
    capital: 'Cairo',
    language: 'Arabic',
    currency: 'Egyptian pound',
    description:
      'Egypt connects ancient history and contemporary life along the Nile and the Mediterranean coast.',
  },
  {
    id: 13,
    name: 'Morocco',
    region: 'North Africa',
    capital: 'Rabat',
    language: 'Arabic and Amazigh',
    currency: 'Moroccan dirham',
    description:
      "Morocco's cultural life reflects Amazigh, Arab, African, and Mediterranean influences.",
  },
  {
    id: 14,
    name: 'Ethiopia',
    region: 'East Africa',
    capital: 'Addis Ababa',
    language: 'Amharic and other regional languages',
    currency: 'Ethiopian birr',
    description:
      'Ethiopia is home to many languages and communities, with distinctive foodways, music, and historic traditions.',
  },
  {
    id: 15,
    name: 'Madagascar',
    region: 'East Africa',
    capital: 'Antananarivo',
    language: 'Malagasy and French',
    currency: 'Malagasy ariary',
    description:
      "Madagascar's island cultures and biodiversity are shaped by African and Asian connections.",
  },
  {
    id: 16,
    name: 'China',
    region: 'East Asia',
    capital: 'Beijing',
    language: 'Mandarin Chinese',
    currency: 'Renminbi (yuan)',
    description:
      "China's many regions have distinct languages, cuisines, festivals, and long-standing traditions.",
  },
  {
    id: 17,
    name: 'South Korea',
    region: 'East Asia',
    capital: 'Seoul',
    language: 'Korean',
    currency: 'South Korean won',
    description:
      'South Korea brings together historic customs, regional food traditions, and contemporary arts and media.',
  },
  {
    id: 18,
    name: 'Thailand',
    region: 'Southeast Asia',
    capital: 'Bangkok',
    language: 'Thai',
    currency: 'Thai baht',
    description:
      "Thailand's regional cultures are reflected in its festivals, crafts, cuisine, and everyday customs.",
  },
  {
    id: 19,
    name: 'Indonesia',
    region: 'Southeast Asia',
    capital: 'Jakarta',
    language: 'Indonesian',
    currency: 'Indonesian rupiah',
    description:
      'Indonesia is an archipelago of many communities, languages, regional cuisines, and cultural traditions.',
  },
  {
    id: 20,
    name: 'Vietnam',
    region: 'Southeast Asia',
    capital: 'Hanoi',
    language: 'Vietnamese',
    currency: 'Vietnamese dong',
    description:
      "Vietnam's cultural life includes regional traditions, historic cities, craft, music, and varied cuisine.",
  },
  {
    id: 21,
    name: 'Philippines',
    region: 'Southeast Asia',
    capital: 'Manila',
    language: 'Filipino and English',
    currency: 'Philippine peso',
    description:
      "The Philippines' island communities have diverse languages, festivals, food, and local traditions.",
  },
  {
    id: 22,
    name: 'Nepal',
    region: 'South Asia',
    capital: 'Kathmandu',
    language: 'Nepali and other regional languages',
    currency: 'Nepalese rupee',
    description:
      "Nepal's many communities and landscapes shape a rich range of customs, arts, and celebrations.",
  },
  {
    id: 23,
    name: 'Pakistan',
    region: 'South Asia',
    capital: 'Islamabad',
    language: 'Urdu and English',
    currency: 'Pakistani rupee',
    description:
      'Pakistan has varied regional languages, textile traditions, music, architecture, and food cultures.',
  },
  {
    id: 24,
    name: 'Australia',
    region: 'Oceania',
    capital: 'Canberra',
    language: 'English',
    currency: 'Australian dollar',
    description:
      "Australia's cultural story includes Aboriginal and Torres Strait Islander peoples and many migrant communities.",
  },
  {
    id: 25,
    name: 'New Zealand',
    region: 'Oceania',
    capital: 'Wellington',
    language: 'English, Māori, and New Zealand Sign Language',
    currency: 'New Zealand dollar',
    description:
      "New Zealand's cultural identity includes Māori heritage, Pacific connections, and many contemporary communities.",
  },
  {
    id: 26,
    name: 'Mexico',
    region: 'North America',
    capital: 'Mexico City',
    language: 'Spanish and Indigenous languages',
    currency: 'Mexican peso',
    description:
      "Mexico's regional cultures draw on Indigenous heritage and centuries of local and global exchange.",
  },
  {
    id: 27,
    name: 'Canada',
    region: 'North America',
    capital: 'Ottawa',
    language: 'English and French',
    currency: 'Canadian dollar',
    description:
      'Canada is home to Indigenous peoples and diverse communities across its regions and languages.',
  },
  {
    id: 28,
    name: 'United States',
    region: 'North America',
    capital: 'Washington, D.C.',
    language: 'English (widely used)',
    currency: 'United States dollar',
    description:
      'The United States contains many regional identities and communities with varied cultural traditions.',
  },
  {
    id: 29,
    name: 'Argentina',
    region: 'South America',
    capital: 'Buenos Aires',
    language: 'Spanish',
    currency: 'Argentine peso',
    description:
      "Argentina's regional cultures are expressed through music, dance, literature, food, and local traditions.",
  },
  {
    id: 30,
    name: 'Peru',
    region: 'South America',
    capital: 'Lima',
    language: 'Spanish, Quechua, and Aymara',
    currency: 'Peruvian sol',
    description:
      "Peru's cultural heritage includes Indigenous, African, European, and Asian influences across its regions.",
  },
  {
    id: 31,
    name: 'Chile',
    region: 'South America',
    capital: 'Santiago',
    language: 'Spanish',
    currency: 'Chilean peso',
    description:
      "Chile's long geography and regional communities shape distinct traditions, arts, and cuisines.",
  },
  {
    id: 32,
    name: 'Colombia',
    region: 'South America',
    capital: 'Bogotá',
    language: 'Spanish',
    currency: 'Colombian peso',
    description:
      "Colombia's diverse regions are known for varied music, festivals, cuisines, and community traditions.",
  },
  {
    id: 33,
    name: 'Cuba',
    region: 'Caribbean',
    capital: 'Havana',
    language: 'Spanish',
    currency: 'Cuban peso',
    description:
      "Cuba's cultural life includes distinctive music, dance, visual arts, cuisine, and community celebrations.",
  },
  {
    id: 34,
    name: 'Jamaica',
    region: 'Caribbean',
    capital: 'Kingston',
    language: 'English and Jamaican Patois',
    currency: 'Jamaican dollar',
    description:
      'Jamaica has a distinctive cultural influence expressed through music, food, language, and sport.',
  },
  {
    id: 35,
    name: 'United Kingdom',
    region: 'Northern Europe',
    capital: 'London',
    language: 'English and regional languages',
    currency: 'Pound sterling',
    description:
      'The United Kingdom includes distinct national and regional cultures, languages, arts, and traditions.',
  },
  {
    id: 36,
    name: 'Italy',
    region: 'Southern Europe',
    capital: 'Rome',
    language: 'Italian',
    currency: 'Euro',
    description:
      "Italy's regions have their own histories, food traditions, festivals, crafts, and artistic heritage.",
  },
  {
    id: 37,
    name: 'Spain',
    region: 'Southern Europe',
    capital: 'Madrid',
    language: 'Spanish and regional languages',
    currency: 'Euro',
    description:
      "Spain's regions have diverse languages, festivals, architecture, music, and culinary traditions.",
  },
  {
    id: 38,
    name: 'Germany',
    region: 'Central Europe',
    capital: 'Berlin',
    language: 'German',
    currency: 'Euro',
    description:
      "Germany's regional identities are reflected in its historic towns, festivals, arts, and food traditions.",
  },
  {
    id: 39,
    name: 'Greece',
    region: 'Southern Europe',
    capital: 'Athens',
    language: 'Greek',
    currency: 'Euro',
    description:
      "Greece's cultural heritage spans ancient sites, island communities, regional food, and living traditions.",
  },
  {
    id: 40,
    name: 'Turkey',
    region: 'Middle East',
    capital: 'Ankara',
    language: 'Turkish',
    currency: 'Turkish lira',
    description:
      "Turkey's regions connect Anatolian, Mediterranean, Middle Eastern, and European histories and traditions.",
  },
  {
    id: 41,
    name: 'Norway',
    region: 'Northern Europe',
    capital: 'Oslo',
    language: 'Norwegian and Sámi languages',
    currency: 'Norwegian krone',
    description:
      "Norway's cultural traditions include Sámi heritage, regional arts, and communities shaped by coastal and inland life.",
  },
  {
    id: 42,
    name: 'Sweden',
    region: 'Northern Europe',
    capital: 'Stockholm',
    language: 'Swedish and recognized minority languages',
    currency: 'Swedish krona',
    description:
      "Sweden's cultural life includes regional traditions, Sámi heritage, design, music, and seasonal celebrations.",
  },
  {
    id: 43,
    name: 'Switzerland',
    region: 'Central Europe',
    capital: 'Bern',
    language: 'German, French, Italian, and Romansh',
    currency: 'Swiss franc',
    description:
      "Switzerland's cultural landscape reflects its multilingual regions and local traditions.",
  },
  {
    id: 44,
    name: 'Ukraine',
    region: 'Eastern Europe',
    capital: 'Kyiv',
    language: 'Ukrainian',
    currency: 'Ukrainian hryvnia',
    description:
      "Ukraine's regional cultures are expressed through language, music, crafts, literature, and food.",
  },
  {
    id: 45,
    name: 'Saudi Arabia',
    region: 'Middle East',
    capital: 'Riyadh',
    language: 'Arabic',
    currency: 'Saudi riyal',
    description:
      "Saudi Arabia's communities and regions have traditions shaped by desert, coastal, and urban life.",
  },
  {
    id: 46,
    name: 'United Arab Emirates',
    region: 'Middle East',
    capital: 'Abu Dhabi',
    language: 'Arabic',
    currency: 'UAE dirham',
    description:
      'The United Arab Emirates brings together local heritage and a diverse population across its emirates.',
  },
  {
    id: 47,
    name: 'Iran',
    region: 'Middle East',
    capital: 'Tehran',
    language: 'Persian (Farsi) and regional languages',
    currency: 'Iranian rial',
    description:
      "Iran's many regions have rich traditions in poetry, crafts, music, architecture, and cuisine.",
  },
  {
    id: 48,
    name: 'Israel',
    region: 'Middle East',
    capital: 'Jerusalem',
    language: 'Hebrew and Arabic',
    currency: 'Israeli new shekel',
    description:
      'Israel is home to diverse communities and traditions, with cultural life shaped by many languages and histories.',
  },
  {
    id: 49,
    name: 'Fiji',
    region: 'Oceania',
    capital: 'Suva',
    language: 'English, iTaukei, and Fiji Hindi',
    currency: 'Fijian dollar',
    description:
      "Fiji's island communities have rich iTaukei, Indo-Fijian, and Pacific cultural traditions.",
  },
  {
    id: 50,
    name: 'Iceland',
    region: 'Northern Europe',
    capital: 'Reykjavík',
    language: 'Icelandic',
    currency: 'Icelandic króna',
    description:
      "Iceland's cultural life includes a strong literary heritage, local arts, and traditions shaped by island life.",
  },
];
