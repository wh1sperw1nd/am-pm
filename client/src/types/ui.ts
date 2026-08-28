export type ItemId = string | number;

export interface IListItem {
    id: ItemId;
    name: string;
    slug: string;
    hint?: string;
}
