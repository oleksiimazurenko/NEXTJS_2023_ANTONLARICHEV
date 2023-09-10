import { ISidebarProps } from './Sidebar.props'
import styles from './Sidebar.module.scss'
import cn from 'classnames'

import { ServerSideNavbar } from '@/components/Navbar/ServerSideNavbar'

export const Sidebar = ({...props}: ISidebarProps): JSX.Element => {
	return(
			<aside {...props}>
				<ServerSideNavbar/>
			</aside>
	)
}