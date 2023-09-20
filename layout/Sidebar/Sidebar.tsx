import { Search } from '@/components/Search/Search'
import cn from 'classnames'
import { Menu } from '../Menu/Menu'
import Logo from '../logo.svg'
import styles from './Sidebar.module.scss'
import { ISidebarProps } from './Sidebar.props'

export const Sidebar = ({
	className,
	...props
}: ISidebarProps): JSX.Element => {
	return (
		<aside className={cn(className, styles.sidebar)} {...props}>
			<Logo className={styles.logo} />
			<Search />
			<Menu />
		</aside>
	)
}
