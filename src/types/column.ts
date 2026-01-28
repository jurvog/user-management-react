import { ReactNode } from "react";

export interface ColumnBase {
    key: string;
    label: string;
    sortable: boolean;
}

export interface ColumnCell<T, A> extends ColumnBase {
    render?: (item: T, actions: A) => ReactNode;
}
