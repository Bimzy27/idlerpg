import {Component} from "solid-js";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    CoreButton,
    CoreImage,
    CoreText,
    TransparentButton
} from "../styles/styles";
import useMap, {MapData} from "../contexts/MapContext";
import {getEnemyId} from "../loaders/EnemyLoader";
import locationBuilder from "../data/LocationBuilder";

interface IMapViewProps {
}

const MapView: Component<IMapViewProps> = (props) => {
    const map = useMap() as MapData;

    return (
        <ColumnCenterAlignedView>
            <ContentFitAltView>
                <div style={{position: 'relative'}}>
                    <MapPinView locationId={'location_lumberton'} xPos={1150} yPos={500}/>
                    <MapPinView locationId={'location_faldomere'} xPos={1300} yPos={350}/>
                </div>
                <CoreImage width={2200} height={1200} src={`/assets/map/map.png`} alt="NO IMG">
                </CoreImage>
            </ContentFitAltView>
        </ColumnCenterAlignedView>
    );
};

interface IMapPinViewProps {
    locationId:string;
    xPos:number;
    yPos:number;
}

const MapPinView: Component<IMapPinViewProps> = (props) => {
    const map = useMap() as MapData;

    return (
        <div style={{position: 'absolute', left: `${props.xPos}px`, top: `${props.yPos}px`, "z-index": 9999}}>
            <TransparentButton onClick={()=>{map.setLocation(props.locationId);}} >
                <CoreText>{locationBuilder[props.locationId].name}</CoreText>
                <CoreImage width={40} height={40} src={`/assets/map/pin.png`} alt="NO IMG"></CoreImage>
            </TransparentButton>
        </div>
    );
};


export default MapView;