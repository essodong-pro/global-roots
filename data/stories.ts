// A community story or recipe.
export type Story = {
    id: number;
    countryId: number; // Links to Country.id
    title: string;
    author: string;
    type: "story" | "recipe";
    content: string;
    date: string; // YYYY-MM-DD
};

// Starting stories. New submissions are added in memory by lib/mock-data-service.ts.
export const stories: Story[] = [
    {
        id: 1,
        countryId: 1,
        title: "A Taste of Togo",
        author: "Global Roots Community",
        type: "story",
        content:
            "Food, music, and family gatherings are important ways communities in Togo share culture and traditions.",
        date: "2026-09-01",
    },
    {
        id: 2,
        countryId: 2,
        title: "Ghanaian Jollof Rice",
        author: "Global Roots Community",
        type: "recipe",
        content:
            "Jollof rice is a popular West African dish prepared with rice, tomatoes, peppers, onions, and spices.",
        date: "2026-09-02",
    },
    {
        id: 3,
        countryId: 3,
        title: "Japanese Tea Tradition",
        author: "Global Roots Community",
        type: "story",
        content:
            "The Japanese tea ceremony demonstrates the importance of hospitality, attention, and respect.",
        date: "2026-09-03",
    },
    {
        id: 4,
        countryId: 4,
        title: "Brazilian Carnival",
        author: "Global Roots Community",
        type: "story",
        content:
            "Carnival is known for music, dancing, costumes, and community celebrations across Brazil.",
        date: "2026-09-04",
    },
    {
        id: 5,
        countryId: 5,
        title: "French Crepes",
        author: "Global Roots Community",
        type: "recipe",
        content:
            "Crepes are thin pancakes that can be served with sweet or savory fillings.",
        date: "2026-09-05",
    },
    {
        id: 6,
        countryId: 6,
        title: "Celebrating Diwali",
        author: "Global Roots Community",
        type: "story",
        content:
            "Diwali is widely celebrated with lights, family gatherings, food, decorations, and cultural traditions.",
        date: "2026-09-06",
    },
];