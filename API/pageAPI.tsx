import { TopPageModel } from '@/interfaces/page.interface'
import { API } from './API'

export async function pageAPI(alias: string): Promise<TopPageModel | null> {
	const res = await fetch(API.topPage.byAlias + alias);
	if (!res.ok) {
		return null;
	}
	return res.json();
}