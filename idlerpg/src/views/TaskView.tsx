import {Component, For} from "solid-js";
import {
    ColumnCenterAlignedView, CoreImage,
    CoreText,
    CoreText_Mid,
    StyledTaskView,
    TransparentButton
} from "../styles/styles";
import {ITask, taskMeetsRequirements} from "../models/Task";
import taskBuilder from "../data/tasks/TaskBuilder";
import useActiveTask from "../contexts/ActiveTaskContext";
import RewardView from "./RewardView";
import RequirementView from "./RequirementView";
import useSkills, {SkillsData} from "../contexts/SkillsContext";
import {redColor, textPrimaryColor} from "../styles/colors";
import useInventory, {InventoryData} from "../contexts/InventoryContext";

interface ITaskViewProps
{
    taskId:string
}

const TaskView: Component<ITaskViewProps> = (props) => {
    const activeTask = useActiveTask();
    const task:ITask = taskBuilder[props.taskId];
    const skills = useSkills();
    const inventory = useInventory();
    return (
        <StyledTaskView>
            <TransparentButton onClick={()=>{activeTask?.setTask(task)}} style={{display:"flex", "flex-direction": "row", "align-items": "center", "padding-left": '60px', "padding-right": '60px'}}>
                <ColumnCenterAlignedView>
                    <CoreText style={{ 'color': `${taskMeetsRequirements(task, skills as SkillsData, inventory as InventoryData) ? textPrimaryColor : redColor}`, "font-size": '32px', "white-space": 'nowrap'  }}>{task.name}</CoreText>
                    <CoreImage src={`/assets/tasks/${props.taskId}.png`} alt="NO IMG" width={80} height={80}/>
                    <CoreText_Mid>Duration: {task.durationSeconds} seconds</CoreText_Mid>
                </ColumnCenterAlignedView>
                <ColumnCenterAlignedView>
                    <CoreText_Mid>Requirements:</CoreText_Mid>
                    <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                        <For each={task.requirements}>
                            {(requirement, index) => (<RequirementView requirement={requirement}/>)}
                        </For>
                    </div>
                    <CoreText_Mid>Rewards:</CoreText_Mid>
                    <div style={{display:"flex", "align-items": "center", "flex-direction": "row", "grid-gap": '20px' }}>
                        <For each={task.rewards}>
                            {(reward, index) => (<RewardView reward={reward}/>)}
                        </For>
                    </div>
                </ColumnCenterAlignedView>
            </TransparentButton>
        </StyledTaskView>
    );
};

export default TaskView;