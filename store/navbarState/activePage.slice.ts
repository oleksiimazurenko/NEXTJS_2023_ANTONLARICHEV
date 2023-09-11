import { NavbarItem } from '@/interfaces/navbar.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface initialState{
	currentMenu: NavbarItem[];
}

const initialState = {
	currentMenu: []
} as initialState;

export const navbarStateSlice = createSlice({
	name: 'navbarState',
	initialState,
	reducers: {
		changeCurrentMenu: (state, {payload}: PayloadAction<NavbarItem[]>) => {
			if(state.currentMenu === payload){
				return;
			}
			state.currentMenu = payload
		}
	}
})

export const { changeCurrentMenu } = navbarStateSlice.actions;
export default navbarStateSlice.reducer;