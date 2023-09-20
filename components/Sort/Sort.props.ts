import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';

export interface SortProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	sort: SortEnum;
	setSort: (sort: SortEnum.Price | SortEnum.Rating) => void
}

export enum SortEnum {
	Rating,
	Price
}