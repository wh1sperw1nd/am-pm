import type { InjectionKey } from 'vue';

export type CardTheme = 'blue' | 'wine' | 'coffee';

/** Provided by a view to color every BaseCard header underneath it (cocktails: wine, coffee: brown). */
export const cardThemeKey: InjectionKey<CardTheme> = Symbol('cardTheme');
