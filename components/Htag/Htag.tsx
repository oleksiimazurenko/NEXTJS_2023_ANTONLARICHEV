import { IHtagProps } from './Htag.props'
import styles from './Htag.module.scss'
import cn from 'classnames';

export const Htag = ({ tag, children, className}: IHtagProps): JSX.Element => {
	switch (tag) {
		case 'h1':
			return <h1 className={cn(className, styles.h1)}>{children}</h1>
		case 'h2':
			return <h2 className={cn(className, styles.h2)}>{children}</h2>
		case 'h3':
			return <h3 className={cn(className, styles.h3)}>{children}</h3>
		default:
			return <></>
	}
}
