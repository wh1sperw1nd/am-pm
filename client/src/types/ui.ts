export type ItemId = string | number;

export interface ListItem {
    id: ItemId;
    label: string;
    /** Optional secondary text shown on the right side of the row. */
    hint?: string;
}
