import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { secondMenuArrayReducer, currentFirstMenuReducer } from './slices/menu.slices'
import sortingSlice from './slices/sorting.slice'

export const store = configureStore({
	reducer: {
		changeSecondMenuArray: secondMenuArrayReducer,
		changeCurrentFirstMenu: currentFirstMenuReducer,
		sortingProducts: sortingSlice,
		addDefaultProducts: sortingSlice,
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
