export type Story = {
    id: number;
    countryId: number;
    title: string;
    author: string;
    type: "story" | "recipe";
    content: string;
};

export const stories: Story[] = [
    {
        id: 1,
        countryId: 1,
        title: "A Taste of Togo",
        author: "Global Roots Community",
        type: "story",
        content:
            "Food, music, and family gatherings are important ways communities in Togo share culture and traditions.",
    },
    {
        id: 2,
        countryId: 2,
        title: "Ghanaian Jollof Rice",
        author: "Global Roots Community",
        type: "recipe",
        content:
            "Jollof rice is a popular West African dish prepared with rice, tomatoes, peppers, onions, and spices.",
    },
    {
        id: 3,
        countryId: 3,
        title: "Japanese Tea Tradition",
        author: "Global Roots Community",
        type: "story",
        content:
            "The Japanese tea ceremony demonstrates the importance of hospitality, attention, and respect.",
    },
    {
        id: 4,
        countryId: 4,
        title: "Brazilian Carnival",
        author: "Global Roots Community",
        type: "story",
        content:
            "Carnival is known for music, dancing, costumes, and community celebrations across Brazil.",
    },
    {
        id: 5,
        countryId: 5,
        title: "French Crepes",
        author: "Global Roots Community",
        type: "recipe",
        content:
            "Crepes are thin pancakes that can be served with sweet or savory fillings.",
    },
    {
        id: 6,
        countryId: 6,
        title: "Celebrating Diwali",
        author: "Global Roots Community",
        type: "story",
        content:
            "Diwali is widely celebrated with lights, family gatherings, food, decorations, and cultural traditions.",
    },
];