'use client'
import { v4 as uuidv4 } from 'uuid'

import { FirstLevelMenuItem, PageItem } from '@/interfaces/menu.interface'

import { usePathname } from 'next/navigation'

import cn from 'classnames'
import styles from './Menu.module.scss'

import { navbarAPI } from '@/API/menuAPI'
import { firstLevelMenu } from '@/helper/helpers'
import {
	changeCurrentFirstMenu,
	changeSecondMenuArray,
} from '@/store/slices/menu.slices'
import { AppDispatch, useAppSelector } from '@/store/store'
import Link from 'next/link'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

export const Menu = (): JSX.Element => {
	
	const dispatch = useDispatch<AppDispatch>()
	const pathname = usePathname()

	//----------------------------------------------------------------------------

	useEffect(() => {
		switch (pathname.split('/')[1]) {
			case 'courses':
				dispatch(changeCurrentFirstMenu(0))
				break
			case 'services':
				dispatch(changeCurrentFirstMenu(1))
				break
			case 'books':
				dispatch(changeCurrentFirstMenu(2))
				break
			case 'products':
				dispatch(changeCurrentFirstMenu(3))
				break
		}
	}, [pathname.split('/')[1]])

	//----------------------------------------------------------------------------

	const { currentFirstMenu } = useAppSelector(
		state => state.changeCurrentFirstMenu
	)

	//----------------------------------------------------------------------------

	useEffect(() => {
		const getMenu = async () => {
			const defaultMenu = await navbarAPI(currentFirstMenu)

			dispatch(
				changeSecondMenuArray(
					defaultMenu.map(m => ({
						...m,
						isOpened: m.pages
							.map(p => p.alias)
							.includes(pathname.split('/')[2]),
					}))
				)
			)
		}
		getMenu()
	}, [currentFirstMenu])

	//----------------------------------------------------------------------------

	const { secondMenuArray } = useAppSelector(
		state => state.changeSecondMenuArray
	)

	//----------------------------------------------------------------------------

	const openSecondLevel = (secondCategory: string) => {
		const array = secondMenuArray.map(m => {
			if (m && m._id.secondCategory === secondCategory) {
				return { ...m, isOpened: !m.isOpened }
			} else {
				return m
			}
		})

		dispatch(changeSecondMenuArray(array))
	}

	//----------------------------------------------------------------------------

	const buildFirstLevel = () => {
		return (
			<>
				{firstLevelMenu.map(menu => {
					return (
						<div key={uuidv4()}>
							<Link href={`/${menu.route}`}>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: pathname.includes(menu.route),
									})}
								>
									{menu.icon}
									<span>{menu.name}</span>
								</div>
							</Link>
							{pathname.includes(menu.route) && buildSecondLevel(menu)}
						</div>
					)
				})}
			</>
		)
	}

	//----------------------------------------------------------------------------

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
		return (
			<div className={styles.secondBlock}>
				{secondMenuArray.map(m => {
					return (
						<div key={uuidv4()}>
							<div
								className={styles.secondLevel}
								onClick={() => openSecondLevel(m._id.secondCategory)}
							>
								{m._id.secondCategory}
							</div>
							<div
								className={cn(styles.secondLevelBlock, {
									[styles.secondLevelBlockOpened]: m.isOpened,
								})}
							>
								{buildThirdLevel(m.pages, menuItem.route)}
							</div>
						</div>
					)
				})}
			</div>
		)
	}

	//----------------------------------------------------------------------------

	const buildThirdLevel = (pages: PageItem[], route: string) => {
		return pages.map(p => (
			<Link
				key={uuidv4()}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]:
						`/${pathname.split('/')[1]}/${p.alias}` == pathname,
				})}
			>
				{p.category}
			</Link>
		))
	}

	return <div className={styles.menu}>{buildFirstLevel()}</div>
}
