import { FC, Fragment } from "react";
import L from "leaflet";
import { Pane, Polyline, CircleMarker, Marker } from "react-leaflet";
import { IkmlPlacemarkList } from "../../../../shared/models";

interface Props {
    kmlPlacemarkList: IkmlPlacemarkList[];
}

export const TrackDrawer: FC<Props> = ({ kmlPlacemarkList }) => {
    return (
        kmlPlacemarkList.map(({ kmlTrack: { kmlCoordList } }, idx) => {
            const len = kmlCoordList.length;
            
            return (
                <Fragment key={idx}>
                    <Polyline positions={kmlCoordList as any} pathOptions={{ color: "#ea580c" }} />

                    {
                        len && (<>
                            <Pane name="Parking Point" style={{ zIndex: 1000 }}>
                                <CircleMarker className="z-[999]" center={kmlCoordList[0]} radius={10} fillColor='red' stroke={false} fillOpacity={1}>
                                    <Marker position={kmlCoordList[0]} icon={L.divIcon({ html: "S", className: "text-white text-center leading-none" })} />
                                </CircleMarker>
                                <CircleMarker center={kmlCoordList[len - 1]} radius={10} fillColor='green' stroke={false} fillOpacity={1}>
                                    <Marker position={kmlCoordList[len - 1]} icon={L.divIcon({ html: "F", className: "text-white text-center leading-none" })} />
                                </CircleMarker>
                            </Pane>
                        </>)
                    }                            
                </Fragment>
            )
        })   
    )
}