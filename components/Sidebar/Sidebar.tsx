import { ISidebarProps } from './Sidebar.props'
import styles from './Sidebar.module.scss'
import cn from 'classnames'
import Logo from '../logo.svg'
import { ServerSideNavbar } from '@/components/Navbar/ServerSideNavbar'

export const Sidebar = ({className, ...props}: ISidebarProps): JSX.Element => {
	return(
			<aside className={cn(className, styles.sidebar)} {...props}>
				<Logo className={styles.logo}/>
				<div>Search</div>
				<ServerSideNavbar/>
			</aside>
	)
}