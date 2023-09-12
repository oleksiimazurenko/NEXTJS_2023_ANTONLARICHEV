import { SortEnum } from '@/components/Sort/Sort.props'
import { ProductModel } from '@/interfaces/product.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type SortActions = { type: SortEnum } | { type: SortEnum.Rating }

export interface stateInterface {
	sort: SortEnum
	products: ProductModel[]
}

const initialState = {
	sort: 0,
	products: [],
} as stateInterface

export const sortingSlice = createSlice({
	name: 'sorting',
	initialState,
	reducers: {
		sorting: (
			state,
			{ payload }: PayloadAction<SortEnum.Price | SortEnum.Rating>
		) => {
			switch (payload) {
				case SortEnum.Rating:
					return {
						...state,
						sort: SortEnum.Rating,
						// products: state.products.sort ((a, b) => a. initialRating > b. initialRating ? -1 : 1)
						products: [...state.products].sort((a, b) =>
							a.initialRating > b.initialRating ? -1 : 1
						),
					}
				case SortEnum.Price:
					return {
						...state,
						sort: SortEnum.Price,
						// products: state.products.sort((a, b) => a.price > b.price ? 1 : -1)
						products: [...state.products].sort((a, b) =>
							a.initialRating > b.initialRating ? -1 : 1
						),
					}
				default:
					throw new Error('Неверный тип сортировки')
			}
		},
		addProducts: (state, { payload }: PayloadAction<ProductModel[]>) => {
			return {
				...state,
				products: payload,
			}
		},
	},
})

export const { sorting, addProducts } = sortingSlice.actions
export default sortingSlice.reducer
