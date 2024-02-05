import React, { FC } from "react"
import * as L from "leaflet";
import { TileLayer, Polyline, CircleMarker, Marker, MapContainer, Pane } from "react-leaflet"
import { IParkingPins, IkmlPlacemarkList } from "../../../shared/models";

const defaultCenter: L.LatLngTuple = [67.85260009765625, 37.99032211303711];

interface Props {
    zoom?: number;
    center?: L.LatLngTuple,
    kmlPlacemarkList: IkmlPlacemarkList[];
    parkingPins?: IParkingPins[]
}

export const TrackMap: FC<Props> = ({ 
    zoom = 12,
    center = defaultCenter,
    kmlPlacemarkList,
    parkingPins =  []
 }) => {
    return (
        <MapContainer
            style={{ height: "800px", width: "100%" }}
            center={center}
            zoom={zoom}
            whenReady={() => {
                console.log("ready")
            }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />     

            {
                kmlPlacemarkList.map(({ kmlTrack: { kmlCoordList } }, idx) => {
                    const len = kmlCoordList.length;
                    
                    return (
                        <React.Fragment key={idx}>
                            <Polyline positions={kmlCoordList as any} pathOptions={{ color: "#ea580c" }} />
    
                            {
                                len && (<>
                                    <Pane name="Pane" style={{ zIndex: 1000 }}>
                                        <CircleMarker className="z-[999]" center={kmlCoordList[0]} radius={10} fillColor='red' stroke={false} fillOpacity={1}>
                                            <Marker position={kmlCoordList[0]} icon={L.divIcon({ html: "S", className: "text-white text-center leading-none" })} />
                                        </CircleMarker>
                                        <CircleMarker center={kmlCoordList[len - 1]} radius={10} fillColor='green' stroke={false} fillOpacity={1}>
                                            <Marker position={kmlCoordList[len - 1]} icon={L.divIcon({ html: "F", className: "text-white text-center leading-none" })} />
                                        </CircleMarker>
                                    </Pane>
                                </>)
                            }                            
                        </React.Fragment>
                    )
                })   
            }

            {
                parkingPins.map((pin, idx) => (
                    <Marker position={[pin.lon, pin.lat]} key={idx} icon={L.icon({ iconUrl: '/marker.png', iconSize: [25, 41] })} zIndexOffset={-1} />
                ))
            }
        </MapContainer>
    )
}