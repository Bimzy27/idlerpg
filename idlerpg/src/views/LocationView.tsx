import {Component, For} from "solid-js";
import {ColumnCenterAlignedView, CoreText} from "../styles/styles";
import {ILocation} from "../models/Location";
import locationBuilder from "../data/LocationBuilder";
import TaskView from "./TaskView";

interface ILocationViewProps {
}

const LocationView: Component<ILocationViewProps> = (props) => {
    const location:ILocation = locationBuilder['location_lumberton'];

    return (
        <ColumnCenterAlignedView>
            <CoreText style={{"font-size": '50px'}}>{location.name}</CoreText>
            <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                <For each={location.taskIds}>
                    {(id, index) => (<TaskView taskId={id}/>)}
                </For>
            </ColumnCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};


export default LocationView;