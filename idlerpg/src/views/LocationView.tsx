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
        const location = locationBuilder[map.location()];
        let skillIds:string[] = []
        skillIds = skillIds.concat(location.skillIds);
        for (const taskId of location.taskIds)
        {
            for (const skillId in skillBuilder)
            {
                if (!skillIds.includes(skillId) && taskId.includes(skillId))
                {
                    skillIds.push(skillId);
                }
            }
        }
        return skillIds;
    }

    console.log('Skills: --- ' + getSkillIds());

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

                </Collapse>

                <ColumnCenterAlignedView style={{'grid-gap': '10px'}}>
                    <For each={getSkillIds()}>
                        {(skillId, index) => (<SkillTasksView skillId={skillId}/>)}
                    </For>
                </ColumnCenterAlignedView>

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

interface ISkillTasksViewProps
{
    skillId:string
}

const SkillTasksView: Component<ISkillTasksViewProps> = (props) => {
    const [skillExpanded, setSkillExpanded] = createSignal(false);

    const map = useMap() as MapData;

    function getTaskIds():string[]
    {
        const location = locationBuilder[map.location()];
        let taskIds:string[] = []
        if (location.skillIds.includes(props.skillId))
        {
            for (const taskId in taskData) {
                if (taskId.includes(props.skillId))
                {
                    taskIds.push(taskId);
                }
            }
        }
        else
        {
            for (const taskId of location.taskIds) {
                if (taskId.includes(props.skillId))
                {
                    taskIds.push(taskId);
                }
            }
        }
        return taskIds;
    }

    return (
        <ColumnCenterAlignedView>
            <CoreButton onClick={() => setSkillExpanded(!skillExpanded())} style={{width: '100%'}}>{props.skillId}</CoreButton>
            <Collapse value={skillExpanded()}>
                <ColumnCenterAlignedView style={{'grid-gap': '30px'}}>
                    <For each={getTaskIds()}>
                        {(id, index) => (<TaskView taskId={id}/>)}
                    </For>
                </ColumnCenterAlignedView>
            </Collapse>
        </ColumnCenterAlignedView>
    );
};

export default LocationView;