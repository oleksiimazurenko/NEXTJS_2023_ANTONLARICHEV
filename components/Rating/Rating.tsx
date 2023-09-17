'use client'
import cn from 'classnames'
import { KeyboardEvent, useEffect, useState } from 'react'
import styles from './Rating.module.scss'
import { IRatingProps } from './Rating.props'
import StarIcon from './star.svg'
import { v4 as uuidv4 } from 'uuid';



export const Rating = ({
	isEditable = false,
	rating,
	setRating,
	...props
}: IRatingProps): JSX.Element => {
	const [ratingArray, setRatingArray] = useState<JSX.Element[]>(
		new Array(5).fill(<></>)
	)

	useEffect(() => {
		constructRating(rating)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [rating])

	const constructRating = (currentRating: number) => {
		const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
			return (
				<span
					key={uuidv4()}
					className={cn(styles.star, {
						[styles.filled]: i < currentRating,
						[styles.editable]: isEditable,
					})}
					onMouseEnter={() => changeDispay(i + 1)}
					onMouseLeave={() => changeDispay(rating)}
					onClick={() => onClick(i + 1)}
				>
					<StarIcon
						tabIndex={isEditable ? 0 : -1}
						onKeyDown={(e: KeyboardEvent<SVGElement>) =>
							isEditable && handleSpace(i + 1, e)
						}
					/>
				</span>
			)
		})
		setRatingArray(updatedArray)
	}

	const changeDispay = (i: number) => {
		if (!isEditable) {
			return
		}
		constructRating(i)
	}
	const onClick = (i: number) => {
		if (!isEditable || !setRating) {
			return
		}
		setRating(i)
	}
	const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
		if (e.code != 'Space' || !setRating) {
			return
		}
		setRating(i)
	}

	return (
		<div {...props}>
			{ratingArray.map((r, i) => (
				<span key={i}>{r}</span>
			))}
		</div>
	)
}
