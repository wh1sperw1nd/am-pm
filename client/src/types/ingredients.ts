export const UNITS = ['g', 'kg', 'ml', 'l', 'cl', 'oz', 'tbsp', 'tsp', 'dash', 'pc'] as const;
export type Unit = typeof UNITS[number] | '';

export type IngredientKind = 'ingredient' | 'garnish';

export interface IRecipeIngredient {
	id: number;
	name: string;
	amount: string;
	unit: Unit;
	kind: IngredientKind;
}

let nextIngredientRowId = 0;
export const makeIngredientRow = (name = '', amount = '', unit: Unit = '', kind: IngredientKind = 'ingredient'): IRecipeIngredient => ({
	id: nextIngredientRowId++,
	name,
	amount,
	unit,
	kind,
});
