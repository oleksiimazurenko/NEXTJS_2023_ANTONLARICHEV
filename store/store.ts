import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import activePageSlice from './slices/activePage.slice'
import sortingSlice from './slices/sorting.slice'

export const store = configureStore({
	// reducer: activePageSlice,
	reducer: {
		'activePage': activePageSlice,
    'sorting': sortingSlice,
		'addProducts': sortingSlice
	},
	devTools: true,
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector


