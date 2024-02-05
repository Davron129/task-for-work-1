import * as L from "leaflet";
import { FC, useState } from "react";
import { GrUndo } from "react-icons/gr";
import { FaCheck } from "react-icons/fa6";
import { PiPolygon } from "react-icons/pi";
import { TileLayer, MapContainer, Marker, Polygon } from "react-leaflet"
import { Control, Drawer } from "../../features/polygon-drawer";

const center: L.LatLngTuple = [41.311081, 69.240562];
const zoom = 15;

export const PolygonDrawer: FC = () => {
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

    const handleClickStartDrawing = () => {
        setLinePos([]);
        setIsDrawable(true);
    }

    const handleFinishDrawing = () => {
        drawPolygon();
    }

    return (
        <MapContainer
            style={{ height: "800px", width: "100%" }}
            center={center}
            zoom={zoom}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={center} icon={L.icon({ iconUrl: '/marker.png', iconSize: [25, 41] })} />

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
                        onClick={handleClickStartDrawing}    
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
                                <button 
                                    className="w-8 h-8 bg-white border border-slate-100 shadow-neutral-900 flex items-center justify-center rounded"
                                    onClick={handleFinishDrawing}    
                                >
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