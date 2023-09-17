export type CategoryType = //todo make changing these easier
  | 'Farm'
  | "Farmers' Market"
  | 'Garlicky Food & Beverage'
  | 'Garlic Spotlight'
  | 'Community Organization'
  | 'Independent Retail';

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
    name: 'Garlicky Food & Beverage',
    title: 'Garlicky Food & Beverage',
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
    name: 'Independent Retail',
    title: 'Independent Retail',
  },
];
