'use client'

import { v4 as uuidv4 } from 'uuid'

import BooksIcon from './icons/books.svg'
import CoursesIcon from './icons/courses.svg'
import ProductsIcon from './icons/product.svg'
import ServicesIcon from './icons/services.svg'

import {
	FirstLevelMenuItem,
	NavbarItem,
	PageItem,
} from '@/interfaces/navbar.interface'
import { TopLevelCategory } from '@/interfaces/page.interface'

import { usePathname } from 'next/navigation'

import cn from 'classnames'
import styles from './Navbar.module.scss'

import { changeCurrentMenu } from '@/store/navbarState/activePage.slice'
import { AppDispatch, useAppSelector } from '@/store/store'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'

export const ClientSideNavbar = ({
	defaultMenu,
}: {
	defaultMenu: NavbarItem[]
}): JSX.Element => {
	
	const pathname = usePathname()
	const dispatch = useDispatch<AppDispatch>()
	useEffect(() => {
		dispatch(
			changeCurrentMenu(
				defaultMenu.map(m => ({
					...m,
					isOpened: m.pages.map(p => p.alias).includes(pathname.split('/')[2])
				}))
			)
		);
	}, []); 
	

	const currentMenu = useAppSelector(state => state.currentMenu)

	const firstLevelMenu: FirstLevelMenuItem[] = [
		{
			route: 'courses',
			name: 'Курсы',
			icon: <CoursesIcon />,
			id: TopLevelCategory.Courses,
		},
		{
			route: 'services',
			name: 'Сервисы',
			icon: <ServicesIcon />,
			id: TopLevelCategory.Services,
		},
		{
			route: 'books',
			name: 'Kниги',
			icon: <BooksIcon />,
			id: TopLevelCategory.Books,
		},
		{
			route: 'products',
			name: 'Продукты',
			icon: <ProductsIcon />,
			id: TopLevelCategory.Products,
		},
	]

	const openSecondLevel = (secondCategory: string) => {
		const array = currentMenu.map(m => {
			if (m && m._id.secondCategory === secondCategory) {
				return { ...m, isOpened: !m.isOpened }
			} else {
				return m
			}
		})

		dispatch(changeCurrentMenu(array));
	}

	const buildFirstLevel = () => {

		return (
			<>
				{firstLevelMenu.map(menu => {
					return (
						<div key={uuidv4()}>
							<Link href={`/${menu.route}`}>
								<div
									className={cn(styles.firstLevel, {
										[styles.firstLevelActive]: pathname.includes(menu.id),
									})}
								>
									{menu.icon}
									<span>{menu.name}</span>
								</div>
							</Link>
							{pathname.includes(menu.id) && buildSecondLevel(menu)}
						</div>
					)
				})}
			</>
		)
	}

	const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {

		return (
			<div className={styles.secondBlock}>
				{currentMenu.map(m => {

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

	const buildThirdLevel = (pages: PageItem[], route: string) => {

		return pages.map(p => (
			<Link
				key={uuidv4()}
				href={`/${route}/${p.alias}`}
				className={cn(styles.thirdLevel, {
					[styles.thirdLevelActive]:
						`/${pathname.split('/')[1]}/${p.alias}` == usePathname(),
				})}
			>
				{p.category}
			</Link>
		))
	}

	return <div className={styles.menu}>{buildFirstLevel()}</div>
}