import { navbarAPI } from '@/API/menuAPI'
import { firstLevelMenu } from '@/helper/helpers'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
	title: 'Type',
}

export async function generateStaticParams() {
	return firstLevelMenu.map(p => ({ type: p.route }))
}

export default async function TypePage({
	params,
}: {
	params: { type: string }
}) {
	if (!params) notFound()

	const firstCategoryItem = firstLevelMenu.find(m => m.route == params.type)
	if (!firstCategoryItem) notFound()

	const menu = await navbarAPI(firstCategoryItem.id)

	return <div>Type: {firstCategoryItem.id}</div>
}
