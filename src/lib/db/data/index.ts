import { Category } from '@prisma/client';

export const categories: Omit<Category, 'id'>[] = [
  {
    name: 'Automobile',
    type: 'expense',
    image: '/images/automobile.png',
    sequence: null
  },
  {
    name: 'Drink',
    type: 'expense',
    image: '/images/drink.png',
    sequence: null
  },
  {
    name: 'Education',
    type: 'expense',
    image: '/images/education.png',
    sequence: null
  },
  {
    name: 'Entertainment',
    type: 'expense',
    image: '/images/entertainment.png',
    sequence: null
  },
  {
    name: 'Food',
    type: 'expense',
    image: '/images/food.png',
    sequence: null
  },
  {
    name: 'Gift',
    type: 'expense',
    image: '/images/gift.png',
    sequence: null
  },
  {
    name: 'Groceries',
    type: 'expense',
    image: '/images/groceries.png',
    sequence: null
  },
  {
    name: 'Health Care',
    type: 'expense',
    image: '/images/health-care.png',
    sequence: null
  },
  {
    name: 'Housing',
    type: 'expense',
    image: '/images/housing.png',
    sequence: null
  },
  {
    name: 'Insurance',
    type: 'expense',
    image: '/images/insurance.png',
    sequence: null
  },
  {
    name: 'Investment',
    type: 'income',
    image: '/images/investment.png',
    sequence: null
  },
  {
    name: 'Miscellaneous',
    type: 'expense',
    image: '/images/miscellaneous.png',
    sequence: null
  },
  {
    name: 'Other',
    type: 'expense',
    image: '/images/other-expense.png',
    sequence: 1
  },
  {
    name: 'Other',
    type: 'income',
    image: '/images/other-income.png',
    sequence: 1
  },
  {
    name: 'Personal Care',
    type: 'expense',
    image: '/images/personal-care.png',
    sequence: null
  },
  {
    name: 'Salary',
    type: 'income',
    image: '/images/salary.png',
    sequence: null
  },
  {
    name: 'Shopping',
    type: 'expense',
    image: '/images/shopping.png',
    sequence: null
  },
  {
    name: 'Transportation',
    type: 'expense',
    image: '/images/transportation.png',
    sequence: null
  },
  {
    name: 'Travel',
    type: 'expense',
    image: '/images/travel.png',
    sequence: null
  },
  {
    name: 'Utilities',
    type: 'expense',
    image: '/images/utilities.png',
    sequence: null
  }
];
