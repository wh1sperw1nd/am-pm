import type { ListItem } from '@/types/ui';

export const GLASS_TYPES: ListItem[] = [
    { id: 1, slug: 'white_wine', name: 'White wine' },
    { id: 2, slug: 'red_wine', name: 'Red wine' },
    { id: 3, slug: 'champagne', name: 'Champagne' },
    { id: 4, slug: 'martini', name: 'Martini' },
    { id: 5, slug: 'margarita', name: 'Margarita' },
    { id: 6, slug: 'sour', name: 'Sour' },
    { id: 7, slug: 'long_drink', name: 'Long drink (highball)' },
    { id: 8, slug: 'tropical', name: 'Tropical (hurricane)' },
    { id: 9, slug: 'layered', name: 'Layered cocktail (pousse-cafe)' },
    { id: 10, slug: 'whiskey', name: 'Whiskey' },
    { id: 11, slug: 'beer', name: 'Beer' },
    { id: 12, slug: 'water', name: 'Soft drink/water' },
    { id: 13, slug: 'hot', name: 'Hot cocktail/irish coffee mug' },
    { id: 14, slug: 'brandy', name: 'Armagnac/Brandy' },
    { id: 15, slug: 'ice', name: 'Iced drink/collins' },
    { id: 16, slug: 'spirits', name: 'Spirits/tumbler' },
    { id: 17, slug: 'shot', name: 'Shot' },
];

export const COCKTAIL_TYPES: ListItem[] = [
    { id: 1, slug: 'aperitifs', name: 'Aperitifs' },
    { id: 2, slug: 'digestives', name: 'Digestives' },
    { id: 3, slug: 'milk', name: 'Milk' },
    { id: 4, slug: 'dessert', name: 'Dessert' },
    { id: 5, slug: 'layered', name: 'Layered' },
    { id: 6, slug: 'daisy', name: 'Daisy' },
    { id: 7, slug: 'juleps', name: 'Juleps' },
];

export const STRENGTHS: ListItem[] = [
    { id: 1, slug: 'none', name: 'Non-alcohol', hint: '0%' },
    { id: 2, slug: 'low', name: 'Low-alcohol', hint: '6..15%' },
    { id: 3, slug: 'semi', name: 'Semi-strong', hint: '16..22%' },
    { id: 4, slug: 'strong', name: 'Strong', hint: '>23%' },
];

export const BASE_DRINKS: ListItem[] = [
    { id: 1, slug: 'absent', name: 'Absent' },
    { id: 2, slug: 'vodka', name: 'Vodka' },
    { id: 3, slug: 'jin', name: 'Jin' },
    { id: 4, slug: 'whiskey', name: 'Whiskey' },
    { id: 5, slug: 'liquor', name: 'Liquor' },
    { id: 6, slug: 'brandy', name: 'Brandy' },
    { id: 7, slug: 'tequila', name: 'Tequila' },
];

export const METHODS: ListItem[] = [
    { id: 1, slug: 'any', name: 'Not important' },
    { id: 2, slug: 'shaker', name: 'In shaker' },
    { id: 3, slug: 'muddled', name: 'Muddled' },
    { id: 4, slug: 'stirred', name: 'Stirred' },
    { id: 5, slug: 'layered', name: 'Layered' },
];

export const DECORATIONS: ListItem[] = [
    { id: 1, slug: 'lemon', name: 'Lemon' },
    { id: 2, slug: 'lime', name: 'Lime' },
    { id: 3, slug: 'orange', name: 'Orange' },
    { id: 4, slug: 'pineapple', name: 'Pineapple' },
    { id: 5, slug: 'strawberry', name: 'Strawberry' },
    { id: 6, slug: 'blueberries', name: 'Blueberries' },
];

export const TAGS: ListItem[] = [
    { id: 1, slug: 'spicy', name: 'Spicy' },
    { id: 2, slug: 'sweet', name: 'Sweet' },
    { id: 3, slug: 'ice-cream', name: 'With ice cream' },
];

export const PORTION_VALUES = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
export const TIME_VALUES = [ 7, 10, 15, 20, 30, 45, 60, 90, 120 ];

/**
 * Fallback map of glass slug -> allowed cocktail type slugs, used only until the
 * server's /glass-type-compatibility data has loaded.
 */
export const GLASS_TYPE_COMPATIBILITY: Record<string, string[]> = {};
