import { IButtonProps } from './Button.props'
import styles from './Button.module.scss'
import cn from 'classnames'
import Arrow from './arrow.svg'

export const Button = ({ appearance, arrow = 'none', children, className, ...props }: IButtonProps): JSX.Element => {
	return (
		<button
			className={cn(styles.button, className, {
				[styles.primary]: appearance == 'primary',
				[styles.ghost]: appearance == 'ghost'
			})}
			{...props}
		>
			{children}
			{arrow !== 'none' && <span className={cn(styles.arrow, {
				[styles.down] : arrow === 'down'
			})}>
				<Arrow/>
			</span>}
		</button>
	)
}