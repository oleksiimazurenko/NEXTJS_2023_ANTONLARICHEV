import { MenuItem } from '@/interfaces/menu.interface'
import { API } from './API'

export async function menuAPI(firstCategory: number): Promise<MenuItem[]> {
	const res = await fetch(API.topPage.find, {
		method: 'POST',
		body: JSON.stringify({
			firstCategory,
		}),
		headers: new Headers({ 'content-type': 'application/json' }),
	})
	return res.json()
}
