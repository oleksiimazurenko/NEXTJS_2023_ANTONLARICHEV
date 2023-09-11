'use client'

import { Button } from '@/components/Button/Button'
import { Htag } from '@/components/Htag/Htag'
import { P } from '@/components/P/P'
import { Rating } from '@/components/Rating/Rating'
import { Tag } from '@/components/Tag/Tag'
import { useState } from 'react'

export default function Home(): JSX.Element {
	const [rating, setRating] = useState<number>(4)

	return (
		<>
			<Htag tag={'h1'}>Text</Htag>
			<Button appearance='primary' arrow='right'>
				Primary
			</Button>
			<Button appearance='ghost' arrow='down'>
				Ghost
			</Button>
			<P size='s'>Sit enim ea non ad irure commodo dolor deserunt nulla ea.</P>
			<P>Sit enim ea non ad irure commodo dolor deserunt nulla ea.</P>
			<P size='l'>Sit enim ea non ad irure commodo dolor deserunt nulla ea.</P>
			<Tag size='s'>Ghost</Tag>
			<Tag size='m' color='red' href='#'>
				Red
			</Tag>
			<Tag size='s' color='green'>
				Green
			</Tag>
			<Tag color='primary'>Primary</Tag>
			<Rating rating={rating} isEditable setRating={setRating}></Rating>
		</>
	)
}
