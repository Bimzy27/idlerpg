import {Component} from "solid-js";
import {ColumnCenterAlignedView, ContentFitAltView, CoreButton} from "../styles/styles";
import useMap, {MapData} from "../contexts/MapContext";

interface ILocationViewProps {
}

const MapView: Component<ILocationViewProps> = (props) => {
    const map = useMap() as MapData;

    return (
        <ColumnCenterAlignedView>
            <ContentFitAltView>
                <CoreButton onClick={()=>{map.setLocation('location_lumberton');}}>Travel to Lumberton</CoreButton>
                <CoreButton onClick={()=>{map.setLocation('location_faldomere');}}>Travel to Faldomere</CoreButton>
            </ContentFitAltView>
        </ColumnCenterAlignedView>
    );
};


export default MapView;