import type { Ratings } from './Ratings';

export type Question = {
    id: keyof Ratings;
    text: string;
}