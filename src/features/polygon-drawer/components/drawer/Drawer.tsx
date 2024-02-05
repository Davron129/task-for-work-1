import { Dispatch, SetStateAction, FC } from "react";
import { useMapEvents, Polyline, CircleMarker } from "react-leaflet";

interface DrawerProps {
    drawPolygon: () => void;
    isDrawable: boolean,
    setIsDrawable: Dispatch<SetStateAction<boolean>>,
    pos: L.LatLngTuple[],
    setPos: Dispatch<SetStateAction<L.LatLngTuple[]>>
}

export const Drawer: FC<DrawerProps> = ({
    drawPolygon,
    isDrawable,
    pos,
    setPos
}) => {
    useMapEvents({
        click: (e) => {
            if(isDrawable) {
                const { lat, lng } = e.latlng;
                setPos([...pos, [lat, lng]]);
            } else {
                setPos([])
            }
        },
    });

    const handleClickMarker = () => {
        drawPolygon();
    }

    return (
        <div>
            {
                pos.length > 0 && isDrawable ? (
                    <>
                        <Polyline positions={pos} />
                        {
                            pos.map((position, idx) => (
                                <CircleMarker
                                    center={position}
                                    key={idx} 
                                    eventHandlers={{
                                        click: handleClickMarker
                                    }}    
                                />
                            ))
                        }
                    </>
                ) : null
            }
        </div>
    );
}