import { ISecondMenuArrayArrays } from '@/interfaces/menu.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISecondMenuArray { secondMenuArrayArrays: ISecondMenuArrayArrays}
const secondMenuArrayArrays = {secondMenuArrayArrays: []} as ISecondMenuArray;

interface ICurrentFirstMenu { currentFirstMenu: number}
const currentFirstMenu = {currentFirstMenu: 0} as ICurrentFirstMenu;

interface ICurrentSecondMenu { currentSecondMenu: string}
const currentSecondMenu = {currentSecondMenu: 'Аналитика'} as ICurrentSecondMenu;

const secondMenuArraySlice = createSlice({
	name: 'secondMenuArrayArrays',
	initialState: secondMenuArrayArrays,
	reducers: {
		setSecondMenuArrayArrays: (state, { payload }: PayloadAction<ISecondMenuArrayArrays>) => {
			if (state.secondMenuArrayArrays === payload) {
				return
			}
			return { ...state, secondMenuArrayArrays: payload }
			
		}
	},
})

const currentFirstMenuSlice = createSlice({
	name: 'currentFirstMenu',
	initialState: currentFirstMenu,
	reducers: {
		changeCurrentFirstMenu: (state, { payload }: PayloadAction<number>) => {
			
			if (state.currentFirstMenu === payload) {
				return
			}
			return { ...state, currentFirstMenu: payload }
			
		},

	},
})

export const { setSecondMenuArrayArrays } = secondMenuArraySlice.actions
export const { changeCurrentFirstMenu } = currentFirstMenuSlice.actions

export const secondMenuArrayReducer = secondMenuArraySlice.reducer;
export const currentFirstMenuReducer = currentFirstMenuSlice.reducer;

