import {Component} from "solid-js";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    CoreButton,
    CoreImage,
    CoreText, RowCenterAlignedView,
    TransparentButton
} from "../styles/styles";
import useMap, {MapData} from "../contexts/MapContext";
import {getEnemyId} from "../loaders/EnemyLoader";
import locationBuilder from "../data/LocationBuilder";
import {Coord, mapCoords} from "../models/Location";

let internalMapCoords:Coord = {x:1400, y:800};

interface IMapViewProps {
}

const MapView: Component<IMapViewProps> = (props) => {
    const map = useMap() as MapData;

    function getSelectedLocation():string
    {
        if (map.selectedLocation() === 'none')
        {
            return 'Select Location'
        }

        return locationBuilder[map.selectedLocation()].name;
    }

    return (
        <RowCenterAlignedView>
            <ContentFitAltView>
                <div style={{position: 'relative'}}>
                    <MapPinView locationId={'location_lumberton'}/>
                    <MapPinView locationId={'location_faldomere'}/>
                    <MapPinView locationId={'location_goblin_meadows'}/>
                </div>
                <CoreImage width={internalMapCoords.x} height={internalMapCoords.y} src={`/assets/map/map.png`} alt="NO IMG"/>
            </ContentFitAltView>
            <ContentFitAltView>
                <CoreText>{getSelectedLocation()}</CoreText>
                <CoreButton onClick={()=>{
                    if (map.selectedLocation() !== 'none')
                    {
                        map.setLocation(map.selectedLocation());
                    }
                }}>Travel</CoreButton>
            </ContentFitAltView>
        </RowCenterAlignedView>
    );
};

interface IMapPinViewProps {
    locationId:string;
}

const MapPinView: Component<IMapPinViewProps> = (props) => {
    const map = useMap() as MapData;

    function getX():number
    {
        return (locationBuilder[props.locationId].coord.x / mapCoords.x) * internalMapCoords.x;
    }

    function getY():number
    {
        return (locationBuilder[props.locationId].coord.y / mapCoords.y) * internalMapCoords.y;
    }

    function getPinName():string
    {
        if (map.selectedLocation() === props.locationId)
        {
            return 'pin_selected';
        }

        if (map.location() === props.locationId)
        {
            return 'pin_current';
        }

        return 'pin';
    }

    return (
        <div style={{position: 'absolute', left: `${getX()}px`, top: `${getY()}px`, "z-index": 9999}}>
            <TransparentButton onClick={()=>{map.setSelectedLocation(props.locationId);}} >
                <CoreText>{locationBuilder[props.locationId].name}</CoreText>
                <CoreImage width={40} height={40} src={`/assets/map/${getPinName()}.png`} alt="NO IMG"></CoreImage>
            </TransparentButton>
        </div>
    );
};


export default MapView;