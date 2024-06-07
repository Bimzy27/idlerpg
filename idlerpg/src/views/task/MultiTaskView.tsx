import {Component, createSignal, For, Show} from "solid-js";
import useActiveTask, {ActiveTaskData} from "../../contexts/ActiveTaskContext";
import {ITask} from "../../models/Task";
import {taskData} from "../../loaders/TaskLoader";
import useSkills, {SkillsData} from "../../contexts/SkillsContext";
import {ItemRequirement, meetsSkillRequirements, SkillRequirement} from "../../models/Requirement";
import {
    ColumnCenterAlignedView,
    ContentFitAltView,
    ContentFitView, CoreButton, CoreImage, CoreText,
    CoreText_Mid,
    RowCenterAlignedView, TransparentButton
} from "../../styles/styles";
import {TaskText} from "./TaskView";
import {textPrimaryColor} from "../../styles/colors";
import IntervalView from "../IntervalView";
import RewardView from "../RewardView";
import {getLevel} from "../../models/Skill";
import {ItemReward} from "../../models/Reward";
import {ItemSmallView} from "../ItemView";
import useInventory, {InventoryData} from "../../contexts/InventoryContext";

interface IMultiTaskViewProps
{
    taskIds:string[]
}

const MultiTaskView: Component<IMultiTaskViewProps> = (props) => {
    const skills = useSkills() as SkillsData;
    const activeTask = useActiveTask() as ActiveTaskData;
    const inventory = useInventory() as InventoryData;

    const [selectedTask, setSelectedTask] = createSignal(props.taskIds[0]);
    function getTask():ITask
    {
        return taskData[selectedTask()];
    }
    function getItemRequirements():ItemRequirement[]
    {
        return getTask().requirements.filter(
            (requirement) => (requirement instanceof ItemRequirement)) as ItemRequirement[];
    }
    function getFirstSkillRequirement():SkillRequirement
    {
        return getTask().requirements.find(
            (requirement) => requirement instanceof SkillRequirement) as SkillRequirement;
    }

    return (
        <RowCenterAlignedView>

            <ContentFitView>
                <ColumnCenterAlignedView>
                    <Show when={meetsSkillRequirements(getTask().requirements, skills)}>
                        <TaskText color={textPrimaryColor}>{getTask().name}</TaskText>
                        <Show when={getItemRequirements().length > 0}>
                            <ContentFitAltView>
                                <RowCenterAlignedView>
                                    <ColumnCenterAlignedView>
                                        <CoreText_Mid>Requires:</CoreText_Mid>
                                        <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                            <For each={getItemRequirements()}>
                                                {(requirement, index) => (<ItemSmallView id={requirement.itemAmount.id} amount={requirement.itemAmount.amount}/>)}
                                            </For>
                                        </div>
                                    </ColumnCenterAlignedView>
                                    <ColumnCenterAlignedView>
                                        <CoreText_Mid>You Have:</CoreText_Mid>
                                        <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                            <For each={getItemRequirements()}>
                                                {(requirement, index) => (<ItemSmallView id={requirement.itemAmount.id} amount={inventory.getItem(requirement.itemAmount.id).amount} forceDisplayAmount={true}/>)}
                                            </For>
                                        </div>
                                    </ColumnCenterAlignedView>
                                </RowCenterAlignedView>
                            </ContentFitAltView>
                        </Show>
                        <ContentFitAltView>
                            <ColumnCenterAlignedView>
                                <CoreText_Mid>Rewards:</CoreText_Mid>
                                <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                                    <For each={getTask().rewards}>
                                        {(reward, index) => (<RewardView reward={reward}/>)}
                                    </For>
                                </div>
                            </ColumnCenterAlignedView>
                        </ContentFitAltView>
                        <ContentFitAltView>
                            <RowCenterAlignedView>
                                <CoreButton onClick={()=>{activeTask.setTask(taskData[selectedTask()])}} style={{height: '60px', "font-size": '24px'}}>Start Task</CoreButton>
                                <IntervalView interval={getTask().intervalSeconds}/>
                            </RowCenterAlignedView>
                        </ContentFitAltView>
                    </Show>
                </ColumnCenterAlignedView>
            </ContentFitView>

            <ContentFitView>
                <div style={{display: "grid", "grid-gap": '10px', "grid-template-columns": 'repeat(2, 1fr)'}}>
                    <For each={props.taskIds}>
                        {(taskId, index) => (<TaskSelectorView taskId={taskId} setSelectedTask={setSelectedTask}/>)}
                    </For>
                </div>
            </ContentFitView>
        </RowCenterAlignedView>
    );
};

interface ITaskSelectorViewProps
{
    taskId:string;
    setSelectedTask:(taskId:string)=>void;
}

const TaskSelectorView: Component<ITaskSelectorViewProps> = (props) => {
    const skills = useSkills() as SkillsData;

    const task:ITask = taskData[props.taskId];
    const firstSkillRequirement:SkillRequirement = task.requirements.find(
        (requirement) => requirement instanceof SkillRequirement) as SkillRequirement;
    const firstItemReward:ItemReward = task.rewards.find(
        (reward) => reward instanceof ItemReward) as ItemReward;

    return (
        <ContentFitAltView>
            <TransparentButton onClick={()=>{props.setSelectedTask(props.taskId)}} style={{display:"flex", "flex-direction": "row", "align-items": "center"}}>
                <RowCenterAlignedView>
                    <Show when={meetsSkillRequirements(task.requirements, skills)}>
                        <CoreImage src={`/assets/items/${firstItemReward.itemAmount.id}.png`} width={30} height={30} style={{"margin-right": '10px'}}/>
                        <TaskText color={textPrimaryColor}>{task.name}</TaskText>
                    </Show>
                    <Show when={!meetsSkillRequirements(task.requirements, skills)}>
                        <CoreText style={{display: "flex", "align-items": "center", "text-align": "center"}}>
                            Unlocked at
                            <CoreImage src={`/assets/skills/${firstSkillRequirement.skillValue.id}.png`} alt="NO IMG" width={40} height={40} style={{margin: '10px'}}/>
                            level {getLevel(firstSkillRequirement.skillValue)}
                        </CoreText>
                    </Show>
                </RowCenterAlignedView>
            </TransparentButton>
        </ContentFitAltView>
    );
};

export default MultiTaskView;