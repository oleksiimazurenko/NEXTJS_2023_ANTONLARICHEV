'use client'
import { IMainProps } from './Main.props'
import styles from './Main.module.scss'
import cn from 'classnames'
import React, { useState, KeyboardEvent, useRef } from 'react';

export const Main = ({className, children, ...props}: IMainProps): JSX.Element => {

	const [isSkipLinkDisplayed, setIsSkipLinkDisplayed] = useState<boolean>(false);
	const bodyRef = useRef<HTMLDivElement>(null);

	const skipContentAction = (key: KeyboardEvent) => {
		if (key.code == 'Space' || key.code == 'Enter') {
			key.preventDefault();
			bodyRef.current?.focus();
		}
		setIsSkipLinkDisplayed(false);
	};

	return(
			<main className={styles.main} ref={bodyRef} tabIndex={0} {...props} >
				<a
				onFocus={() => setIsSkipLinkDisplayed(true)}
				tabIndex={1}
				className={cn(styles.skipLink, {
					[styles.displayed]: isSkipLinkDisplayed
				})}
				onKeyDown={skipContentAction}
				>
					Сразу к содержанию
				</a>
				{children}
			</main>
	)
}