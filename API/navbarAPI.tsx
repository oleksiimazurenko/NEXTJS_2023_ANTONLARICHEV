import { API } from './API'
import { PageItem, NavbarItem } from '@/interfaces/navbar.interface'

export async function navbarAPI(firstCategory: number): Promise<NavbarItem[]> {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({
			firstCategory
		}),
		headers: new Headers({'content-type': 'application/json'})
	});
	return res.json();
}