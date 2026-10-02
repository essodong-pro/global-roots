export type QuizQuestion = {
    id: number;
    countryId: number;
    question: string;
    options: string[];
    correctAnswer: string;
};

export const quizQuestions: QuizQuestion[] = [
    {
        id: 1,
        countryId: 1,
        question: "What is the official language of Togo?",
        options: ["French", "Portuguese", "Japanese", "Hindi"],
        correctAnswer: "French",
    },
    {
        id: 2,
        countryId: 2,
        question: "Which traditional Ghanaian textile is well known internationally?",
        options: ["Kente", "Kimono", "Sari", "Beret"],
        correctAnswer: "Kente",
    },
    {
        id: 3,
        countryId: 3,
        question: "What is a common respectful greeting in Japan?",
        options: ["Bowing", "Waving with both hands", "Snapping fingers", "Clapping"],
        correctAnswer: "Bowing",
    },
    {
        id: 4,
        countryId: 4,
        question: "Which celebration is strongly associated with Brazil?",
        options: ["Carnival", "Obon", "Diwali", "Akwasidae"],
        correctAnswer: "Carnival",
    },
    {
        id: 5,
        countryId: 5,
        question: "Which city is the capital of France?",
        options: ["Paris", "Lyon", "Marseille", "Nice"],
        correctAnswer: "Paris",
    },
    {
        id: 6,
        countryId: 6,
        question: "Which celebration is commonly associated with lights?",
        options: ["Diwali", "Carnival", "Obon", "Homowo"],
        correctAnswer: "Diwali",
    },
];