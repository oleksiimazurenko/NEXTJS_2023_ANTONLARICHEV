'use client'
import { TopPageComponentProps } from './TopPageComponent.props'
import styles from './TopPageComponent.module.scss';
import { Htag } from '@/components/Htag/Htag'
import { Tag } from '@/components/Tag/Tag'
import { TopLevelCategory } from '@/interfaces/page.interface'
import { useEffect } from 'react'
import { HhData } from '@/components/HhData/HhData'
import { Advantages } from '@/components/Advantages/Advantages'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '@/store/store'
import { SortEnum } from '@/components/Sort/Sort.props'
import { addProducts, sorting } from '@/store/slices/sorting.slice'
import { Sort } from '@/components/Sort/Sort'
import { Product } from '@/components/Product/Product'

export const TopPageComponent = ({
	page,
	products,
	firstCategory,
}: TopPageComponentProps): JSX.Element => {

	const dispatch = useDispatch<AppDispatch>()

	const setSort = (sort: SortEnum.Rating) => {
		dispatch(
			sorting(sort));
	};

	useEffect(() => {
		dispatch(
			addProducts(products)
		)
	}, [])

	useEffect(() => {
		dispatch(
			sorting(SortEnum.Rating)
		)
	}, [])

	const { products: sortedProducts, sort } = useAppSelector(state => state.sorting)

	// useEffect(() => {
	// 	dispatch(
	// 		sorting({ type: 'reset', initialState: products })
	// 	)
	// }, [products])

	

	// const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, { products, sort: SortEnum.Rating });
	// const shouldReduceMotion = useReducedMotion();

	return (
		<div className={styles.wrapper}>
			<div className={styles.title}>
				<Htag tag='h1'>{page.title}</Htag>
				{products && (
					<Tag color='grey' size='m' aria-label={products.length + 'элементов'}>
						{products.length}
					</Tag>
				)}
				<Sort sort={sort} setSort={setSort} />
			</div>
			<div role='list'>
				{sortedProducts && sortedProducts.map(p => (
					<Product
						role='listitem'
						// layout={shouldReduceMotion ? false : true}
						key={p._id}
						product={p}
					/>
				))}
			</div>
			<div className={styles.hhTitle}>
				<Htag tag='h2'>Вакансии - {page.category}</Htag>
				<Tag color='red' size='m'>
					hh.ru
				</Tag>
			</div>
			{firstCategory == TopLevelCategory.Courses && page.hh && (<HhData {...page.hh} />)}
			{page.advantages && page.advantages.length > 0 && (
				<>
					<Htag tag='h2'>Преимущства</Htag>
					<Advantages advantages={page.advantages} />
				</>
			)}
			{page.seoText && (
				<div
					className={styles.seo}
					dangerouslySetInnerHTML={{ __html: page.seoText }}
				/>
			)}
			<Htag tag='h2'>Получаемые навыки</Htag>
			{page.tags.map(t => (
				<Tag key={t} color='primary'>
					{t}
				</Tag>
			))}
		</div>
	)
}
