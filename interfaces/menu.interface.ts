import { TopLevelCategory } from './page.interface'

export interface PageItem {
	alias: string
	title: string
	_id: string
	category: string
}

export interface MenuItem {
	_id: {
		secondCategory: string
	}
	isOpened?: boolean
	pages: PageItem[]
	call: string
}

export interface FirstLevelMenuItem {
	route: string
	name: string
	icon: JSX.Element
	id: TopLevelCategory
}

export type ISecondMenuArrayArrays = MenuItem[][];