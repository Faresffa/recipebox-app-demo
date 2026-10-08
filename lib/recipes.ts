export type Recipe = {
  id: number
  title: string
  description: string
  emoji: string
  pro: boolean
}

export const recipes: Recipe[] = [
  {
    id: 1,
    title: 'Classic Pancakes',
    description: 'Fluffy buttermilk pancakes ready in 20 minutes.',
    emoji: '🥞',
    pro: false,
  },
  {
    id: 2,
    title: 'Garden Salad',
    description: 'Crisp greens with a bright lemon vinaigrette.',
    emoji: '🥗',
    pro: false,
  },
  {
    id: 3,
    title: 'Tomato Soup',
    description: 'Creamy roasted tomato soup with fresh basil.',
    emoji: '🍅',
    pro: false,
  },
  {
    id: 4,
    title: 'Homemade Ramen',
    description: 'Rich broth, soft eggs, and hand-pulled noodles.',
    emoji: '🍜',
    pro: true,
  },
  {
    id: 5,
    title: 'Wood-Fired Pizza',
    description: 'Blistered crust with San Marzano tomato sauce.',
    emoji: '🍕',
    pro: true,
  },
  {
    id: 6,
    title: 'Chocolate Lava Cake',
    description: 'A molten center with a dusting of cocoa.',
    emoji: '🍫',
    pro: true,
  },
]
