import * as L from "leaflet";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { TileLayer, MapContainer, Marker, Polyline, Polygon, useMapEvents, CircleMarker } from "react-leaflet"
import Control from "./Control";
import { PiPolygon } from "react-icons/pi";
import { GrUndo } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";

const defaultCenter: L.LatLngTuple = [41.311081, 69.240562];

interface Props {
    zoom?: number;
    center?: L.LatLngTuple
}

export const PolygonDrawer: FC<Props> = ({
    zoom = 15,
    center = defaultCenter
}) => {
    const [pos, setPos] = useState<L.LatLngTuple[][]>([]);
    const [linePos, setLinePos] = useState<L.LatLngTuple[]>([]);
    const [isDrawable, setIsDrawable] = useState<boolean>(false);

    const drawPolygon = () => {
        setPos([...pos, linePos]);
        setLinePos([]);
        setIsDrawable(false);
    }

    const undoChanges = () => {
        if(linePos.length > 0) {
            setLinePos(linePos.slice(0, -1));
        }
    }

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
            <Marker position={defaultCenter} />

            {
                pos.map((position, idx) => (
                    <Polygon positions={position} key={idx} />
                ))
            }

            <Drawer
                drawPolygon={drawPolygon}
                isDrawable={isDrawable}
                setIsDrawable={setIsDrawable}
                pos={linePos}
                setPos={setLinePos}
            />

            <Control position="topleft" container={{ className: "" }}>
                <div className="flex flex-row gap-2">
                    <button 
                        className="w-8 h-8 bg-white border border-slate-100 shadow-neutral-900 flex items-center justify-center rounded"
                        onClick={() => {
                            setIsDrawable(true);
                        }}    
                    >
                        <PiPolygon size={24} />
                    </button>
                    {
                        isDrawable && (
                            <>
                                <button 
                                    className="w-8 h-8 bg-white border border-slate-100 shadow-neutral-900 flex items-center justify-center rounded"
                                    onClick={undoChanges}    
                                >
                                    <GrUndo size={24} />
                                </button>
                                <button className="w-8 h-8 bg-white border border-slate-100 shadow-neutral-900 flex items-center justify-center rounded">
                                    <FaCheck size={24} />
                                </button>
                            </>
                        )
                    }
                </div>
            </Control>
        </MapContainer>
    )
}

interface DrawerProps {
    drawPolygon: () => void;
    isDrawable: boolean,
    setIsDrawable: Dispatch<SetStateAction<boolean>>,
    pos: L.LatLngTuple[],
    setPos: Dispatch<SetStateAction<L.LatLngTuple[]>>
}

const Drawer: FC<DrawerProps> = ({
    drawPolygon,
    isDrawable,
    pos,
    setPos
}) => {
    const map = useMapEvents({
        click: (e) => {
            console.log("map clicked")
            if(isDrawable) {
                const { lat, lng } = e.latlng;
                setPos([...pos, [lat, lng]]);
            } else {
                setPos([])
            }
        },
    });

    const handleClickHandleMarker = () => {
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
                                        click: handleClickHandleMarker
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