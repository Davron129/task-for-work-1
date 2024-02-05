import { RouteObject } from "react-router-dom";
import { ROUTE_HOME, ROUTE_POLYGON_DRAWER, ROUTE_TRACK_MAP, ROUTE_USERS } from "../shared/constants";
import { Layout } from "../shared/layouts";
import { TrackMapPage } from "../pages/track-map";
import { PolygonDrawer } from "../pages/polygon-drawer";
import { UsersPage } from "../pages/users";

export const routes: RouteObject[] = [
    {
        path: ROUTE_HOME,
        element: <Layout />,
        children: [
            {
                index: true,
                element: <TrackMapPage />
            },
            {
                path: ROUTE_TRACK_MAP,
                element: <TrackMapPage />
            },
            {
                path: ROUTE_POLYGON_DRAWER,
                element: <PolygonDrawer />
            },
            {
                path: ROUTE_USERS,
                element: <UsersPage />
            }
        ]
    }
] 