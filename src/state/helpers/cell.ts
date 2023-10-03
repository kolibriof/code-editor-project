export type CellTypes = 'code' | 'text';
export type CellDirection = 'up' | 'down';

export interface Cell {
    id: string;
    content?: string;
    type?: CellTypes;
}

