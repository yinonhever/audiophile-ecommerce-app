import { ReactNode } from "react";

export type DataItem<T> = T & { _id: string };

export type PropsWithChildren<T> = T & { children?: ReactNode };
