import data from '../../shared/mock-data/data.json'
import { TrackMap } from '../../features/track-map/components';
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