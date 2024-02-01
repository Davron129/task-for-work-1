
import "leaflet/dist/leaflet.css";
// import data from './shared/data.json'
// import { useEffect } from 'react';
// import { TrackMap } from './components/track-map';
// import { IkmlPlacemarkList } from './shared/models';
import { PolygonDrawer } from "./components/polygon-drawer";

// const coords = data.kmlFolder.kmlPlacemarkList;
// const parkingPins = data.parkingPins;

function App() {
  // useEffect(() => {
  //   console.log(data.kmlFolder.kmlPlacemarkList[0].kmlTrack.kmlCoordList)
  // }, [])  
  return (
    <>
      <div className='w-full'>
          {/* <TrackMap 
            kmlPlacemarkList={coords as IkmlPlacemarkList[]} 
            parkingPins={parkingPins}
          /> */}
          <PolygonDrawer />
      </div>
    </>
  )
}

export default App
