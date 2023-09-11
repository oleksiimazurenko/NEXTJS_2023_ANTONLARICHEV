import { pageAPI } from '@/API/pageAPI'
import { productsAPI } from '@/API/productsAPI'
import { navbarAPI } from '@/API/navbarAPI'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { firstLevelMenu } from '@/helper/helpers'
import { TopPageComponent } from '@/page-components/topPageComponent/TopPageComponent'

export const metadata: Metadata = {
	title: 'Alias',
}



export async function generateStaticParams() {
	let paths: { type: string; alias: string; }[] = [];

	for(const m of firstLevelMenu) {
		const menu = await navbarAPI(m.id)
	
		paths = menu.flatMap(s => s.pages.map(p => ({ type: m.route, alias: p.alias })))

		console.log(paths)
	}

	return paths;
}


export default async function TopPage({
	params
}: {
	params: { type: string, alias: string }
}) {

	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type);
	if (!firstCategoryItem) notFound()

	const menu = await navbarAPI(firstCategoryItem.id)

	const page = await pageAPI(params.alias)
	if (!page) notFound()

	const products = await productsAPI(page.category)

	return <TopPageComponent 
		firstCategory={firstCategoryItem.id}
		page={page}
		products={products}
		/>
}
