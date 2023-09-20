import { MenuItem } from '@/interfaces/menu.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface ISecondMenuArray { secondMenuArray: MenuItem[]}
const secondMenuArray = {secondMenuArray: []} as ISecondMenuArray;

interface ICurrentFirstMenu { currentFirstMenu: number}
const currentFirstMenu = {currentFirstMenu: 0} as ICurrentFirstMenu;

const secondMenuArraySlice = createSlice({
	name: 'secondMenuArray',
	initialState: secondMenuArray,
	reducers: {
		changeSecondMenuArray: (state, { payload }: PayloadAction<MenuItem[]>) => {
			if (state.secondMenuArray === payload) {
				return
			}
			return { ...state, secondMenuArray: payload }
			
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

export const { changeSecondMenuArray } = secondMenuArraySlice.actions
export const { changeCurrentFirstMenu } = currentFirstMenuSlice.actions

export const secondMenuArrayReducer = secondMenuArraySlice.reducer;
export const currentFirstMenuReducer = currentFirstMenuSlice.reducer;
