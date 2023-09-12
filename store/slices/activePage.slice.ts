import { NavbarItem } from '@/interfaces/navbar.interface'
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface stateInterface{
	currentMenu: NavbarItem[];
}

const initialState = {
	currentMenu: []
} as stateInterface;

export const activePageSlice = createSlice({
	name: 'activePage',
	initialState,
	reducers: {
		changeCurrentNavbar: (state, {payload}: PayloadAction<NavbarItem[]>) => {
			if(state.currentMenu === payload){
				return;
			}
			state.currentMenu = payload
		}
	}
})

export const { changeCurrentNavbar } = activePageSlice.actions;
export default activePageSlice.reducer;