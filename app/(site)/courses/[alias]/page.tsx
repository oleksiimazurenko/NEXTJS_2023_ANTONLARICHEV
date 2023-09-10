import { pageAPI } from '@/API/pageAPI'
import { productsAPI } from '@/API/productsAPI'
import { navbarAPI } from '@/API/navbarAPI'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'PageCourses',
}

export async function generateStaticParams() {
	const menu = await navbarAPI(0)
	return menu.flatMap(item => item.pages.map(page => ({ alias: page.alias })))
}

export default async function PageCourses({
	params,
}: {
	params: { alias: string }
}) {
	const page = await pageAPI(params.alias)

	const products = await productsAPI(page?.category)

	if (!page) {
		notFound()
	}

	return <div>{products.length}</div>
}
