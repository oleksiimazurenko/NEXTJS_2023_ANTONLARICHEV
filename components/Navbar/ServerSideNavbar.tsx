import { ClientSideNavbar } from './ClientSideNavbar'
import { navbarAPI } from '@/API/navbarAPI'

export const ServerSideNavbar = async () => {
	const defaultMenu = await navbarAPI(0)
	return (
		<>
			<ClientSideNavbar defaultMenu={defaultMenu} />
		</>
	)
}
