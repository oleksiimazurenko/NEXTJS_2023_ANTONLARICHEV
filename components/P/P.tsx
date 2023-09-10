import { IPProps } from './P.props'
import styles from './P.module.scss'
import cn from 'classnames'

export const P = ({size = 'm', children, className, ...props}: IPProps): JSX.Element => {
	return(
			<p className={cn(styles.p, className, {
				[styles.s]: size == 's',
				[styles.m]: size == 'l',
				[styles.l]: size == 'm',
			})}
			{...props}
			>
				{children}
			</p>
	)
}