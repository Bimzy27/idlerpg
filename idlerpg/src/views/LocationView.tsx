import {Component, For} from "solid-js";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    ContentFitView, CoreButton,
    CoreText,
    RowCenterAlignedView
} from "../styles/styles";
import {ILocation} from "../models/Location";
import locationBuilder from "../data/LocationBuilder";
import TaskView from "./TaskView";
import SkillView from "./skills/SkillView";
import {enemyData} from "../loaders/EnemyLoader";
import useCombat, {CombatData} from "../contexts/CombatContext";
import useActiveTask, {ActiveTaskData} from "../contexts/ActiveTaskContext";
import useMap, {MapData} from "../contexts/MapContext";
import VendorView from "./VendorView";

interface ILocationViewProps {
}

const LocationView: Component<ILocationViewProps> = (props) => {
    const combat = useCombat() as CombatData;
    const tasks = useActiveTask() as ActiveTaskData;
    const map = useMap() as MapData;

    return (
        <ColumnCenterAlignedView>
            <CoreText style={{"font-size": '50px'}}>{locationBuilder[map.location()].name}</CoreText>
            <RowCenterAlignedView>
                <ContentFitAltView style={{width: '50%'}}>
                    <CoreText>Skills</CoreText>
                    <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={locationBuilder[map.location()].skillIds}>
                            {(id, index) => (<SkillView skillId={id}/>)}
                        </For>
                    </ColumnCenterAlignedView>
                </ContentFitAltView>
                <ContentFitAltView style={{width: '50%'}}>
                    <CoreText>Tasks</CoreText>
                    <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={locationBuilder[map.location()].taskIds}>
                            {(id, index) => (<TaskView taskId={id}/>)}
                        </For>
                    </ColumnCenterAlignedView>
                </ContentFitAltView>
            </RowCenterAlignedView>
            <RowCenterAlignedView>
                <ContentFitAltView style={{width: '100%'}}>
                    <CoreText>Vendors</CoreText>
                    <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={locationBuilder[map.location()].vendorIds}>
                            {(id, index) => (<VendorView id={id}/>)}
                        </For>
                    </ColumnCenterAlignedView>
                </ContentFitAltView>
                <ContentFitAltView style={{width: '100%'}}>
                    <CoreText>Enemies</CoreText>
                    <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={locationBuilder[map.location()].enemyIds}>
                            {(id, index) => (<CoreButton onClick={()=>{combat.setEnemy(enemyData[id], tasks);}}>{id}</CoreButton>)}
                        </For>
                    </ColumnCenterAlignedView>
                </ContentFitAltView>
            </RowCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};


export default LocationView;