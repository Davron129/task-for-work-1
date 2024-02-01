import data from '../../shared/data.json'
import { TrackMap } from '../../components/track-map';
import { IkmlPlacemarkList } from '../../shared/models';

const coords = data.kmlFolder.kmlPlacemarkList;
const parkingPins = data.parkingPins;

export const TrackMapPage = () => {
    return (
        <TrackMap 
            kmlPlacemarkList={coords as IkmlPlacemarkList[]} 
            parkingPins={parkingPins}
          />
    )
}