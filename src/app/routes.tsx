import { RouteObject } from "react-router-dom";
import { ROUTE_HOME, ROUTE_POLYGON_DRAWER, ROUTE_TRACK_MAP } from "../shared/constants";
import { Layout } from "../shared/layouts";
import { TrackMapPage } from "../pages/track-map";
import { PolygonDrawerPage } from "../pages/polygon-drawer";

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
                element: <PolygonDrawerPage />
            },
        ]
    }
] 