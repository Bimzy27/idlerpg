import {Component, createSignal, For, JSX} from "solid-js";
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
import CollapseView from "./common/CollapseView";
import SkillContentView from "./skills/SkillContentView";
import SmithingView from "./skills/SmithingView";

interface ILocationViewProps {
}

const LocationView : Component<ILocationViewProps> = (props) => {
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

    return (
        <ColumnCenterAlignedView>
            <CoreText style={{"font-size": '50px'}}>{locationBuilder[map.location()].name}</CoreText>

            <ColumnCenterAlignedView>
                <CollapseView text={'Enemies'} defaultExpanded={true}>
                    <RowCenterAlignedView style={{'grid-gap': '30px', padding: '20px'}}>
                        <For each={locationBuilder[map.location()].enemyIds}>
                            {(enemyId, index) => (<FightEnemyView enemyId={enemyId}/>)}
                        </For>
                    </RowCenterAlignedView>
                </CollapseView>

                <CollapseView text={'Tasks'} defaultExpanded={false}>
                    <div style={{"margin-left": '80px'}}>
                        <ColumnCenterAlignedView style={{'grid-gap': '10px'}}>
                            <For each={getSkillIds()}>
                                {(skillId, index) => (<SkillTasksView skillId={skillId}/>)}
                            </For>
                        </ColumnCenterAlignedView>
                    </div>
                </CollapseView>

                <CollapseView text={'Vendors'} defaultExpanded={false}>
                    <RowCenterAlignedView style={{'grid-gap': '30px'}}>
                        <For each={locationBuilder[map.location()].vendorIds}>
                            {(id, index) => (<VendorView id={id}/>)}
                        </For>
                    </RowCenterAlignedView>
                </CollapseView>
            </ColumnCenterAlignedView>
        </ColumnCenterAlignedView>
    );
};

interface ISkillTasksViewProps
{
    skillId:string
}

const SkillTasksView: Component<ISkillTasksViewProps> = (props) => {
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

    function getSkillComponent():JSX.Element
    {
        switch (props.skillId)
        {
            case 'smithing':
                return <SmithingView/>;
        }
        return <SkillContentView skillId={props.skillId} navigationTabs={[{title: props.skillId, taskIds: getTaskIds()}]}/>
    }

    return (
        <ColumnCenterAlignedView>
            <CollapseView text={skillBuilder[props.skillId].name} defaultExpanded={false}>
                {getSkillComponent()}
            </CollapseView>
        </ColumnCenterAlignedView>
    );
};

export default LocationView;