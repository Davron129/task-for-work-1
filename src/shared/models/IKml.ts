import { LatLngTuple } from "leaflet";

export type kmlWhenListType = number[];

export type kmlCoordListType = LatLngTuple[];

export type kmlAngelsListType = number[];

export type kmlSpeedListType = number[];

export interface IkmlPlacemarkList {
    name: string | null;
    styleUrl: string;
    kmlTrack: {
        kmlWhenList: kmlWhenListType,
        kmlCoordList: kmlCoordListType,
        kmlAngelsList: kmlAngelsListType,
        kmlSpeedList: kmlSpeedListType,
    }
}

export interface IParkingPins {
    timestamp: number,
    lat: number,
    lon: number,
    trackDate: string,
    trackTime: string,
    dateReceived: string,
    timeReceived: string,
    parkingTime: string,
    address: string | null,
    sdParkingPopup: string
  }