type QuestionKey = `q${1 | 2 | 3 | 4 | 5}`;

export type Ratings = Record<QuestionKey, number | null>;
