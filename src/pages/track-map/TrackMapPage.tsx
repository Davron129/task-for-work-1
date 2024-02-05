import data from '../../shared/mock-data/data.json'
import * as L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { IkmlPlacemarkList } from '../../shared/models';
import { TrackDrawer } from '../../features/track-map/components';

const coords = data.kmlFolder.kmlPlacemarkList;
const parkingPins = data.parkingPins;

export const TrackMapPage = () => {
    const center = coords.length > 0 && coords[0].kmlTrack.kmlCoordList.length > 0
            ? coords[0].kmlTrack.kmlCoordList[0]
            : [0, 0];

    const parkingPoints = parkingPins.map((pin, idx) => (
        <Marker position={[pin.lon, pin.lat]} key={idx} icon={L.icon({ iconUrl: '/marker.png', iconSize: [25, 41] })} zIndexOffset={-1} />
    ))
    
    return (
        <MapContainer
            style={{ height: "800px", width: "100%" }}
            center={center as L.LatLngTuple}
            zoom={15}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />     

            <TrackDrawer kmlPlacemarkList={coords as IkmlPlacemarkList[]} />

            { parkingPoints }
        </MapContainer>
    )
}