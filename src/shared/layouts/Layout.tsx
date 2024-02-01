import { Link, Outlet } from "react-router-dom"
import { ROUTE_POLYGON_DRAWER, ROUTE_TRACK_MAP, ROUTE_USERS } from "../constants"

export const Layout = () => {
    return (
        <>
            <header className="px-10 py-5 flex justify-center">
                <ul className="flex gap-5">
                    <li>
                        <Link 
                            className="font-medium" 
                            to={ROUTE_TRACK_MAP}
                        >
                            Track Map
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className="font-medium" 
                            to={ROUTE_POLYGON_DRAWER}
                        >
                            Polygon Drawer
                        </Link>
                    </li>
                    <li>
                        <Link 
                            className="font-medium" 
                            to={ROUTE_USERS}
                        >
                            Users
                        </Link>
                    </li>
                </ul>
            </header>
            <main>
                <Outlet />
            </main>
        </>
    )
}