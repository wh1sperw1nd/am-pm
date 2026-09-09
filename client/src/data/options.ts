import type { IListItem } from '@/types/ui';

export const GLASS_TYPES: IListItem[] = [
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

export const COCKTAIL_TYPES: IListItem[] = [
    { id: 1, slug: 'aperitifs', name: 'Aperitifs' },
    { id: 2, slug: 'digestives', name: 'Digestives' },
    { id: 3, slug: 'milk', name: 'Milk' },
    { id: 4, slug: 'dessert', name: 'Dessert' },
    { id: 5, slug: 'layered', name: 'Layered' },
    { id: 6, slug: 'daisy', name: 'Daisy' },
    { id: 7, slug: 'juleps', name: 'Juleps' },
];

export const STRENGTHS: IListItem[] = [
    { id: 1, slug: 'none', name: 'Non-alcohol', hint: '0%' },
    { id: 2, slug: 'low', name: 'Low-alcohol', hint: '6..15%' },
    { id: 3, slug: 'semi', name: 'Semi-strong', hint: '16..22%' },
    { id: 4, slug: 'strong', name: 'Strong', hint: '>23%' },
];

export const BASE_DRINKS: IListItem[] = [
    { id: 1, slug: 'absent', name: 'Absent' },
    { id: 2, slug: 'vodka', name: 'Vodka' },
    { id: 3, slug: 'jin', name: 'Jin' },
    { id: 4, slug: 'whiskey', name: 'Whiskey' },
    { id: 5, slug: 'liquor', name: 'Liquor' },
    { id: 6, slug: 'brandy', name: 'Brandy' },
    { id: 7, slug: 'tequila', name: 'Tequila' },
];

export const METHODS: IListItem[] = [
    { id: 1, slug: 'any', name: 'Not important' },
    { id: 2, slug: 'shaker', name: 'In shaker' },
    { id: 3, slug: 'muddled', name: 'Muddled' },
    { id: 4, slug: 'stirred', name: 'Stirred' },
    { id: 5, slug: 'layered', name: 'Layered' },
];

export const COFFEE_METHODS: IListItem[] = [
    { id: 1, slug: 'any', name: 'Not important' },
    { id: 2, slug: 'espresso', name: 'Espresso' },
    { id: 3, slug: 'pour_over', name: 'Pour-over' },
    { id: 4, slug: 'french_press', name: 'French press' },
    { id: 5, slug: 'drip', name: 'Drip' },
    { id: 6, slug: 'moka_pot', name: 'Moka pot' },
    { id: 7, slug: 'aeropress', name: 'AeroPress' },
    { id: 8, slug: 'cold_brew', name: 'Cold brew steep' },
    { id: 9, slug: 'siphon', name: 'Siphon' },
];

export const DECORATIONS: IListItem[] = [
    { id: 1, slug: 'lemon', name: 'Lemon' },
    { id: 2, slug: 'lime', name: 'Lime' },
    { id: 3, slug: 'orange', name: 'Orange' },
    { id: 4, slug: 'pineapple', name: 'Pineapple' },
    { id: 5, slug: 'strawberry', name: 'Strawberry' },
    { id: 6, slug: 'blueberries', name: 'Blueberries' },
];

export const TAGS: IListItem[] = [
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



export const CUP_TYPES: IListItem[] = [
    { id: 1, slug: 'americano_mug', name: 'Americano Mug' },
    { id: 2, slug: 'cappuccino', name: 'Cappuccino' },
    { id: 3, slug: 'cold_brew', name: 'Cold brew' },
    { id: 4, slug: 'espresso', name: 'Espresso' },
    { id: 5, slug: 'espresso_demitasse', name: 'Espresso demitasse' },
    { id: 6, slug: 'espresso_shot', name: 'Espresso shot' },
    { id: 7, slug: 'flat_white', name: 'Flat white' },
    { id: 8, slug: 'french_press', name: 'French press' },
    { id: 9, slug: 'glass_coffee_mug', name: 'Glass coffee mug' },
    { id: 10, slug: 'insulated_glass_mug', name: 'Insulated glass mug' },
    { id: 11, slug: 'irish_coffee_mug', name: 'Irish coffee mug' },
    { id: 12, slug: 'latte', name: 'Latte' },
    { id: 13, slug: 'latte_mug', name: 'Latte mug' },
    { id: 14, slug: 'macchiato', name: 'Macchiato' },
    { id: 15, slug: 'mocha_mug', name: 'Mocha mug' },
    { id: 16, slug: 'pitcher', name: 'Pitcher' },
    { id: 17, slug: 'pour_over_cone', name: 'Pour over cone' },
    { id: 18, slug: 'siphon_coffee_decanter', name: 'Siphon coffee decanter' },
];

export const COFFEE_TYPES: IListItem[] = [
    { id: 1, slug: 'espresso_based', name: 'Espresso-based' },
    { id: 2, slug: 'milk_based', name: 'Milk-based' },
    { id: 3, slug: 'black', name: 'Black' },
    { id: 4, slug: 'iced', name: 'Iced' },
    { id: 5, slug: 'specialty', name: 'Specialty' },
    { id: 6, slug: 'dessert', name: 'Dessert' },
    { id: 7, slug: 'decaf', name: 'Decaf' },
];
