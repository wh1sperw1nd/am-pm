import type { ItemId, ListItem } from '@/types/ui';

export interface GlassOption {
	id: string;
	label: string;
}

export const GLASS_TYPES: GlassOption[] = [
	{id: 'white_wine', label: 'White wine'},
	{id: 'red_wine', label: 'Red wine'},
	{id: 'champagne', label: 'Champagne'},
	{id: 'martini', label: 'Martini'},
	{id: 'margarita', label: 'Margarita'},
	{id: 'sour', label: 'Sour'},
	{id: 'long_drink', label: 'Long drink (highball)'},
	{id: 'tropical', label: 'Tropical (hurricane)'},
	{id: 'layered', label: 'Layered cocktail (pousse-cafe)'},
	{id: 'whiskey', label: 'Whiskey'},
	{id: 'beer', label: 'Beer'},
	{id: 'water', label: 'Soft drink/water'},
	{id: 'hot', label: 'Hot cocktail/irish coffee mug'},
	{id: 'brandy', label: 'Armagnac/Brandy'},
	{id: 'ice', label: 'Iced drink/collins'},
	{id: 'spirits', label: 'Spirits/tumbler'},
	{id: 'shot', label: 'Shot'},
];

export const COCKTAIL_TYPES: ListItem[] = [
	{id: 'aperitifs', label: 'Aperitifs'},
	{id: 'digestives', label: 'Digestives'},
	{id: 'milk', label: 'Milk'},
	{id: 'dessert', label: 'Dessert'},
	{id: 'layered', label: 'Layered'},
	{id: 'daisy', label: 'Daisy'},
	{id: 'juleps', label: 'Juleps'},
];

export const STRENGTHS: ListItem[] = [
	{id: 'none', label: 'Non-alcohol', hint: '0%'},
	{id: 'low', label: 'Low-alcohol', hint: '6..15%'},
	{id: 'semi', label: 'Semi-strong', hint: '16..22%'},
	{id: 'strong', label: 'Strong', hint: '>23%'},
];

export const BASE_DRINKS: ListItem[] = [
	{id: 'absent', label: 'Absent'},
	{id: 'vodka', label: 'Vodka'},
	{id: 'jin', label: 'Jin'},
	{id: 'whiskey', label: 'Whiskey'},
	{id: 'liquor', label: 'Liquor'},
	{id: 'brandy', label: 'Brandy'},
	{id: 'tequila', label: 'Tequila'},
];

export const METHODS: ListItem[] = [
	{id: 'any', label: 'Not important'},
	{id: 'shaker', label: 'In shaker'},
	{id: 'muddled', label: 'Muddled'},
	{id: 'stirred', label: 'Stirred'},
	{id: 'layered', label: 'Layered'},
];

export const DECORATIONS: ListItem[] = [
	{id: 'lemon', label: 'Lemon'},
	{id: 'lime', label: 'Lime'},
	{id: 'orange', label: 'Orange'},
	{id: 'pineapple', label: 'Pineapple'},
	{id: 'strawberry', label: 'Strawberry'},
	{id: 'blueberries', label: 'Blueberries'},
];

export const TAGS: ListItem[] = [
	{id: 'spicy', label: 'Spicy'},
	{id: 'sweet', label: 'Sweet'},
	{id: 'ice-cream', label: 'With ice cream'},
];

export const PORTION_VALUES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const TIME_VALUES = [7, 10, 15, 20, 30, 45, 60, 90, 120];

/**
 * Which cocktail types (by id, from COCKTAIL_TYPES) are allowed for a given glass.
 * A glass id with no entry here is treated as unrestricted (all types allowed) —
 * TODO: fill in with the real glass -> type rules.
 */
export const GLASS_TYPE_COMPATIBILITY: Record<string, ItemId[]> = {};
