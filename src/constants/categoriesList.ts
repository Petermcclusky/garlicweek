export type CategoryType =
  | 'Farm'
  | "Farmers' Market"
  | 'Food & Beverage'
  | 'Garlic Spotlight'
  | 'Community Organization'
  | 'Independent Grocer';

export interface Category {
  name: CategoryType;
  title: string;
}

export const categoriesList: Category[] = [
  {
    name: 'Farm',
    title: 'Farm',
  },
  {
    name: "Farmers' Market",
    title: "Farmers' Market",
  },
  {
    name: 'Food & Beverage',
    title: 'Food & Beverage',
  },
  {
    name: 'Garlic Spotlight',
    title: 'Garlic Spotlight',
  },
  {
    name: 'Community Organization',
    title: 'Community Organization',
  },
  {
    name: 'Independent Grocer',
    title: 'Independent Grocer',
  },
];
