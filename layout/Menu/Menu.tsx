'use client'
import { v4 as uuidv4 } from 'uuid'

import { FirstLevelMenuItem, MenuItem, ISecondMenuArrayArrays, PageItem } from '@/interfaces/menu.interface'

import { usePathname } from 'next/navigation'

import cn from 'classnames'
import styles from './Menu.module.scss'

import { menuAPI } from '@/API/menuAPI'
import { firstLevelMenu } from '@/helper/helpers'
import {setSecondMenuArrayArrays} from '@/store/slices/menu.slices'
import { AppDispatch, useAppSelector } from '@/store/store'

import * as Accordion from '@radix-ui/react-accordion'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import classNames from 'classnames'
import { ForwardedRef, forwardRef } from 'react'

export const Menu = (): JSX.Element => {

	// const [announce, setAnnouncel] = useState<'closed' | 'opened' | undefined>();

	const dispatch = useDispatch<AppDispatch>()
	const pathname = usePathname()

	let hrefCurrentFirstLevelMenu: string = 'courses'

	//----------------------------------------------------------------------------

	useEffect(() => {
		const getMenu = async () => {
			
			const defaultMenuArray: ISecondMenuArrayArrays = [];

			for(const item of firstLevelMenu) {
				const defaultMenu = await menuAPI(item.id);
				defaultMenuArray.push(defaultMenu);
			}

			dispatch(
				setSecondMenuArrayArrays(defaultMenuArray)
			)
		}
		getMenu()

	}, [])

	//----------------------------------------------------------------------------

	const { secondMenuArrayArrays } = useAppSelector(
		state => state.setSecondMenuArrayArrays
	)
	
	//----------------------------------------------------------------------------

	const getCurrentSecondMenu = (): string => {
		if (typeof window !== 'undefined') {
			// Проверяем, что код выполняется в браузере
			const active = window.localStorage.getItem('idSecondCategory');
			
			if (typeof active !== 'string') {
				return 'default';
			}
	
			return active;
		}
	
		// Если код выполняется на сервере или в другой среде, возвращаем 'default'
		return 'default';
	};

	const buildFirstLevel = () => {

		return (
			<ul className={styles.firstLevelList}>
				{firstLevelMenu.map((menu, i) => {
					return (
						<li key={menu.route} aria-expanded={pathname.split('/')[1] === menu.route}>
							<Accordion.Item
								className='AccordionItem'
								value={menu.route}
							>
								<AccordionTrigger 
									className={cn(styles.firstLevel, {
											[styles.firstLevelActive]: pathname.split('/')[1] === menu.route
										}
									)}>
										
										{menu.icon}
										<span>{menu.name}</span>
								</AccordionTrigger>

								<AccordionContent className={styles.AccordionContent}>
									<Accordion.Root
										className={`${styles.menu} AccordionRoot`}
										type='single'
										defaultValue={getCurrentSecondMenu()}
										collapsible
									>
										{buildSecondLevel(menu, secondMenuArrayArrays[i])}
									</Accordion.Root>
								</AccordionContent>
								
							</Accordion.Item>
						</li>
					)
				})}
			</ul>
		)
	}

	//----------------------------------------------------------------------------

	const buildSecondLevel = (firstLevelMenu: FirstLevelMenuItem, secondLevelMenuItem: MenuItem[]) => {

		if(secondLevelMenuItem){
			return (
				<ul className={styles.secondBlock}>
					{secondLevelMenuItem.map(m => {
						
						return (
							<li>
								<Accordion.Item 
									key={uuidv4()}
									className='AccordionItem'
									value={m._id.secondCategory}
								>
		
									<AccordionTrigger
										className={styles.secondLevel}
										// aria-expanded={m.isOpened}
										// onClick={() => setAnnounce(m.isOpened ? 'closed' : 'opened')}
									>
										{m._id.secondCategory}
									</AccordionTrigger>
		
									<AccordionContent className={`${styles.secondLevelBlock}, ${styles.AccordionContent}`}>
										<ul className={`${styles.secondLevelBlock}`}>
											{buildThirdLevel(m.pages, firstLevelMenu.route, m._id.secondCategory)}
										</ul>
									</AccordionContent>
		
								</Accordion.Item>
							</li>
						)
					})}
				</ul>
			)
		}
		
	}

	//----------------------------------------------------------------------------

	const buildThirdLevel = (
		pages: PageItem[],
		route: string,
		idSecondCategory: string
	) => {

		return pages.map(p => (
			<li key={uuidv4()}>
				<Link
					href={`/${route}/${p.alias}`}
					onClick={() => localStorage.setItem('idSecondCategory', idSecondCategory)}
					className={cn(styles.thirdLevel, {
						[styles.thirdLevelActive]:
							`/${pathname.split('/')[1]}/${p.alias}` == pathname
					})}
					aria-current={`/${pathname.split('/')[1]}/${p.alias}` == pathname ? 'page' : false}
				>
					{p.category}
				</Link>
			</li>
		))
	}

	return (
		<nav>
			<Accordion.Root
				className={`${styles.menu} AccordionRoot`}
				type='single'
				defaultValue={pathname.split('/')[1]}
				collapsible
			>
				{/* {announce && <span role='log' className="visualyHidden">{announce == 'opened' ? 'развернуто' : 'свернуто'}</span>} */}
				{buildFirstLevel()}
			</Accordion.Root>
		</nav>
	)
}




//-----------------------------------------------------------------------------------------------------------------------------





const AccordionTrigger = forwardRef(
	(
		{
			children,
			className,
			...props
		}: {
			children: React.ReactNode
			className?: string
		},
		forwardedRef: ForwardedRef<HTMLButtonElement>
	): JSX.Element => (
		<Accordion.Trigger
			className={classNames('AccordionTrigger', className)}
			{...props}
			ref={forwardedRef}
		>
			{children}
		</Accordion.Trigger>
	)
)

const AccordionContent = forwardRef(
	(
		{
			children,
			className,
			...props
		}: {
			children: React.ReactNode
			className?: string
		},
		forwardedRef: ForwardedRef<HTMLDivElement>
	): JSX.Element => (
		<Accordion.Content
			className={classNames('AccordionContent', className)}
			{...props}
			ref={forwardedRef}
		>
			<div className='AccordionContentText'>{children}</div>
		</Accordion.Content>
	)
)
function doAsyncOperation(item: any) {
	throw new Error('Function not implemented.')
}

