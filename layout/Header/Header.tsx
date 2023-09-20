import { IHeaderProps } from './Header.props'
import styles from './Header.module.scss'
import cn from 'classnames'



export const Header = async ({...props}: IHeaderProps) => {
	
	return(
			<header {...props}>
				HEADER
			</header>
	)
}