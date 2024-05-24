import {Component, createSignal, For} from "solid-js";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    ContentFitView, CoreButton,
    CoreText,
    RowCenterAlignedView
} from "../styles/styles";
import {ILocation} from "../models/Location";
import locationBuilder from "../data/LocationBuilder";
import TaskView from "./task/TaskView";
import SkillView from "./skills/SkillView";
import {enemyData} from "../loaders/EnemyLoader";
import useCombat, {CombatData} from "../contexts/combat/CombatContext";
import useActiveTask, {ActiveTaskData} from "../contexts/ActiveTaskContext";
import useMap, {MapData} from "../contexts/MapContext";
import VendorView from "./VendorView";
import {Collapse} from "solid-collapse";
import FightEnemyView from "./combat/FightEnemyView";
import {taskData} from "../loaders/TaskLoader";
import skillBuilder from "../data/SkillBuilder";

interface ILocationViewProps {
}

const LocationView: Component<ILocationViewProps> = (props) => {
    const [enemiesExpanded, setEnemiesExpanded] = createSignal(true);
    const [tasksExpanded, setTasksExpanded] = createSignal(false);
    const [vendorsExpanded, setVendorsExpanded] = createSignal(false);

    const map = useMap() as MapData;

    function getSkillIds():string[]
    {
        let taskIds:string[] = []
        taskIds = taskIds.concat(skillBuilder[map.location()].taskIds);
        return taskIds;
    }

    function getTaskIds(skillId:string):string[]
    {
        let taskIds:string[] = []
        for (const taskId in taskData) {
            if (taskId.includes(skillId))
            {

            }
        }
        return taskIds;
    }

    return (
        <ColumnCenterAlignedView>
            <CoreText style={{"font-size": '50px'}}>{locationBuilder[map.location()].name}</CoreText>

            <ColumnCenterAlignedView>
                <CoreButton onClick={() => setEnemiesExpanded(!enemiesExpanded())} style={{width: '100%'}}>Enemies</CoreButton>
                <Collapse value={enemiesExpanded()}>
                    <ContentFitAltView style={{width: '100%'}}>
                        <RowCenterAlignedView style={{'grid-gap': '30px', padding: '20px'}}>
                            <For each={locationBuilder[map.location()].enemyIds}>
                                {(enemyId, index) => (<FightEnemyView enemyId={enemyId}/>)}
                            </For>
                        </RowCenterAlignedView>
                    </ContentFitAltView>
                </Collapse>

                <CoreButton onClick={() => setTasksExpanded(!tasksExpanded())} style={{width: '100%'}}>Tasks</CoreButton>
                <Collapse value={tasksExpanded()}>
                    <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={getTaskIds()}>
                            {(id, index) => (<TaskView taskId={id}/>)}
                        </For>
                    </ColumnCenterAlignedView>
                </Collapse>

                <CoreButton onClick={() => setVendorsExpanded(!vendorsExpanded())} style={{width: '100%'}}>Vendors</CoreButton>
                <Collapse value={vendorsExpanded()}>
                    <ContentFitAltView style={{width: '100%'}}>
                        <RowCenterAlignedView style={{'grid-gap': '30px'}}>
                            <For each={locationBuilder[map.location()].vendorIds}>
                                {(id, index) => (<VendorView id={id}/>)}
                            </For>
                        </RowCenterAlignedView>
                    </ContentFitAltView>
                </Collapse>
            </ColumnCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};


export default LocationView;