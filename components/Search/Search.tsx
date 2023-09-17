'use client'
import { SearchProps } from './Search.props';
import styles from './Search.module.scss';
import GlassIcon from './glass.svg';
import cn from 'classnames';
import { Input } from '../Input/Input';
import { Button } from '../Button/Button';
import { useState, KeyboardEvent, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
	const [search, setSearch] = useState<string>('');
	const router = useRouter();
	const searchParams = useSearchParams()


	//Вот так мы изменяем параметры 
	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams)
			params.set(name, value)
			
			return params.toString()
		},
		[searchParams]
	)


	const goToSearch = () => router.push(`/search?${createQueryString('q', search)}`)
	

	const handleKeyDown = (e: KeyboardEvent) => {
		
		if (e.key == 'Enter') {
			e.preventDefault(); 
			goToSearch();
		}
	};

	return (
		<form className={cn(className, styles.search)} {...props} role="search">
			<Input
				className={styles.input}
				placeholder="Поиск..."
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<Button
				appearance="primary"
				className={styles.button}
				onClick={goToSearch}
				type='button'
				aria-label="Искать по сайту"
			>
				<GlassIcon />
			</Button>
		</form>
	);
};