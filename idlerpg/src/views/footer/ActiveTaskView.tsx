import {Component, createEffect, createSignal, For, Show} from "solid-js";
import {ColumnCenterAlignedView, CoreText, RowCenterAlignedView} from "../../styles/styles";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";
import {IReward, ItemReward, SkillReward} from "../../models/Reward";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {ITask} from "../../models/Task";
import {ICost, ItemCost} from "../../models/Cost";
import {styled} from "solid-styled-components";
import {highlightColor, primaryColor, secondaryColor} from "../../styles/colors";
import {TaskImage} from "../task/TaskView";
import {getTaskId, taskData} from "../../loaders/TaskLoader";
import {meetsRequirements} from "../../models/Requirement";
import RewardView from "../RewardView";

const TaskProgressBarContainer = styled.div`
    width: 90%;
    height: 35px;
    background-color: ${highlightColor};
    border-radius: 10px;
    margin-bottom: 5px;
`;

const TaskProgressBar = styled.div<{transitionDuration: number}>`
    height: 100%;
    background-color: ${primaryColor};
    transition: width ${props => props.transitionDuration}s linear;
    border-radius: 10px;
`;

interface IActiveTaskViewProps
{
}

const ActiveTaskView: Component<IActiveTaskViewProps> = (props) => {
    const task = useActiveTask() as ActiveTaskData;

    return (
        <ColumnCenterAlignedView>
            <div style={{'display': "flex", "flex-direction": 'row', "grid-gap": '15px', "align-items": "center"}}>
                <Show when={task.task() && task.task().intervalSeconds !== 0}>
                    <TaskImage taskId={getTaskId(task.task())} width={50} height={50}/>
                    <CoreText>{task.task().name}</CoreText>
                    <For each={task.task().rewards}>
                        {(reward, index) => (<RewardView reward={reward}/>)}
                    </For>
                </Show>
            </div>
            <TaskProgressBarContainer>
                <TaskProgressBar transitionDuration={task.taskDuration()} style={`width: ${task.taskProgress()}%`}></TaskProgressBar>
            </TaskProgressBarContainer>
        </ColumnCenterAlignedView>
    );
};

export default ActiveTaskView;